export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;

  image: string;
  category: string;
  tags: string[];

  author: {
    name: string;
    role: string;
    avatar: string;
  };

  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views?: number;
  likes?: number;

  comments?: {
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    date: string;
    replies?: {
      id: number;
      user: {
        name: string;
        avatar: string;
      };
      text: string;
      date: string;
    }[];
  }[];
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "nextjs-15-new-features",
    title: "Exploring Next.js 15: What’s New and Why It Matters",
    subtitle: "A developer’s guide to the latest release of Next.js",
    excerpt:
      "Next.js 15 has arrived with exciting updates for developers, including improved performance, image handling, and new routing capabilities.",
    content: `
      Next.js 15 is here, and it brings several game-changing features for frontend developers. 
      From the new server actions to enhanced caching and streaming, the framework is becoming 
      even more powerful for building scalable apps. In this article, we’ll break down the top 
      updates you need to know.

      ### Key Features
      - **Improved Image Optimization**: Faster, more reliable image loading with better caching.
      - **Server Actions**: A simpler way to handle server-side logic without needing extra API routes.
      - **Partial Prerendering**: Speeds up page delivery by combining static and dynamic rendering.

      ### Why It Matters
      These features reduce complexity and make apps faster, which is crucial for both developers 
      and end-users. If you’re working with Next.js, upgrading to version 15 is a no-brainer.
    `,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    tags: ["Next.js", "Frontend", "JavaScript", "React"],
    author: {
      name: "Md Shad Khan",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    publishedAt: "2025-09-10",
    updatedAt: "2025-09-12",
    readTime: 6,
    views: 1200,
    likes: 350,
  },
  {
    id: 2,
    slug: "ai-tools-for-creators",
    title: "Top 5 AI Tools Every Content Creator Should Use in 2025",
    subtitle: "Save time, boost creativity, and grow faster",
    excerpt:
      "AI is transforming the way creators work. From writing assistants to video editors, here are the must-have AI tools in 2025.",
    content: `
      Being a content creator in 2025 is both exciting and overwhelming. The good news is that AI 
      tools are here to make your life easier. Whether you create videos, blogs, or social media 
      posts, these tools can save you hours of work.

      ### 1. ChatGPT-5
      Great for brainstorming, drafting, and polishing content.

      ### 2. Runway Gen-3
      AI-powered video creation with realistic effects and animations.

      ### 3. Jasper
      Specialized for marketing copy and SEO content.

      ### 4. Descript
      Perfect for editing podcasts and videos with text-based editing.

      ### 5. MidJourney v6
      AI-generated visuals that look stunning for any creative project.

      ### Final Thoughts
      The best creators in 2025 aren’t those who work the hardest, but those who work the smartest. 
      AI is your creative partner — embrace it.
    `,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    category: "AI & Productivity",
    tags: ["AI Tools", "Content Creation", "Productivity"],
    author: {
      name: "Sarah Lee",
      role: "Tech Writer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    publishedAt: "2025-09-12",
    readTime: 5,
    views: 980,
    likes: 410,
  },
  {
    id: 3,
    slug: "travel-tips-2025",
    title: "10 Smart Travel Tips for 2025 You Need to Know",
    subtitle: "Make your journeys cheaper, safer, and more fun",
    excerpt:
      "Travel in 2025 comes with new challenges and opportunities. Here are the best tips to help you travel smarter this year.",
    content: `
      Travel has changed a lot in recent years. With new digital tools, eco-friendly options, and 
      flexible work lifestyles, 2025 is shaping up to be the best year for travelers. Here are some 
      tips to keep in mind:

      ### 1. Use AI Itinerary Planners
      Apps like Instant Travel Buddy (ITB) can help you design perfect trips.

      ### 2. Digital Nomad Visas
      More countries now offer visas for remote workers — check if your destination qualifies.

      ### 3. Travel Light
      Minimalist packing saves money and avoids stress.

      ### 4. Cashless Payments
      Always keep multiple payment options like international cards and mobile wallets.

      ### 5. Local Experiences
      Choose local homestays and guides to get authentic cultural exposure.

      ### Conclusion
      With the right mindset and tools, traveling in 2025 can be smoother and more memorable 
      than ever.
    `,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "Travel",
    tags: ["Travel Tips", "2025 Trends", "Lifestyle"],
    author: {
      name: "James Carter",
      role: "Travel Blogger",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    publishedAt: "2025-09-14",
    readTime: 7,
    views: 1500,
    likes: 500,
  },
];
