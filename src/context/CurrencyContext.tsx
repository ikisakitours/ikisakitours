"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { languages } from "@/data/Languages-CurrencyData";

const CURRENCY_KEY = "ikisaki_currency";
const LOCALE_KEY = "ikisaki_last_locale";
const RATES_KEY = "ikisaki_rates";
const RATES_TTL = 12 * 60 * 60 * 1000;

type Rates = Record<string, number>;

type CurrencyContextValue = {
  currency: string;
  setCurrency: (code: string) => void;
  formatPrice: (usdAmount: number) => string;
  isReady: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const [currency, setCurrencyState] = useState("USD");
  const [rates, setRates] = useState<Rates | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const langObj = languages.find((l) => l.code.toLowerCase() === locale.toLowerCase());
      const localeDefault = langObj?.currency || "USD";

      const savedCurrency = localStorage.getItem(CURRENCY_KEY);
      const savedLocale = localStorage.getItem(LOCALE_KEY);

      if (savedLocale !== locale || !savedCurrency) {
        setCurrencyState(localeDefault);
        localStorage.setItem(CURRENCY_KEY, localeDefault);
        localStorage.setItem(LOCALE_KEY, locale);
      } else {
        setCurrencyState(savedCurrency);
      }
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [locale]);

  useEffect(() => {
    const onLanguageChanged = (e: Event) => {
      const code = (e as CustomEvent).detail as string | undefined;
      if (code) {
        setCurrencyState(code);
        localStorage.setItem(CURRENCY_KEY, code);
      }
    };
    window.addEventListener("languageChanged", onLanguageChanged);
    return () => window.removeEventListener("languageChanged", onLanguageChanged);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        const cached = localStorage.getItem(RATES_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as { rates: Rates; savedAt: number };
          if (Date.now() - parsed.savedAt < RATES_TTL) {
            setRates(parsed.rates);
            return;
          }
        }
      } catch {
        /* ignore */
      }

      try {
        const res = await fetch("/exchange-rates");
        if (!res.ok) throw new Error("Rates request failed");
        const data = (await res.json()) as { rates: Rates };
        if (cancelled) return;
        setRates(data.rates);
        try {
          localStorage.setItem(RATES_KEY, JSON.stringify({ rates: data.rates, savedAt: Date.now() }));
        } catch {
          /* ignore */
        }
      } catch (err) {
        console.error("Exchange rates error:", err);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(CURRENCY_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const formatPrice = useCallback(
    (usdAmount: number) => {
      const rate = currency === "USD" ? 1 : rates?.[currency];
      const shownCurrency = rate ? currency : "USD";
      const amount = usdAmount * (rate ?? 1);

      try {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: shownCurrency,
          currencyDisplay: "narrowSymbol",
          minimumFractionDigits: 0,
          maximumFractionDigits: shownCurrency === "USD" ? 2 : 0,
        }).format(amount);
      } catch {
        return `${shownCurrency} ${Math.round(amount)}`;
      }
    },
    [currency, rates, locale],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice, isReady }),
    [currency, setCurrency, formatPrice, isReady],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
