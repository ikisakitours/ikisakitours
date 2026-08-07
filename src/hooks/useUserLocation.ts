// src/hooks/useUserLocation.ts
import { useState, useEffect } from "react";

export interface LocationData {
  country_code: string;
  country_name: string;
  languages: string;
}

// 🌟 Global Cache Variable: මෙය පිටුව පුරාම එකවරක් පමණක් API කෝල් එක යැවීමට උපකාරී වේ
let cachedLocationPromise: Promise<LocationData> | null = null;

export function useUserLocation(timeoutMs = 4000) {
  const [data, setData] = useState<LocationData | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        setIsDetecting(true);

        // මේ වන විටත් කවුරුහරි API Request එක යවලා නැත්නම් විතරක් අලුත් එකක් යවනවා
        if (!cachedLocationPromise) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

          cachedLocationPromise = fetch("https://ipapi.co/json/", {
            signal: controller.signal,
          })
            .then(async (res) => {
              clearTimeout(timeoutId);
              if (!res.ok) throw new Error(`API Fetch Failed: ${res.status}`);
              return res.json();
            })
            .catch((err) => {
              cachedLocationPromise = null; // ෆේල් වුණොත් Cache එක මකනවා
              throw err;
            });
        }

        // Cache එකේ තියෙන Promise එකෙන් ප්‍රතිඵලය එනකම් ඉන්නවා
        const result = await cachedLocationPromise;

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error && err.name === "AbortError") {
            console.warn("Location fetch aborted: Network too slow.");
          } else {
            console.warn("Location detection failed:", err);
          }
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) {
          setIsDetecting(false);
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [timeoutMs]);

  return { data, isDetecting, error };
}