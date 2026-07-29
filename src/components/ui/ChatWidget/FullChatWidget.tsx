"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, MessageSquareText } from "lucide-react";
import { ChatHome } from "@/components/ui/ChatWidget/ChatHome";
import { ChatMessages } from "@/components/ui/ChatWidget/ChatMessages";
import { ChatMailForm } from "@/components/ui/ChatWidget/ChatMailForm";
import { ChatHeader } from "@/components/ui/ChatWidget/ChatHeader";
import { ChatTooltips } from "@/components/ui/ChatWidget/ChatTooltips";
import { ChatToggleButton } from "@/components/ui/ChatWidget/ChatToggleButton";

export function FullChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [showSideTooltip, setShowSideTooltip] = useState(false);
  const [showBottomTooltip, setShowBottomTooltip] = useState(false);

  const [isBottomDismissed, setIsBottomDismissed] = useState(false);

  const [activeTab, setActiveTab] = useState<"home" | "messages">("home");
  const [showMailForm, setShowMailForm] = useState(false);

  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsMobileMenuOpen(customEvent.detail.isOpen);

      if (customEvent.detail.isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mobileMenuStateChange", handleMenuStateChange);
    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuStateChange);
    };
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearSideTimer = () => {
    if (sideTimerRef.current) {
      clearTimeout(sideTimerRef.current);
      sideTimerRef.current = null;
    }
  };

  const scheduleSideTooltip = (delay: number) => {
    clearSideTimer();
    sideTimerRef.current = setTimeout(() => {
      if (!isOpenRef.current) {
        setShowSideTooltip(true);
      }
    }, delay);
  };

  useEffect(() => {
    scheduleSideTooltip(3000);

    const bottomTimer = setTimeout(() => {
      if (!isOpenRef.current && !isBottomDismissed) {
        setShowBottomTooltip(true);
      }
    }, 3000);

    return () => {
      clearSideTimer();
      clearTimeout(bottomTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseSideTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSideTooltip(false);
    scheduleSideTooltip(10000);
  };

  const handleCloseBottomTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBottomTooltip(false);
    setIsBottomDismissed(true);
  };

  const toggleChat = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      setShowSideTooltip(false);
      setShowBottomTooltip(false);
      setIsBottomDismissed(true);
      clearSideTimer();
      setActiveTab("home");
      setShowMailForm(false);
    } else {
      scheduleSideTooltip(10000);
    }
  };

  const whatsappNumber = "94770000000";
  const defaultMessage = "Hello! I would like to plan a tour to Sri Lanka.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className={`relative z-9999 flex-col items-end transition-opacity duration-300 ${isMobileMenuOpen ? "hidden xl:flex" : "flex"}`}
    >
      <div
        className={`absolute bottom-20 -right-1 w-86.25 max-[365px]:w-81.25 max-[350px]:w-76.25 sm:w-90 md:w-92.5 lg:w-95 3xl:w-96.25 glass-card rounded-3xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto shadow-2xl"
            : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        <ChatHeader showMailForm={showMailForm} setShowMailForm={setShowMailForm} toggleChat={toggleChat} />

        <div className="p-5 bg-surface/95 backdrop-blur-xl overflow-y-auto no-scrollbar max-h-[55vh]">
          {showMailForm ? (
            <ChatMailForm />
          ) : activeTab === "home" ? (
            <ChatHome onNewChat={() => setActiveTab("messages")} />
          ) : (
            <ChatMessages onEmailClick={() => setShowMailForm(true)} waLink={waLink} />
          )}
        </div>

        {!showMailForm && (
          <div className="flex border-t border-white/10 bg-lanka-black/95 shrink-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === "home" ? "text-gold" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Home size={18} />
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === "messages" ? "text-gold" : "text-slate-500 hover:text-slate-300"}`}
            >
              <MessageSquareText size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-center">
        <ChatTooltips
          isOpen={isOpen}
          showSideTooltip={showSideTooltip}
          showBottomTooltip={showBottomTooltip}
          isBottomDismissed={isBottomDismissed}
          onCloseSideTooltip={handleCloseSideTooltip}
          onCloseBottomTooltip={handleCloseBottomTooltip}
        />

        <ChatToggleButton isOpen={isOpen} toggleChat={toggleChat} />
      </div>
    </div>
  );
}
