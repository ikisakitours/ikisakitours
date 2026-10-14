// // src/hooks/useUserLocation.ts
// import { useState, useEffect } from "react";

// export interface LocationData {
//   country_code: string;
//   country_name: string;
//   languages: string;
// }

// let cachedLocationPromise: Promise<LocationData> | null = null;

// export function useUserLocation(timeoutMs = 4000) {
//   const [data, setData] = useState<LocationData | null>(null);
//   const [isDetecting, setIsDetecting] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchLocation = async () => {
//       try {
//         setIsDetecting(true);

//         if (!cachedLocationPromise) {
//           const controller = new AbortController();
//           const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

//           cachedLocationPromise = fetch("https://ipapi.co/json/", {
//             signal: controller.signal,
//           })
//             .then(async (res) => {
//               clearTimeout(timeoutId);
//               if (!res.ok) throw new Error(`API Fetch Failed: ${res.status}`);
//               return res.json();
//             })
//             .catch((err) => {
//               cachedLocationPromise = null;
//               throw err;
//             });
//         }

//         const result = await cachedLocationPromise;

//         if (isMounted) {
//           setData(result);
//           setError(null);
//         }
//       } catch (err: unknown) {
//         if (isMounted) {
//           if (err instanceof Error && err.name === "AbortError") {
//             console.warn("Location fetch aborted: Network too slow.");
//           } else {
//             console.warn("Location detection failed:", err);
//           }
//           setError(err instanceof Error ? err : new Error("Unknown error"));
//         }
//       } finally {
//         if (isMounted) {
//           setIsDetecting(false);
//         }
//       }
//     };

//     fetchLocation();

//     return () => {
//       isMounted = false; // Cleanup to prevent memory leaks
//     };
//   }, [timeoutMs]);

//   return { data, isDetecting, error };
// }

// src/hooks/useUserLocation.ts
import { useState, useEffect } from "react";

export interface LocationData {
  country_code: string;
  country_name: string;
  languages: string;
}

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

        if (!cachedLocationPromise) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

          cachedLocationPromise = fetch("https://www.cloudflare.com/cdn-cgi/trace", {
            signal: controller.signal,
          })
            .then(async (res) => {
              clearTimeout(timeoutId);
              if (!res.ok) throw new Error(`Cloudflare Fetch Failed: ${res.status}`);
              const text = await res.text();

              const match = text.match(/loc=([A-Z]{2})/);
              const countryCode = match ? match[1] : "US";

              let countryName = "International";
              try {
                const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
                countryName = regionNames.of(countryCode) || countryCode;
              } catch (e) {
                console.warn("Could not resolve country name:", e);
                countryName = countryCode;
              }

              const countryToLangMap: Record<string, string> = {
                LK: "si-LK",
                JP: "ja-JP",
                FR: "fr-FR",
                DE: "de-DE",
                ES: "es-ES",
                US: "en-US",
                GB: "en-GB",
                AU: "en-AU",
                CA: "en-CA",
                NZ: "en-NZ",
              };

              const derivedLanguage = countryToLangMap[countryCode] || navigator.language || "en-US";

              return {
                country_code: countryCode,
                country_name: countryName,
                languages: derivedLanguage,
              };
            })
            .catch((err) => {
              cachedLocationPromise = null;
              throw err;
            });
        }

        const result = await cachedLocationPromise;

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.warn("Location detection fallback to default:", err);
          setData({
            country_code: "LK",
            country_name: "Sri Lanka",
            languages: "si-LK",
          });
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
      isMounted = false;
    };
  }, [timeoutMs]);

  return { data, isDetecting, error };
}
