"use client";

import { useEffect, useRef } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

declare global {
  interface Window {
    ThumbmarkJS: any;
  }
}

/**
 * Determines the device type based on user agent and screen size
 */
const getDeviceType = (): "desktop" | "tablet" | "mobile" | "other" => {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for mobile devices
  if (
    /(android|webos|iphone|ipad|ipod|blackberry|windows phone)/i.test(userAgent)
  ) {
    // Differentiate between tablets and phones based on screen size
    if (window.innerWidth >= 768) {
      return "tablet";
    } else {
      return "mobile";
    }
  }

  // Check for tablets specifically
  if (
    /(ipad|tablet)/i.test(userAgent) ||
    (window.innerWidth >= 768 && window.innerWidth <= 1366)
  ) {
    return "tablet";
  }

  // Default to desktop for larger screens
  if (window.innerWidth > 1024) {
    return "desktop";
  }

  return "other";
};

/**
 * Tracks user interactions on the page
 */
const setupInteractionTracking = (fingerprintHash: string) => {
  let startTime = Date.now();
  let maxScrollDepth = 0;
  let clickCount = 0;
  let formInteracted = false;

  // Track scroll depth
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercentage = Math.min(
        100,
        Math.round((scrollPosition / totalHeight) * 100),
      );
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercentage);
    }
  };

  // Track clicks
  const handleClick = () => {
    clickCount++;
  };

  // Track form interactions
  const setupFormTracking = () => {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("input", () => {
        formInteracted = true;
      });
    });
  };

  // Send data when user leaves page
  const handleBeforeUnload = () => {
    const duration = Math.round((Date.now() - startTime) / 1000); // in seconds

    // Use sendBeacon for more reliable data sending on page exit
    const data = {
      fingerprintHash,
      page: window.location.pathname,
      duration,
      exitPage: window.location.pathname,
      interactions: {
        clicks: clickCount,
        scrollDepth: maxScrollDepth,
        formInteractions: formInteracted,
      },
    };

    navigator.sendBeacon("/api/v1/analytics/pageview", JSON.stringify(data));
  };

  // Set up event listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("click", handleClick);
  window.addEventListener("beforeunload", handleBeforeUnload);
  setupFormTracking();

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleClick);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
};

/**
 * Component that tracks fingerprint data and user interactions
 * This component doesn't render anything visible
 */
export default function FingerprintTracker() {
  const isTracking = useRef(false);

  useEffect(() => {
    // Prevent duplicate tracking
    if (isTracking.current) return;
    isTracking.current = true;

    const trackFingerprint = async () => {
      try {
        // Get fingerprint data
        const fingerprintHash = await getFingerprint();

        // Get full fingerprint data if available
        let fingerprintData = {};
        if (
          window.ThumbmarkJS &&
          typeof window.ThumbmarkJS.getFingerprintData === "function"
        ) {
          fingerprintData = await window.ThumbmarkJS.getFingerprintData();
        }

        // Determine device type
        const deviceType = getDeviceType();

        // Send to API
        const response = await fetch("/api/v1/analytics/fingerprint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fingerprintHash,
            components: fingerprintData,
            userAgent: navigator.userAgent,
            device: {
              type: deviceType,
            },
            page: window.location.pathname,
            referrer: document.referrer || null,
          }),
        });

        if (response.ok) {
          // Set up interaction tracking
          return setupInteractionTracking(fingerprintHash);
        }
      } catch (error) {
        console.error("Error tracking fingerprint:", error);
      }
    };

    // Start tracking and store cleanup function
    let cleanup: (() => void) | undefined;
    trackFingerprint().then((cleanupFn) => {
      cleanup = cleanupFn as () => void;
    });

    // Cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
}
