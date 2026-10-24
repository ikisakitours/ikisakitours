export default {
  Metadata: {
    Gateway: {
      title: "サインインまたは登録",
      description:
        "IkiSakiのアカウントに登録するか、当社の特別な旅行コミュニティに参加することで、スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアー、世界遺産に関する情報などを利用できるようになります.",
    },
    Signup: {
      title: "アカウント作成",
      description:
        "IkiSakiの会員アカウントを作成して、スリランカへのプライベート旅行を計画したり、限定ツアーを予約したり、自分だけの旅程を作成したりしましょう。スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアー、スリランカ世界遺産に関する情報などを利用できるようになります.",
    },
    Login: {
      title: "ログイン",
      description: "ikisakiアカウントにログインしてください。ログインすると、スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアーの利用、スリランカ世界遺産に関する情報の確認が可能になります.",
    },
    Recovery: { title: "アカウントの復元", description: "IkiSakiアカウント復旧用メールをリクエストする." },
    Reset: {
      title: "パスワードのリセット",
      description: "メール認証後、IkiSakiアカウントの新しいパスワードを設定してください.",
    },
  },
  Intros: {
    Gateway: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "スリランカの茶園の息をのむような景色",
      eyebrow: "IkiSakiへようこそ",
      title: "ここから始まる,",
      accent: "あなただけの旅",
      body: "ログインまたは新規登録して、ご予約の管理や限定ツアーのご案内、お客様だけの特別なスリランカ旅行の計画をお楽しみください.",
    },
    Signup: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "スリランカの茶園の息をのむような景色",
      eyebrow: "メンバー特典",
      title: "上質な旅への",
      accent: "第一歩",
      body: "旅を愛する方々のための特別なコミュニティに参加して、スリランカ全土で楽しむ、あなただけの上質で贅沢な旅をご体験ください.",
    },
    Login: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "夕暮れ時のスリランカの豪華な海岸沿いのリゾート",
      eyebrow: "プレミアムトラベル",
      title: "楽園の魅力を",
      accent: "巡る旅",
      body: "楽園の中心へ――インド洋の真珠、スリランカで、あなただけの特別な旅を.",
    },
    Recovery: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "ミリッサの穏やかで平和なビーチの波",
      eyebrow: "セキュリティ・ファースト",
      title: "アクセスを安全に",
      accent: "保護",
      body: "ご安心ください。すぐにアカウントの復旧をお手伝いいたします.",
    },
    Reset: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "エラの山々に昇る美しい日の出",
      eyebrow: "新たな始まり",
      title: "アカウントを",
      accent: "安全に保護",
      body: "ご旅行の旅程やプロフィールを安全に保つため、パスワードを更新してください.",
    },
  },
  FormHeaders: {
    Gateway: { eyebrow: "オプションを選択", title: "サインイン" },
    Signup: { eyebrow: "ゲスト登録", title: "アカウント作成" },
    Login: { eyebrow: "セキュアゲートウェイ", title: "お帰りなさい" },
    Recovery: { eyebrow: "アカウントの復元", title: "パスワードをお忘れの方" },
    Reset: { eyebrow: "最終ステップ", title: "パスワードのリセット" },
  },
  Social: {
    continueGoogle: "Googleで続ける",
    continueApple: "Appleで続ける",
    continueEmail: "メールアドレスで続ける",
    orContinueWith: "または、以下で続行",
  },
  Links: {
    alreadyHaveAccount: "メンバーの方ですか？",
    signInHere: "ログイン",
    firstTime: "はじめての方ですか？",
    createAccount: "新規登録はこちら",
    forgotPassword: "パスワード忘れ？",
    rememberIt: "思い出しました！",
    backToProfile: "プロフィールへ",
    backToLogin: "ログインへ戻る",
    backToSignIn: "ログインへ戻る",
  },
} as const;
