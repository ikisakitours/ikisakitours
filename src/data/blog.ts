export const blogHero = {
  eyebrow: "The Journal",
  title: "Curated Experiences",
  accent: "Experiences",
  strapline: "Travel stories, cultural notes, and guides from the heart of Sri Lanka.",
  image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2400",
} as const;

export type BlogCategory = string;

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
};

export type BlogPost = {
  slug: string;
  number: string;
  category: BlogCategory;
  title: string;
  titleEmphasis?: string;
  excerpt: string;
  image: string;
  readTime: string;
  likes: number;
  published: string;
  gallery: GalleryItem[];
};


export const blogPosts: BlogPost[] = [
  {
    slug: "verdant-highlands",
    number: "01",
    category: "nature",
    title: "The Verdant Highlands",
    excerpt: "A guide for seasonal weather patterns and when tea estates are at their absolute greenest.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=800",
    readTime: "5 min read",
    likes: 24,
    published: "January 8, 2026",
    gallery: [
      {
        id: "vh-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "The Verdant Highlands - 1",
        category: "nature",
        title: "The Verdant Highlands ",
      },
      {
        id: "vh-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "The Verdant Highlands - 2",
        category: "nature",
        title: "The Verdant Highlands",
      },
      {
        id: "vh-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "The Verdant Highlands - 3",
        category: "nature",
        title: "The Verdant Highlands",
      },
      {
        id: "vh-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "The Verdant Highlands - 4",
        category: "nature",
        title: "The Verdant Highlands",
      },
    ],
  },
  {
    slug: "spice-secrets-of-ancient-ceylon",
    number: "02",
    category: "gastronomy",
    title: "Spice Secrets of Ancient Ceylon",
    excerpt: "Navigating authentic Sri Lankan heat while preserving complex flavor profiles.",
    image: "https://images.unsplash.com/photo-1596797038530-2c396b57442f?w=800",
    readTime: "4 min read",
    likes: 48,
    published: "January 11, 2026",
    gallery: [
      {
        id: "ss-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Spice Secrets - 1",
        category: "gastronomy",
        title: "Spice Secrets of Ancient Ceylon",
      },
      {
        id: "ss-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Spice Secrets - 2",
        category: "gastronomy",
        title: "Spice Secrets of Ancient Ceylon",
      },
      {
        id: "ss-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Spice Secrets - 3",
        category: "gastronomy",
        title: "Spice Secrets of Ancient Ceylon",
      },
      {
        id: "ss-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Spice Secrets - 4",
        category: "gastronomy",
        title: "Spice Secrets of Ancient Ceylon",
      },
    ],
  },
  {
    slug: "kingdoms-of-dust-and-stone",
    number: "03",
    category: "heritage",
    title: "Kingdoms of Dust & Stone",
    excerpt: "A deep dive into the architectural marvels of the Cultural Triangle.",
    image: "https://images.unsplash.com/photo-1588598116712-426915264300?w=800",
    readTime: "8 min read",
    likes: 56,
    published: "January 14, 2026",
    gallery: [
      {
        id: "kd-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Kingdoms of Dust & Stone - 1",
        category: "heritage",
        title: "Kingdoms of Dust & Stone",
      },
      {
        id: "kd-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Kingdoms of Dust & Stone - 2",
        category: "heritage",
        title: "Kingdoms of Dust & Stone",
      },
      {
        id: "kd-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Kingdoms of Dust & Stone - 3",
        category: "heritage",
        title: "Kingdoms of Dust & Stone",
      },
      {
        id: "kd-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Kingdoms of Dust & Stone - 4",
        category: "heritage",
        title: "Kingdoms of Dust & Stone",
      },
    ],
  },
  {
    slug: "ayurvedic-rituals-for-the-soul",
    number: "04",
    category: "wellness",
    title: "Ayurvedic Rituals for the Soul",
    excerpt: "Ancient healing practices designed to restore balance to the modern traveler.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    readTime: "6 min read",
    likes: 89,
    published: "January 16, 2026",
    gallery: [
      {
        id: "ar-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Ayurvedic Rituals - 1",
        category: "wellness",
        title: "Ayurvedic Rituals for the Soul",
      },
      {
        id: "ar-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Ayurvedic Rituals - 2",
        category: "wellness",
        title: "Ayurvedic Rituals for the Soul",
      },
      {
        id: "ar-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Ayurvedic Rituals - 3",
        category: "wellness",
        title: "Ayurvedic Rituals for the Soul",
      },
      {
        id: "ar-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Ayurvedic Rituals - 4",
        category: "wellness",
        title: "Ayurvedic Rituals for the Soul",
      },
    ],
  },
  {
    slug: "rhythm-of-the-low-country",
    number: "05",
    category: "culture",
    title: "The Rhythm of the Low Country",
    excerpt: "Understanding the traditional mask dances and the stories they tell.",
    image: "https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?w=800",
    readTime: "7 min read",
    likes: 32,
    published: "January 18, 2026",
    gallery: [
      {
        id: "rl-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "The Rhythm of the Low Country - 1",
        category: "culture",
        title: "The Rhythm of the Low Country",
      },
      {
        id: "rl-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "The Rhythm of the Low Country - 2",
        category: "culture",
        title: "The Rhythm of the Low Country",
      },
      {
        id: "rl-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "The Rhythm of the Low Country - 3",
        category: "culture",
        title: "The Rhythm of the Low Country",
      },
      {
        id: "rl-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "The Rhythm of the Low Country - 4",
        category: "culture",
        title: "The Rhythm of the Low Country",
      },
    ],
  },
  {
    slug: "island-living-colonial-elegance",
    number: "06",
    category: "lifestyle",
    title: "Island Living: Colonial Elegance",
    excerpt: "How tropical modernism is redefining the luxury villa experience.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    readTime: "4 min read",
    likes: 71,
    published: "January 20, 2026",
    gallery: [
      {
        id: "il-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Island Living - 1",
        category: "lifestyle",
        title: "Island Living: Colonial Elegance",
      },
      {
        id: "il-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Island Living - 2",
        category: "lifestyle",
        title: "Island Living: Colonial Elegance",
      },
      {
        id: "il-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Island Living - 3",
        category: "lifestyle",
        title: "Island Living: Colonial Elegance",
      },
      {
        id: "il-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Island Living - 4",
        category: "lifestyle",
        title: "Island Living: Colonial Elegance",
      },
    ],
  },
  {
    slug: "sanctuaries-of-silence",
    number: "07",
    category: "wellness",
    title: "Sanctuaries of Silence",
    excerpt: "A journey into the most secluded meditation retreats hidden deep within the Knuckles Range.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    readTime: "12 min read",
    likes: 112,
    published: "January 22, 2026",
    gallery: [
      {
        id: "ssi-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Sanctuaries of Silence - 1",
        category: "wellness",
        title: "Sanctuaries of Silence",
      },
      {
        id: "ssi-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Sanctuaries of Silence - 2",
        category: "wellness",
        title: "Sanctuaries of Silence",
      },
      {
        id: "ssi-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Sanctuaries of Silence - 3",
        category: "wellness",
        title: "Sanctuaries of Silence",
      },
      {
        id: "ssi-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Sanctuaries of Silence - 4",
        category: "wellness",
        title: "Sanctuaries of Silence",
      },
    ],
  },
  {
    slug: "art-of-ceylon-tea-service",
    number: "08",
    category: "lifestyle",
    title: "The Art of Ceylon Tea Service",
    excerpt: "From high-altitude estates to the porcelain cup: an exploration of the ritual.",
    image: "https://images.unsplash.com/photo-1610413344155-7681335c0552?w=800",
    readTime: "6 min read",
    likes: 95,
    published: "January 24, 2026",
    gallery: [
      {
        id: "ac-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Ceylon Tea Service - 1",
        category: "lifestyle",
        title: "The Art of Ceylon Tea Service",
      },
      {
        id: "ac-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Ceylon Tea Service - 2",
        category: "lifestyle",
        title: "The Art of Ceylon Tea Service",
      },
      {
        id: "ac-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Ceylon Tea Service - 3",
        category: "lifestyle",
        title: "The Art of Ceylon Tea Service",
      },
      {
        id: "ac-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Ceylon Tea Service - 4",
        category: "lifestyle",
        title: "The Art of Ceylon Tea Service",
      },
    ],
  },
  {
    slug: "galle-fort-living-history",
    number: "09",
    category: "culture",
    title: "Galle Fort: A Living History",
    excerpt: "Navigating the cobblestone streets and architectural layers of South Asia's best-preserved bastion.",
    image: "https://images.unsplash.com/photo-1588598116712-426915264300?w=800",
    readTime: "9 min read",
    likes: 142,
    published: "January 26, 2026",
    gallery: [
      {
        id: "gf-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Galle Fort - 1",
        category: "culture",
        title: "Galle Fort: A Living History",
      },
      {
        id: "gf-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Galle Fort - 2",
        category: "culture",
        title: "Galle Fort: A Living History",
      },
      {
        id: "gf-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Galle Fort - 3",
        category: "culture",
        title: "Galle Fort: A Living History",
      },
      {
        id: "gf-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Galle Fort - 4",
        category: "culture",
        title: "Galle Fort: A Living History",
      },
    ],
  },
  {
    slug: "lost-kingdom-of-polonnaruwa",
    number: "10",
    category: "heritage",
    title: "The Lost Kingdom of Polonnaruwa",
    excerpt: "A contemplative look at the moonstones and stupas of Polonnaruwa through the eyes of a historian.",
    image: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=800",
    readTime: "6 min read",
    likes: 1248,
    published: "January 19, 2026",
    gallery: [
      {
        id: "lk-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Polonnaruwa - 1",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Polonnaruwa - 2",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Polonnaruwa - 3",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Polonnaruwa - 4",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
    ],
  },

    {
    slug: "lost-kingdom-of-polonnaruwa",
    number: "10",
    category: "adventure",
    title: "The Lost Kingdom of Polonnaruwa",
    excerpt: "A contemplative look at the moonstones and stupas of Polonnaruwa through the eyes of a historian.",
    image: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=800",
    readTime: "6 min read",
    likes: 1248,
    published: "January 19, 2026",
    gallery: [
      {
        id: "lk-1",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Polonnaruwa - 1",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-2",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Polonnaruwa - 2",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-3",
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600",
        alt: "Polonnaruwa - 3",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
      {
        id: "lk-4",
        src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?w=1600",
        alt: "Polonnaruwa - 4",
        category: "heritage",
        title: "The Lost Kingdom of Polonnaruwa",
      },
    ],
  },
];

export const featuredPost = blogPosts.find((post) => post.slug === "lost-kingdom-of-polonnaruwa") ?? blogPosts[0];
