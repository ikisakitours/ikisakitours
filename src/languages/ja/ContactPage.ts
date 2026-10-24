export default {
  Metadata: {
    title: "お問い合わせ - ご連絡ください",
    description:
      "スリランカ旅行に関するお問い合わせ,スリランカのプライベートチャーターサービスやタクシーサービス,空港送迎,オーダーメイドツアーのご相談は,IkiSaki Toursまでお気軽にご連絡ください.お客様のご希望に合わせた快適な旅の計画をサポートいたします.",
  },
  Hero: {
    eyebrow: "会話を始める",
    title: "旅の始まりは,最初のひと言から",
    accent: "最初のひと言から",
    strapline: "何でもご相談ください.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    altText: "スリランカの夕日",
  },
  IntroCard: {
    badge: "会話を始めましょう",
    titleMain: "私たちにご相談ください",
    titleBreak: "",
    description:
      "スリランカ旅行の計画やプライベートチャーター,空港送迎,オーダーメイドツアーについて,どんなことでもお気軽にご相談ください.お客様に最適な旅をご提案いたします.",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
        alt: "地元のトラベルデスク",
        badge: "専門家のアドバイス",
        desc: "個人的な計画、迅速なフォローアップ、実践的な指導",
      },
      {
        image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
        alt: "カスタム旅程計画",
        badge: "カスタマイズされたルート",
        desc: "あなたの興味を共有して、完璧な旅を作りましょう",
      },
      {
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
        alt: "輸送および運転手サービス",
        badge: "シームレスなトランスポート",
        desc: "信頼できるドライバーと快適な車両であなたの旅をサポートします",
      },
      {
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
        alt: "宿泊予約",
        badge: "ブティック ステイ",
        desc: "あなたのスタイルに合わせて厳選したホテルとリゾート",
      },
      {
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
        alt: "野生動物とサファリのツアー",
        badge: "忘れられないサファリ",
        desc: "専門のナチュラリストとスリリングな野生動物との出会い",
      },
    ],
  },
  Sidebar: {
    title: "連絡先情報",
    messagesTitle: "WhatsAppとLineのどちらが好きですか?",
    whatsappButton: "WhatsAppでチャットする",
    lineButton: "LINEでチャット",
    onlineStatus: "オンラインですぐにチャット可能",
    info: [
      {
        label: "電子メール",
        value: "hello@ikisakitours.com",
      },
      {
        label: "電話",
        value: "+94 77 123 4567",
      },
      {
        label: "位置",
        value: "コロンボ、スリランカ",
      },
      {
        label: "労働時間",
        value: "24時間365日利用可能",
      },
    ],
  },
  Form: {
    title: "メッセージを送ってください",
    inquiryOptions: ["ツアーのお問い合わせ・空き状況", "カスタム旅行の計画", "一般サポート", "パートナーシップ"],
    tourOptions: [
      "宿泊ツアー（複数日）",
      "日帰りツアー",
      "オーダーメイドの旅",
      "プライベートチャーターサービス",
      "空港・市内送迎",
      "その他",
    ],
  },
  Features: [
    {
      title: "トラベルスペシャリスト",
      desc: "ルート、時間、ホテル、ゲストの快適さを理解している地元のチームに相談してください.",
    },
    {
      title: "カスタムプランニング",
      desc: "自分のペース、興味、予算、日付を共有します. 私たちはあなたを中心に次のステップを形作ります.",
    },
    {
      title: "明確なフォローアップ",
      desc: "あなたの問い合わせは当社のリードデスクに送信され、適切な担当者が状況に応じて対応できます.",
    },
  ],
} as const;
