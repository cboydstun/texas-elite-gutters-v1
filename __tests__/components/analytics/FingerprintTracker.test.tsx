import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FingerprintTracker from '@/components/analytics/FingerprintTracker';
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';

// Mock the ThumbmarkJS library
jest.mock('@thumbmarkjs/thumbmarkjs', () => ({
  getFingerprint: jest.fn().mockResolvedValue('mock-fingerprint-hash'),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock navigator.sendBeacon
Object.defineProperty(global.navigator, 'sendBeacon', {
  value: jest.fn().mockReturnValue(true),
  configurable: true,
});

describe('FingerprintTracker', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock window.ThumbmarkJS
    Object.defineProperty(window, 'ThumbmarkJS', {
      value: {
        getFingerprintData: jest.fn().mockResolvedValue({
          browser: { name: 'Chrome', version: '100.0' },
          os: 'Windows',
          screen: { width: 1920, height: 1080 }
        }),
      },
      configurable: true,
    });
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', { value: 1920, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1080, configurable: true });
    
    // Mock document properties
    Object.defineProperty(document, 'referrer', { value: 'https://google.com', configurable: true });
    
    // Mock location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test-page' },
      configurable: true,
    });
    
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    });
  });
  
  it('should send fingerprint data to the API', async () => {
    render(<FingerprintTracker />);
    
    // Wait for the API call to be made
    await waitFor(() => {
      expect(getFingerprint).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/analytics/fingerprint',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String),
        })
      );
    });
    
    // Verify the request body
    const requestBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(requestBody).toEqual(
      expect.objectContaining({
        fingerprintHash: 'mock-fingerprint-hash',
        components: expect.any(Object),
        userAgent: expect.any(String),
        device: expect.objectContaining({
          type: expect.stringMatching(/desktop|tablet|mobile|other/),
        }),
        page: '/test-page',
        referrer: 'https://google.com',
      })
    );
  });
  
  it('should set up event listeners for tracking interactions', async () => {
    // Spy on addEventListener
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
    render(<FingerprintTracker />);
    
    // Wait for the component to finish setting up
    await waitFor(() => {
      expect(getFingerprint).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalled();
    });
    
    // Verify event listeners were added
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
  
  it('should send page view data when user leaves the page', async () => {
    render(<FingerprintTracker />);
    
    // Wait for the component to finish setting up
    await waitFor(() => {
      expect(getFingerprint).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalled();
    });
    
    // Simulate page unload
    const beforeUnloadEvent = new Event('beforeunload');
    window.dispatchEvent(beforeUnloadEvent);
    
    // Verify sendBeacon was called
    expect(navigator.sendBeacon).toHaveBeenCalledWith(
      '/api/v1/analytics/pageview',
      expect.any(String)
    );
    
    // Verify the data sent
    const beaconData = JSON.parse((navigator.sendBeacon as jest.Mock).mock.calls[0][1]);
    expect(beaconData).toEqual(
      expect.objectContaining({
        fingerprintHash: 'mock-fingerprint-hash',
        page: '/test-page',
        duration: expect.any(Number),
        interactions: expect.objectContaining({
          clicks: expect.any(Number),
          scrollDepth: expect.any(Number),
          formInteractions: expect.any(Boolean),
        }),
      })
    );
  });
});
