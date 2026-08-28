"use client";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { CurrencySelector } from "@/components/layout/CurrencySelector";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { UserProfileAvatar } from "./UserProfileAvatar";
import { useTranslations } from "next-intl";
import { primaryNavigation } from "@/data/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Link, useRouter, usePathname } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";
import { useToast } from "@/context/ToastContext";

//Icons
import { LogOut, UserRound } from "lucide-react";

const navLinkClass =
  "relative pb-1 transition-colors duration-[400ms] after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] after:transition-all after:duration-[400ms] after:ease-[cubic-bezier(0.4,0,0.2,1)] after:content-[''] hover:text-gold hover:[text-shadow:0_0_10px_rgba(197,160,89,0.3)] hover:after:w-full";

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

// ==========================================
// 1. Framer Motion Curve SVG Component
// ==========================================
const Curve = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowHeight === 0) return null;

  const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curveVariants: Variants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: customEase },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  return (
    <svg className="absolute top-0 -left-24.75 w-25 h-full stroke-none pointer-events-none fill-[#0a0a0a]">
      <motion.path variants={curveVariants} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

export function SiteHeader() {
  const tNav = useTranslations("SiteHeader.navigation");
  const tDropdown = useTranslations("SiteHeader.Dropdown");
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const getFinalHref = (itemHref: string, itemSectionId?: string) => {
    if (isHome && itemSectionId) {
      return itemSectionId;
    }
    return itemHref;
  };

  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>, targetHref: string, isMobileMenu: boolean) => {
    if (isMobileMenu) {
      closeMobileMenu();
      window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: false } }));
    }

    if (targetHref.startsWith("#")) {
      e.preventDefault();
      const elementId = targetHref.replace("#", "");

      if (elementId.startsWith("tours-")) {
        window.dispatchEvent(new CustomEvent("tourTabChange", { detail: elementId }));
      }

      const scrollTargetId = elementId.startsWith("tours-") ? "tours" : elementId;

      const scrollAction = () => {
        const element = document.getElementById(scrollTargetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (isMobileMenu) {
        setTimeout(scrollAction, 600);
      } else {
        scrollAction();
      }
    } else if (isMobileMenu) {
      e.preventDefault();
      setTimeout(() => {
        router.push(targetHref);
      }, 600);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  // Logout Button
  const handleLogout = async () => {
    const toastId = toast.loading("Logout");

    try {
      const [response] = await Promise.all([authService.logout(), new Promise((resolve) => setTimeout(resolve, 800))]);

      toast.success(toastId, "Logout successful! Come Again.", 2000);

      console.log("Login valid and submitted!", response);

      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } catch (error) {
      toast.error(toastId, "Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  // ==========================================
  // Framer Motion Animation Variants
  // ==========================================
  const menuVariants: Variants = {
    initial: { x: "calc(100% + 100px)" },
    enter: {
      x: "0%",
      transition: { duration: 0.8, ease: customEase },
    },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.8, ease: customEase },
    },
  };

  const navLinksContainerVariants: Variants = {
    initial: {},
    enter: {
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const linkVariants: Variants = {
    initial: { x: 40, opacity: 0 },
    enter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: customEase },
    },
    exit: {
      x: 40,
      opacity: 0,
      transition: { duration: 0.4, ease: customEase },
    },
  };

  const bottomActionVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    let isCurrentlyScrolled = false;

    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;

      if (shouldBeScrolled !== isCurrentlyScrolled) {
        isCurrentlyScrolled = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWindowClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!profileDropdownRef.current?.contains(target) && !profileButtonRef.current?.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("pointerdown", handleWindowClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handleWindowClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobileMenu = () => setIsMenuOpen(false);
  const closeProfileDropdown = () => setIsProfileOpen(false);

  const handleMobileMenuClick = () => {
    const nextValue = !isMenuOpen;
    setIsMenuOpen(nextValue);
    if (nextValue) {
      closeProfileDropdown();
    }
    window.dispatchEvent(new CustomEvent("mobileMenuStateChange", { detail: { isOpen: nextValue } }));
  };

  const handleProfileClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => {
        setIsProfileOpen(true);
      }, 800);
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <nav
        id="main-nav"
        ref={navRef}
        className={`top-0 left-0 fixed w-full z-100 border-b transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "border-b-[rgba(212,175,55,0.2)] bg-[rgba(5,5,5,0.9)] backdrop-blur-[20px]"
            : "border-white/0"
        }`}
      >
        <ContainerLayout>
          <div
            id="nav-container"
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "h-17.5" : "h-20 sm:h-24"
            }`}
          >
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="group flex shrink-0 items-center space-x-2 relative z-101"
            >
              <LoadingImage
                src="/images/bg-remove.png"
                alt="ikisaki-tours-Logo"
                width={200}
                height={80}
                wrapperClassName="w-full h-full"
                className="h-15 w-auto object-contain transition-transform duration-500 group-hover:scale-105 sm:h-16 lg:h-18"
                priority
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">
                Iki<span className="gold-gradient-text">Saki</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="mt-1.75 hidden items-center space-x-8 text-[13px]! font-bold uppercase tracking-[0.2em] text-slate-200 xl:flex xl:space-x-4 2xl:space-x-7">
              {primaryNavigation.map((item) => {
                return (
                  <div key={item.key} className="group relative flex items-center">
                    {"isDropdown" in item && item.isDropdown ? (
                      <>
                        <button
                          className={`${navLinkClass} flex items-center gap-1 uppercase tracking-[0.25em] [word-spacing:3px]`}
                        >
                          {tNav(item.key)}
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div className="absolute left-0 top-full invisible mt-4 flex min-w-max flex-col rounded-xl border border-white/10 bg-[#0a0a0a]/95 py-3 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-300 group-hover:visible group-hover:mt-2 group-hover:opacity-100">
                          {item.subItems?.map((sub) => {
                            const subFinalHref = getFinalHref(sub.href, sub.sectionId);
                            return (
                              <Link
                                key={sub.href}
                                href={subFinalHref}
                                onClick={(e) => handleNavigation(e, subFinalHref, false)}
                                className="px-5 py-2.5 text-[11px]! tracking-[0.15em] [word-spacing:3px] text-white/80 hover:bg-gold/10 hover:text-gold transition-colors block"
                              >
                                {tNav(sub.key)}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      "href" in item && (
                        <Link
                          href={getFinalHref(item.href, item.sectionId)}
                          onClick={(e) => handleNavigation(e, getFinalHref(item.href, item.sectionId), false)}
                          className={`${navLinkClass} flex items-center text-[13px]! tracking-[0.25em] [word-spacing:3px]`}
                        >
                          {tNav(item.key)}
                        </Link>
                      )
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 relative z-101">
              {/* Desktop Language Selector */}
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>

              {/* Desktop Currency Selector */}
              <div className="hidden lg:block">
                <CurrencySelector />
              </div>

              {/*  Login Button */}
              {/* <Link
                href="/auth-gateway"
                className="  relative group items-center justify-center px-7 py-1.75 rounded-full overflow-hidden border border-gold/40 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent text-gold text-body-sm font-semibold tracking-wider uppercase backdrop-blur-xl transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="absolute inset-0 bg-linear-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <span className="relative z-10 flex items-center gap-2">Login</span>
              </Link>  */}

              {/* Profile Dropdown */}
              <div className="relative flex items-center" id="profile-dropdown-container">
                <button
                  id="profile-menu-btn"
                  ref={profileButtonRef}
                  type="button"
                  aria-expanded={isProfileOpen}
                  aria-label="Open profile menu"
                  onClick={handleProfileClick}
                  className="group flex items-center focus:outline-none"
                >
                  <UserProfileAvatar
                    src="https://i.pravatar.cc/96?img=12"
                    initials="AT"
                    initialsClassName="font-serif text-xs"
                  />

                  <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-[#0a0a0a] border border-gold/30 px-3 py-1.5 text-tiny font-bold uppercase tracking-wider text-gold opacity-0 transition-all duration-200 group-hover:opacity-100 shadow-2xl z-50 hidden md:block">
                    {tDropdown("tooltip")}
                  </span>
                </button>

                <div
                  id="profile-dropdown"
                  ref={profileDropdownRef}
                  className={`absolute right-0 top-full mt-4 w-56 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
                    isProfileOpen
                      ? "pointer-events-auto scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  <div className="border-b border-white/5 bg-white/5 px-6 py-4">
                    <p className="truncate text-body-sm font-bold text-white" id="dropdown-user-name">
                      Alex Thompson
                    </p>
                    <p className="truncate text-caption tracking-widest text-slate-400" id="dropdown-user-email">
                      pramodpremudu10@gmail.com
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={closeProfileDropdown}
                      className="flex items-center px-6 py-3 text-body-sm text-slate-200 transition-colors hover:bg-gold/10 hover:text-gold"
                    >
                      <UserRound className="mr-3 h-4 w-4" />
                      {tDropdown("seeProfile")}
                    </Link>
                    <div className="mx-4 my-1 border-t border-white/5" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center px-6 py-3 text-left text-body-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      {tDropdown("logOut")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Hamburger Button */}
              <button
                id="mobile-menu-btn"
                type="button"
                aria-expanded={isMenuOpen}
                aria-label="Toggle Menu"
                onClick={handleMobileMenuClick}
                className="group relative flex h-10 w-10 flex-col items-center justify-center focus:outline-none xl:hidden"
              >
                <span
                  className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${
                    isMenuOpen ? "translate-y-px rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-translate-x-2.5 opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-translate-y-0.5 -rotate-45" : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </ContainerLayout>
      </nav>

      {/* ========================================== */}
      {/* 2. Framer Motion Animated Mobile Menu */}
      {/* ========================================== */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Background Overlay (Click to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90 xl:hidden"
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              id="animated-mobile-menu"
              layout
              variants={menuVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="fixed top-0 right-0 h-dvh w-full sm:w-100 bg-[#0a0a0a] z-95 xl:hidden flex flex-col shadow-2xl will-change-transform border-l border-white/5"
            >
              <Curve />

              <div className="absolute top-[-10%] right-[-10%] w-62.5 h-62.5 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex-1 flex flex-col justify-start px-8 pt-32 pb-10 overflow-y-auto relative z-10 no-scrollbar">
                <motion.div
                  variants={navLinksContainerVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="flex flex-col space-y-4 text-center"
                >
                  {primaryNavigation.map((item) => {
                    return (
                      <motion.div key={item.key} variants={linkVariants}>
                        {"isDropdown" in item && item.isDropdown ? (
                          <div className="flex flex-col space-y-4 mt-4">
                            <span className="text-[17px] font-bold uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mx-auto inline-block">
                              {tNav(item.key)}
                            </span>
                            {item.subItems?.map((sub) => {
                              const subFinalHref = getFinalHref(sub.href, sub.sectionId);
                              return (
                                <Link
                                  key={sub.href}
                                  onClick={(e) => handleNavigation(e, subFinalHref, true)}
                                  href={subFinalHref}
                                  className="text-[15px] font-bold uppercase tracking-[0.25em] [word-spacing:6px] block transition-colors duration-300 text-white hover:text-gold hover:scale-105"
                                >
                                  {tNav(sub.key)}
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          "href" in item && (
                            <Link
                              onClick={(e) => handleNavigation(e, getFinalHref(item.href, item.sectionId), true)}
                              href={getFinalHref(item.href, item.sectionId)}
                              className="text-[15px] font-bold uppercase tracking-[0.35em] [word-spacing:6px] block transition-colors duration-300 text-white hover:text-gold hover:scale-105"
                            >
                              {tNav(item.key)}
                            </Link>
                          )
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Bottom Actions (Language & Currency) */}
                <motion.div
                  variants={bottomActionVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center space-y-8"
                >
                  {/* Fixed Dropdown Bug: Targets ONLY the w-80 dropdown container and makes it open UPWARDS */}
                  <div className="lg:hidden relative z-50 flex flex-col space-y-4 w-full justify-center items-center [&_.w-80.absolute]:right-auto! [&_.w-80.absolute]:left-1/2! [&_.w-80.absolute]:-translate-x-1/2! [&_.w-80.absolute]:bottom-full! [&_.w-80.absolute]:top-auto! [&_.w-80.absolute]:mb-2! [&_.w-80.absolute]:mt-0! [&_.w-80.absolute]:origin-bottom!">
                    {/* Language Selector Above Currency */}
                    <LanguageSelector />

                    {/* Currency Selector Below */}
                    <CurrencySelector />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
