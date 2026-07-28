"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface UniversalPlayerProps {
  url: string;
  thumbnailUrl?: string; 
  title?: string;
}

export default function UniversalPlayer({ url, thumbnailUrl, title }: UniversalPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient || !url) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/90">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold/70">Loading Stream...</span>
        </div>
      </div>
    );
  }

  const handlePlayClick = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  if (!isPlaying) {
    const bgImage = thumbnailUrl || "https://images.unsplash.com/photo-1508672019048-805587630a17?q=80&w=1200&auto=format&fit=crop";

    return (
      <div 
        onClick={handlePlayClick}
        className="absolute inset-0 cursor-pointer group overflow-hidden bg-black flex items-center justify-center"
      >
        <Image 
          src={bgImage} 
          alt={title || "MapMate Live Stream"} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          priority
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40"></div>

        {/* MapMate Watermark (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">MapMate Live</span>
        </div>

        {/* Center Play Button & Hover Effect */}
        <div className="absolute z-10 flex flex-col items-center gap-3">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent shadow-lg"></div>
              <span className="text-xs font-semibold tracking-wider text-gold uppercase animate-pulse">Starting Stream...</span>
            </div>
          ) : (
            // Play Button
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-black shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-gold">
              <svg 
                className="h-8 w-8 translate-x-0.5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          {!isLoading && (
            <span className="text-xs font-medium tracking-wide text-white/90 drop-shadow-md">
              Click to Play Stream
            </span>
          )}
        </div>
      </div>
    );
  }

  // --- 01) YouTube Player ---
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    
    const embedUrl = videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=1&modestbranding=1&rel=0` 
      : url;

    return (
      <iframe
        src={embedUrl}
        title="YouTube Live Stream"
        className="absolute top-0 left-0 h-full w-full border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // --- Vimeo Player ---
  if (url.includes("vimeo.com")) {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = match ? match[1] : null;

    if (videoId) {
      const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&playsinline=1&autopause=0`;

      return (
        <iframe
          src={embedUrl}
          title="Vimeo Live Stream"
          className="absolute top-0 left-0 h-full w-full border-0 bg-black"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }

  // --- 02) Facebook Player ---
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=auto&autoplay=1&mute=1`;

    return (
      <iframe
        src={embedUrl}
        title="Facebook Live Stream"
        className="absolute top-0 left-0 h-full w-full border-0 overflow-hidden bg-black"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // --- 03) Twitch Player ---
  if (url.includes("twitch.tv")) {
    const channelName = url.split("twitch.tv/")[1]?.split("/")[0];
    const parentDomain = typeof window !== "undefined" ? window.location.hostname : "mapmate-sri-lanka.vercel.app";
    const embedUrl = `https://player.twitch.tv/?channel=${channelName}&parent=${parentDomain}&muted=true&autoplay=true&playsinline=true`;

    return (
      <iframe
        src={embedUrl}
        title="Twitch Live Stream"
        className="absolute top-0 left-0 h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // --- Direct Video Files & HLS / .m3u8 Player ---
  return (
    <video
      src={url}
      className="absolute top-0 left-0 h-full w-full object-cover bg-black"
      autoPlay
      muted
      controls
      playsInline
    />
  );
}