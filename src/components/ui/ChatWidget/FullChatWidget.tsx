"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, MessageSquareText } from "lucide-react";
import { ChatHome } from "@/components/ui/ChatWidget/ChatHome";
import { ChatMessages } from "@/components/ui/ChatWidget/ChatMessages";
import { ChatMailForm } from "@/components/ui/ChatWidget/ChatMailForm";
import { ChatHeader } from "@/components/ui/ChatWidget/ChatHeader";
import { ChatTooltips } from "@/components/ui/ChatWidget/ChatTooltips";
import { ChatToggleButton } from "@/components/ui/ChatWidget/ChatToggleButton";
import { useDocumentTitleNotification } from "@/hooks/useDocumentTitleNotification";
import { useTranslations } from "next-intl";

export function FullChatWidget() {
  const tWidget = useTranslations("ChatWidget.Widget");
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);

  // States initialized without direct window references to prevent hydration mismatch
  const [showSideTooltip, setShowSideTooltip] = useState(false);
  const [showBottomTooltip, setShowBottomTooltip] = useState(false);
  const [isBottomDismissed, setIsBottomDismissed] = useState(false);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasShownBottomTooltip, setHasShownBottomTooltip] = useState(false);

  const [activeTab, setActiveTab] = useState<"home" | "messages">("home");
  const [showMailForm, setShowMailForm] = useState(false);

  const isOpenRef = useRef(isOpen);
  const [isAtBottom, setIsAtBottom] = useState(false);

  //Tab Heder Message
  useDocumentTitleNotification(showBottomTooltip && !isOpen, "💬 1 New Message!");

  // On mount, read from sessionStorage safely using setTimeout to prevent synchronous setState warning
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);

      const bottomShown = sessionStorage.getItem("chat_bottom_shown") === "true";
      const bottomDismissed = sessionStorage.getItem("chat_bottom_dismissed") === "true";
      const initialized = sessionStorage.getItem("chat_initialized") === "true";
      const interacted = sessionStorage.getItem("chat_interacted") === "true";

      setShowBottomTooltip(bottomShown && !bottomDismissed);
      setIsBottomDismissed(bottomDismissed);
      setIsPreloaderFinished(initialized);
      setShowChatWidget(initialized);
      setHasInteracted(interacted);
      setHasShownBottomTooltip(bottomShown);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Tab Title Blinking effect when bottom tooltip is shown
  // useEffect(() => {
  //   if (!isMounted) return;

  //   let intervalId: NodeJS.Timeout;

  //   if (showBottomTooltip && !isOpen) {
  //     const currentTitle = document.title.startsWith("💬") ? "MapMate - Sri Lanka Tours" : document.title;
  //     let toggle = false;

  //     intervalId = setInterval(() => {
  //       document.title = toggle ? "💬 1 New Message!" : currentTitle;
  //       toggle = !toggle;
  //     }, 1500);
  //   }

  //   return () => {
  //     clearInterval(intervalId);
  //     if (document.title.startsWith("💬")) {
  //       document.title = document.title.includes("MapMate") ? "MapMate - Sri Lanka Tours" : "MapMate";
  //     }
  //   };
  // }, [showBottomTooltip, isOpen, isMounted]);

  useEffect(() => {
    if (!isMounted || isPreloaderFinished) return;

    const preloaderTimer = setTimeout(() => {
      setIsPreloaderFinished(true);

      const showTimer = setTimeout(() => {
        setShowChatWidget(true);
        sessionStorage.setItem("chat_initialized", "true");
      }, 800);

      return () => clearTimeout(showTimer);
    }, 4000);

    return () => clearTimeout(preloaderTimer);
  }, [isMounted, isPreloaderFinished]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      const isMenuOpen = customEvent.detail.isOpen;

      if (isMenuOpen) {
        clearTimeout(timeoutId);
        setIsMobileMenuOpen(true);
        setIsOpen(false);
      } else {
        timeoutId = setTimeout(() => {
          setIsMobileMenuOpen(false);
        }, 800);
      }
    };

    const handleGlobalModalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsGlobalModalOpen(customEvent.detail.isOpen);
      if (customEvent.detail.isOpen) {
        setIsOpen(false); // Modal එකක් එද්දි Chat එකත් වහනවා
      }
    };

    window.addEventListener("mobileMenuStateChange", handleMenuStateChange);
    window.addEventListener("globalModalStateChange", handleGlobalModalChange);
    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuStateChange);
      window.removeEventListener("globalModalStateChange", handleGlobalModalChange);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !isPreloaderFinished || hasInteracted) return;

    const handleRealClickOrTap = () => {
      setHasInteracted(true);
      sessionStorage.setItem("chat_interacted", "true");
      window.removeEventListener("click", handleRealClickOrTap);
    };

    window.addEventListener("click", handleRealClickOrTap, { once: true });
    return () => {
      window.removeEventListener("click", handleRealClickOrTap);
    };
  }, [isMounted, isPreloaderFinished, hasInteracted]);

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
      if (!isOpenRef.current && hasInteracted && isPreloaderFinished) {
        setShowSideTooltip(true);
      }
    }, delay);
  };

  useEffect(() => {
    if (!isMounted || !isPreloaderFinished || !hasInteracted) return;

    scheduleSideTooltip(3000);

    if (!hasShownBottomTooltip) {
      const bottomTimer = setTimeout(() => {
        if (!isOpenRef.current && !isBottomDismissed) {
          setShowBottomTooltip(true);
          setHasShownBottomTooltip(true);
          sessionStorage.setItem("chat_bottom_shown", "true");

          try {
            const audio = new Audio("/sounds/notification.mp3");
            audio.volume = 0.5;
            audio.play().catch((err) => {
              console.log("Audio play prevented:", err);
            });
          } catch (e) {
            console.error("Audio error:", e);
          }
        }
      }, 3000);

      return () => {
        clearSideTimer();
        clearTimeout(bottomTimer);
      };
    } else {
      return () => {
        clearSideTimer();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, isPreloaderFinished, hasInteracted, isBottomDismissed, hasShownBottomTooltip]);

  const handleCloseSideTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSideTooltip(false);
    scheduleSideTooltip(10000);
  };

  const handleCloseBottomTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBottomTooltip(false);
    setIsBottomDismissed(true);
    sessionStorage.setItem("chat_bottom_dismissed", "true");
  };

  const toggleChat = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      setShowSideTooltip(false);
      setShowBottomTooltip(false);
      setIsBottomDismissed(true);
      sessionStorage.setItem("chat_bottom_dismissed", "true");
      clearSideTimer();
      setActiveTab("home");
      setShowMailForm(false);
    } else {
      if (hasInteracted && isPreloaderFinished) {
        scheduleSideTooltip(10000);
      }
    }
  };

  useEffect(() => {
    if (!isMounted) return;

    const handleScrollAndResize = () => {
      const isMobileOrTablet = window.innerWidth < 1024;

      if (isMobileOrTablet) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (pageHeight - scrollPosition < 200) {
          setIsAtBottom(true);
        } else {
          setIsAtBottom(false);
        }
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize, { passive: true });

    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, [isMounted]);

  const whatsappNumber = "94789187072";
  const defaultMessage = tWidget("whatsappDefaultText");
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  if (!isMounted) return null; // Prevents hydration error by rendering nothing until client-side is ready

  return (
    <div
      className={`relative z-9999 flex-col items-end transition-all duration-700 ${
        showChatWidget ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${isGlobalModalOpen ? "hidden" : isMobileMenuOpen ? "hidden xl:flex" : "flex"}`}
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
          showSideTooltip={showSideTooltip && !isAtBottom}
          showBottomTooltip={showBottomTooltip}
          isBottomDismissed={isBottomDismissed}
          onCloseSideTooltip={handleCloseSideTooltip}
          onCloseBottomTooltip={handleCloseBottomTooltip}
        />

        <ChatToggleButton isOpen={isOpen} toggleChat={toggleChat} isAtBottom={isAtBottom} />
      </div>
    </div>
  );
}
