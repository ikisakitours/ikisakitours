export default {
  Header: {
    titleDefault: "IKISAKI Tours スリランカ",
    titleEmail: "メールを送信",
    onlineStatus: "オンライン",
    logoAlt: "IkiSaki ロゴ",
    titleBot: "AIアシスタント",
  },

  BotChat: {
    guideBadge: "スリランカ旅行ガイド",
    initialGreeting: "こんにちは！私はIkiSaki AI旅行ガイドです。今日はどのようなスリランカの旅をお手伝いしましょうか？",
    simulatedReply: "それは素晴らしい体験ですね！最適なルートと空き状況を確認いたします。",
    inputPlaceholder: "ツアー、ホテル、野生動物について質問する。。。",
    poweredBy: "IkiSaki Tours インテリジェンス提供 • 暗号化され安全",
    typingLabel: "ガイドが入力中。。。",
    HeaderTitle: "AIアシスタント",
    suggestionsButton: "おすすめ",
  },

  Home: {
    greeting: "こんにちは！ 👋",
    description: "サポートが必要ですか？新しい会話を始めていただければ、旅行アシスタントがご案内します。",
    badges: {
      quickReplies: "クイック返信",
      safeSecure: "安全とセキュリティ",
      service: "24時間対応",
      tailoredTours: "オーダーメイドツアー",
    },
    newConversation: "新しい会話を始める",
    replyTime: "通常数分以内に返信いたします",
  },
  Messages: {
    startChatTitle: "新しい会話を始める",
    whatsappTitle: "WhatsAppチャット",
    whatsappSubtitle: "最も早い返信",
    lineTitle: "LINEでチャット",
    lineSubtitle: "LINEアプリで接続",
    emailTitle: "メールを送信する",
    emailSubtitle: "詳細な問い合わせ",
    recentTitle: "最近のチャット",
    customerSupport: "カスタマーサポート",
    recentMessage: "👋 こんにちは！どのようにお手伝いしましょうか？",
    timeNow: "たった今",
    botTitle: "AIアシスタントとチャット",
    botSubtitle: "即座に自動回答を取得",
  },
  MailForm: {
    fullNameLabel: "氏名 *",
    fullNamePlaceholder: "山田 太郎",
    emailLabel: "メールアドレス *",
    emailPlaceholder: "taro@example.com",
    phoneLabel: "電話番号 *",
    messageLabel: "メッセージ *",
    messagePlaceholder: "メッセージを入力してEnterを押してください。。。",
    messageNote: "* 入力に合わせてボックスが自動的に拡大します。",
    submitButton: "チャットを開始",
  },
  Tooltips: {
    sideTooltip: "お待ちしております！",
    bottomHeading: "こんにちは！",
    bottomBadge: "新着メッセージ",
    bottomBody:
      "こんにちは！スリランカ旅行について、お気軽にご相談ください。お客様のご希望に合わせて、特別な旅づくりをお手伝いいたします。",
    actionHighlight: "オーダーメイド体験",
    actionText1: "カスタマイズされた",
    actionText2: "プライベートツアー",
  },
  Widget: {
    documentTitle: "💬 1件の新着メッセージ！",
    whatsappDefaultText: "こんにちは！スリランカへの旅行を計画したいのですが。",
    closeTooltipAria: "ツールチップを閉じる",
    closeChatAria: "チャットを閉じる",
    toggleAria: "チャットを切り替える",
  },

  // Chat Widget Image Slider Configuration
chatWidgetImages: [
  {
    image: "/ikisaki-images/chat-bot/nine-arch-bridge-ella-blue-train-sri-lanka.webp",
    alt: "The iconic blue train crossing the historic Nine Arch Bridge amidst lush green forests in Ella, Sri Lanka"
  },
  {
    image: "/ikisaki-images/chat-bot/sri-lanka-tea-plantation-sunrise-mist.webp",
    alt: "Golden sunrise breaking over the misty green terraced hills of a tea plantation in Sri Lanka"
  },
  {
    image: "/ikisaki-images/chat-bot/oceanfront-dining-terrace-rocky-beach-sri-lanka.webp",
    alt: "Outdoor dining tables and chairs overlooking the blue ocean waves and rocky shoreline in Sri Lanka"
  },
  {
    image: "/ikisaki-images/chat-bot/luxury-boutique-villa-pool-night-sri-lanka.webp",
    alt: "Illuminated swimming pool and traditional architecture of a luxury boutique villa at night in Sri Lanka"
  },
  {
    image: "/ikisaki-images/chat-bot/sri-lanka-coastal-island-suspension-bridge.webp",
    alt: "Pedestrian suspension bridge leading to a scenic temple island on the sandy coast of Sri Lanka"
  }
]
} as const;
