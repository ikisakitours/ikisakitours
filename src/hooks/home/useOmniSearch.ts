import { useState, useMemo, useRef, useEffect } from "react";
import { destinationsData } from "@/data/destinationData";
import { oneDayTours } from "@/data/oneDayTours";
import { packages } from "@/data/multiDaysTours";
import { blogPosts } from "@/data/blog";
import { allSpecialEventsList } from "@/data/specialEvents";

export function useOmniSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Logic
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return null;

    const dests = destinationsData
      .filter((d) => d.name.toLowerCase().includes(query) || d.region.toLowerCase().includes(query))
      .slice(0, 3);

    const multiDayToursList = packages
      .filter((t) => t.title.toLowerCase().includes(query) || t.categoryLabel.toLowerCase().includes(query))
      .slice(0, 3)
      .map((t) => ({ ...t, tourType: "Multi-Day Tour" }));

    const oneDayToursList = oneDayTours
      .filter((t) => t.title.toLowerCase().includes(query) || t.categoryLabel.toLowerCase().includes(query))
      .slice(0, 3)
      .map((t) => ({ ...t, tourType: "One-Day Tour" }));

    const combinedTours = [...multiDayToursList, ...oneDayToursList].slice(0, 4);

    const blogs = blogPosts
      .filter((b) => b.title.toLowerCase().includes(query) || b.category.toLowerCase().includes(query))
      .slice(0, 3);

    const events = allSpecialEventsList.filter((e) => e.title.toLowerCase().includes(query)).slice(0, 3);

    const hasResults = dests.length > 0 || combinedTours.length > 0 || blogs.length > 0 || events.length > 0;

    return { dests, combinedTours, blogs, events, hasResults };
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsDropdownOpen(true);
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 800);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    setIsTyping(false);
  };

  return {
    searchQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    isTyping,
    searchContainerRef,
    searchResults,
    handleSearchChange,
    clearSearch,
  };
}