"use client";
import { useEffect, useState } from "react";

export type DeviceType = "phone" | "tablet" | "desktop";

interface UseDeviceOptions {
  tabletBreakpoint?: number;
  desktopBreakpoint?: number;
  debounceDelay?: number;
}

export const useDevice = ({
  tabletBreakpoint = 768,
  desktopBreakpoint = 1024,
  debounceDelay = 100,
}: UseDeviceOptions = {}) => {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < tabletBreakpoint) {
        setDevice("phone");
      } else if (width < desktopBreakpoint) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, debounceDelay);
    };

    let timeoutId: NodeJS.Timeout;
    updateSize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [tabletBreakpoint, desktopBreakpoint, debounceDelay]);

  return { device };
};
