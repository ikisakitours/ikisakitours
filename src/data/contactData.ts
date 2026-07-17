import { Headphones, Globe, ShieldCheck, Mail, Phone, MapPin, Clock } from "lucide-react";

export const contactData = {
  hero: {
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    altText: "Sri Lankan sunset",
    eyebrow: "Start a Conversation",
    title: "A better trip starts with a clear first message",
    accent: "first message",
    strapline: "Send your travel dates, group size, interests, and questions.",
  },
  introCard: {
    badge: "✨ Start a conversation",
    titleMain: "A better trip starts with a",
    titleBreak: "clear first message",
    description:
      "Send your travel dates, group size, interests, and questions. We can help with custom itineraries, transport, day tours, accommodation ideas, ticketing, and visa support.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Local Travel Desk",
    imageBadge: "Local Travel Desk",
    imageDesc: "Personal planning, fast follow-up, practical guidance",
  },
  sidebar: {
    title: "Contact Info",
    info: [
      { icon: Mail, label: "Email Us", value: "hello@ceylontripdeals.com" },
      { icon: Phone, label: "Call Us", value: "+94 76 179 4522" },
      { icon: MapPin, label: "Our Office", value: "Dambulla, Srilanka, 21120" },
      { icon: Clock, label: "Working Hours", value: "Mon - Fri: 9 AM - 6 PM" },
    ],
    whatsapp: {
      title: "Prefer WhatsApp?",
      buttonText: "Chat on WhatsApp",
    },
  },
  form: {
    title: "Send Us a Message",
    tourOptions: ["Day Tour", "Multi-day Tour", "Airport Transfer", "Private Chauffeur"],
  },
  features: [
    {
      icon: Headphones,
      title: "Travel Specialists",
      desc: "Talk to a local team that understands routes, timing, hotels, and guest comfort.",
    },
    {
      icon: Globe,
      title: "Custom Planning",
      desc: "Share your pace, interests, budget, and dates. We will shape the next steps around you.",
    },
    {
      icon: ShieldCheck,
      title: "Clear Follow-up",
      desc: "Your inquiry is sent into our lead desk so the right person can respond with context.",
    },
  ],
};
