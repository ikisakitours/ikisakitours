import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ja"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  console.log("🔥 i18n.ts resolved locale ->", locale);

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: {
      ChatWidget: (await import(`./languages/${locale}/ChatWidget.json`)).default,
      RootLayout: (await import(`./languages/${locale}/RootLayout.json`)).default,
      SiteHeader: (await import(`./languages/${locale}/SiteHeader.json`)).default,
      Footer: (await import(`./languages/${locale}/Footer.json`)).default,
      ValidationErrors: (await import(`./languages/${locale}/ValidationErrors.json`)).default,
      HomePage: (await import(`./languages/${locale}/HomePage.json`)).default,
      FaqPage: (await import(`./languages/${locale}/FaqPage.json`)).default,
      LegalPage: (await import(`./languages/${locale}/LegalPage.json`)).default,
      Auth: (await import(`./languages/${locale}/Auth.json`)).default,
      SharedForm: (await import(`./languages/${locale}/SharedForm.json`)).default,
      ProfilePage: (await import(`./languages/${locale}/ProfilePage.json`)).default,
      ContactPage: (await import(`./languages/${locale}/ContactPage.json`)).default,
      Services: (await import(`./languages/${locale}/Services.json`)).default,
      AboutPage: (await import(`./languages/${locale}/AboutPage.json`)).default,
      Tours: (await import(`./languages/${locale}/Tours.json`)).default,
      Destinations: (await import(`./languages/${locale}/Destinations.json`)).default,
      Events: (await import(`./languages/${locale}/Events.json`)).default,
      Blog: (await import(`./languages/${locale}/Blog.json`)).default,
      Testimonials: (await import(`./languages/${locale}/Testimonials.json`)).default,
      Booking: (await import(`./languages/${locale}/Booking.json`)).default,
      PromoModal: (await import(`./languages/${locale}/PromoModal.json`)).default,
      NotFoundPage: (await import(`./languages/${locale}/NotFoundPage.json`)).default,
    },
  };
});
