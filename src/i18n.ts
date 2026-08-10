import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ja", "de", "fr", "es", "it", "nl", "ru", "zh", "ko", "ar", "hi"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  console.log("🔥 i18n.ts resolved locale ->", locale);

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: {
      ChatWidget: (await import(`./languages/${locale}/ChatWidget`)).default,
      RootLayout: (await import(`./languages/${locale}/RootLayout`)).default,
      SiteHeader: (await import(`./languages/${locale}/SiteHeader`)).default,
      Footer: (await import(`./languages/${locale}/Footer`)).default,
      ValidationErrors: (await import(`./languages/${locale}/ValidationErrors`)).default,
      HomePage: (await import(`./languages/${locale}/HomePage`)).default,
      FaqPage: (await import(`./languages/${locale}/FaqPage`)).default,
      LegalPage: (await import(`./languages/${locale}/LegalPage`)).default,
      Auth: (await import(`./languages/${locale}/Auth`)).default,
      SharedForm: (await import(`./languages/${locale}/SharedForm`)).default,
      ProfilePage: (await import(`./languages/${locale}/ProfilePage`)).default,
      ContactPage: (await import(`./languages/${locale}/ContactPage`)).default,
      Services: (await import(`./languages/${locale}/Services`)).default,
      AboutPage: (await import(`./languages/${locale}/AboutPage`)).default,
      Tours: (await import(`./languages/${locale}/Tours`)).default,
      Destinations: (await import(`./languages/${locale}/Destinations`)).default,
      Events: (await import(`./languages/${locale}/Events`)).default,
      Blog: (await import(`./languages/${locale}/Blog`)).default,
      Testimonials: (await import(`./languages/${locale}/Testimonials`)).default,
      Booking: (await import(`./languages/${locale}/Booking`)).default,
      PromoModal: (await import(`./languages/${locale}/PromoModal`)).default,
      NotFoundPage: (await import(`./languages/${locale}/NotFoundPage`)).default,
    },
  };
});
