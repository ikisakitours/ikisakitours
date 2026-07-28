"use client";

import React, { useState, useEffect } from "react";

interface UniversalPlayerProps {
  url: string;
}

export default function UniversalPlayer({ url }: UniversalPlayerProps) {
  const [isClient, setIsClient] = useState(false);

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

  // 01) YouTube - Mobile & Windows Autoplay Fix
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
        className="absolute top-0 left-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // Vimeo - Mobile & Windows Autoplay Fix
  if (url.includes("vimeo.com")) {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = match ? match[1] : null;

    if (videoId) {
      const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&playsinline=1&autopause=0`;

      return (
        <iframe
          src={embedUrl}
          title="Vimeo Live Stream"
          className="absolute top-0 left-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }

  // 02) Facebook - Mobile & Windows Autoplay Fix
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

  // 03) Twitch - Mobile & Windows Autoplay Fix
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

  // Direct Video Files & HLS / .m3u8 Live Streams Handler
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