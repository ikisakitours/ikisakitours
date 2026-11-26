// src/config/contactConfig.ts
export const contactConfig = {
  whatsappNumber: "+94757972582",
  lineId: "dcnpathirana", 

  // 2. Social Media URLs
  socials: {
    instagram: "https://www.instagram.com/invites/contact/?utm_content=fct2z9y&srtk=13xdne3anuwe4",
    tiktok: "#",
    facebook: "https://www.facebook.com/share/1CTWYY8aWz/?mibextid=wwXIfr",
    twitter: "#",
    youtube: "#",
  },

  //3.  Brand Details
  brand: {
    name: "Two2Flod",
    url: "https://pramod-siriwardhana.vercel.app/",
    logoUrl: "/Layout-Icons/two2flod-brand-seal.webp",
  },

  getWhatsappUrl: (text: string = "") =>
    `https://wa.me/${contactConfig.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`,

  getLineUrl: () => `https://line.me/ti/p/${contactConfig.lineId}`,
};
