const MAX_DIMENSION = 2400;

export function convertToWebp(file: File, maxSize = MAX_DIMENSION, quality = 0.82): Promise<File> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/webp") return resolve(file);

    const url = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context failed"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.type === "image/webp") {
            const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
            resolve(new File([blob], name, { type: "image/webp" }));
          } else {
            reject(new Error("WebP not supported"));
          }
        },
        "image/webp",
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image loading failed"));
    };

    img.src = url;
  });
}
