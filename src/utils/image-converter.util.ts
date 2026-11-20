/**
 * Utility for converting image files, blobs, or data URLs to WebP format client-side.
 * Resizes images to a maximum dimension while maintaining aspect ratio and compresses to WebP.
 */

export interface WebPConversionResult {
  file: File;
  dataUrl: string;
  sizeMB: number;
}

export async function convertImageToWebP(
  source: File | Blob | string,
  maxDimension = 512,
  quality = 0.85
): Promise<WebPConversionResult> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("Image conversion is only available in browser environment"));
    }

    let url: string;
    let fileName = "avatar.webp";

    if (typeof source === "string") {
      url = source;
    } else {
      url = URL.createObjectURL(source);
      if ("name" in source && typeof source.name === "string") {
        fileName = source.name.replace(/\.[^.]+$/, "") + ".webp";
      }
    }

    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (typeof source !== "string") {
        URL.revokeObjectURL(url);
      }

      // Calculate scale to ensure max dimension does not exceed maxDimension
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Canvas 2D context could not be acquired"));
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error("WebP blob creation failed"));
          }
          const file = new File([blob], fileName, { type: "image/webp" });
          const dataUrl = canvas.toDataURL("image/webp", quality);
          const sizeMB = Number((blob.size / (1024 * 1024)).toFixed(2));
          resolve({ file, dataUrl, sizeMB });
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      if (typeof source !== "string") {
        URL.revokeObjectURL(url);
      }
      reject(new Error("Failed to load image for WebP conversion"));
    };

    img.src = url;
  });
}
