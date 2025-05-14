"use client";

import dynamic from "next/dynamic";

// Import FingerprintTracker dynamically with no SSR
const FingerprintTracker = dynamic(
  () => import("@/components/analytics/FingerprintTracker"),
  { ssr: false },
);

export default function AnalyticsWrapper() {
  return <FingerprintTracker />;
}
