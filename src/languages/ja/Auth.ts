export default {
  Metadata: {
    Gateway: {
      title: "サインインまたは登録",
      description:
        "IkiSakiのアカウントに登録するか、当社の特別な旅行コミュニティに参加することで、スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアー、世界遺産に関する情報などを利用できるようになります。",
    },
    Signup: {
      title: "アカウント作成",
      description:
        "IkiSakiの会員アカウントを作成して、スリランカへのプライベート旅行を計画したり、限定ツアーを予約したり、自分だけの旅程を作成したりしましょう。スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアー、スリランカ世界遺産に関する情報などを利用できるようになります。",
    },
    Login: {
      title: "ログイン",
      description:
        "ikisakiアカウントにログインしてください。ログインすると、スリランカでのチャーターサービスやスリランカタクシーサービス、スリランカツアーの利用、スリランカ世界遺産に関する情報の確認が可能になります。",
    },
    Recovery: { title: "アカウントの復元", description: "IkiSakiアカウント復旧用メールをリクエストする。" },
    Reset: {
      title: "パスワードのリセット",
      description: "メール認証後、IkiSakiアカウントの新しいパスワードを設定してください。",
    },
  },
  Intros: {
    Gateway: {
      image: "/ikisaki-images/Auth/sign-up/heritance-tea-factory-nuwara-eliya.webp",
      imageAlt:
        "The historic Heritance Tea Factory hotel perched among rolling green tea plantations in Kandapola, Nuwara Eliya, Sri Lanka",
      eyebrow: "IkiSakiへようこそ",
      title: "ここから始まる、",
      accent: "あなただけの旅",
      body: "ログインまたは新規登録して、ご予約の管理や限定ツアーのご案内、お客様だけの特別なスリランカ旅行の計画をお楽しみください。",
    },
    Signup: {
      image: "/ikisaki-images/Auth/sign-up/sri-lanka-hill-country-tea-plantation.webp",
      imageAlt: "A breathtaking panoramic view of lush green tea plantation hills under a blue sky in Sri Lanka",
      eyebrow: "メンバー特典",
      title: "上質な旅への",
      accent: "第一歩",
      body: "旅を愛する方々のための特別なコミュニティに参加して、スリランカ全土で楽しむ、あなただけの上質で贅沢な旅をご体験ください。",
    },
    Login: {
      image: "/ikisaki-images/Auth/login/luxury-resort-pool-sunset-sri-lanka.webp",
      imageAlt: "Relaxing infinity pool reflecting a vibrant sunset sky at a luxury tropical resort in Sri Lanka",
      eyebrow: "プレミアムトラベル",
      title: "楽園の魅力を",
      accent: "巡る旅",
      body: "楽園の中心へ――インド洋の真珠、スリランカで、あなただけの特別な旅を。",
    },
    Recovery: {
      image: "/ikisaki-images/Auth/confirm-email/sigiriya-ancient-ruins-aerial-view.webp",
      imageAlt: "Aerial drone view of the ancient archaeological royal palace ruins atop Sigiriya Rock in Sri Lanka",
      eyebrow: "セキュリティ・ファースト",
      title: "アクセスを安全に",
      accent: "保護",
      body: "ご安心ください。すぐにアカウントの復旧をお手伝いいたします。",
    },
    Reset: {
      image: "/ikisaki-images/Auth/password-change/sri-lanka-mountain-sunrise-mist.webp",
      imageAlt: "Breathtaking view of misty mountain ranges and hills during sunrise in Sri Lanka",
      eyebrow: "新たな始まり",
      title: "アカウントを",
      accent: "安全に保護",
      body: "ご旅行の旅程やプロフィールを安全に保つため、パスワードを更新してください。",
    },
  },
  FormHeaders: {
    Gateway: { eyebrow: "オプションを選択", title: "サインイン" },
    Signup: { eyebrow: "ゲスト登録", title: "アカウント作成" },
    Login: { eyebrow: "セキュアゲートウェイ", title: "お帰りなさい" },
    Recovery: { eyebrow: "アカウントの復元", title: "パスワードをお忘れの方" },
    Reset: { eyebrow: "最終ステップ", title: "パスワードのリセット" },
  },
  //new
  Social: {
    continueGoogle: "Googleで続ける",
    continueFacebook: "Facebookで続ける",
    continueInstagram: "Instagramで続ける",
    continueTiktok: "TikTokで続ける",
    continueX: "Xで続ける",
    continueApple: "Appleで続ける",
    continueLinkedin: "LinkedInで続ける",
    continueSnapchat: "Snapchatで続ける",
    continueEmail: "メールアドレスで続ける",
    orContinueWith: "または",
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
