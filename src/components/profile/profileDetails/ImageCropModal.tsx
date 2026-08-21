"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getCroppedImg } from "@/utils/cropImage";
import { useTranslations } from "next-intl";
//Icons
import { X } from "lucide-react";

type ImageCropModalProps = {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
};

export function ImageCropModal({ isOpen, imageSrc, onClose, onCropComplete }: ImageCropModalProps) {
  const t = useTranslations("ProfilePage");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-gold/30 bg-[#0a0a0a] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
              <h3 className="text-body-sm font-bold uppercase tracking-widest text-gold">{t("Modals.Crop.title")}</h3>
              <button
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="relative h-[60vh] max-h-100 w-full bg-black/50">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                restrictPosition={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteHandler}
              />
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-body-sm font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    {t("Modals.Crop.zoom")} <span className="text-gold">{Math.round(zoom * 100)}%</span>
                  </span>
                  <span className="font-normal text-body-sm text-slate-500 capitalize">
                    {t("Modals.Crop.dragHelp")}
                  </span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={0.3}
                  max={3}
                  step={0.05}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-gold"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="explore"
                  onClick={handleSave}
                  className="flex-1 justify-center [&_span]:text-caption!"
                  disabled={isProcessing}
                >
                  {isProcessing ? t("Modals.Crop.btnProcessing") : t("Modals.Crop.btnCropSave")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
