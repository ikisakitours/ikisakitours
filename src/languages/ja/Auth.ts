export default {
  Metadata: {
    Gateway: {
      title: "サインインまたは登録",
      description:
        "MapMateアカウントにアクセスするか、限定の旅行コミュニティに参加して、オーダーメイドのスリランカの旅程を手に入れましょう。",
    },
    Signup: {
      title: "アカウント作成",
      description:
        "プライベート旅行の計画、限定ツアーの予約、パーソナライズされたスリランカの旅程を作成するためのMapMateメンバーアカウントを作成します。",
    },
    Login: {
      title: "セキュアゲートウェイ",
      description: "MapMateのセキュアな旅行ゲートウェイにサインインします。",
    },
    Recovery: { title: "アカウントの復元", description: "MapMateのアカウント復元メールをリクエストします。" },
    Reset: {
      title: "パスワードのリセット",
      description: "メール認証後に新しいMapMateアカウントのパスワードを設定します。",
    },
  },
  Intros: {
    Gateway: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "スリランカの茶園の息をのむような景色",
      eyebrow: "MapMateへようこそ",
      title: "あなたの旅は",
      accent: "ここから始まります",
      body: "サインインまたはアカウントを作成して、予約を管理し、限定ツアーを発見し、最高のスリランカの冒険を計画しましょう。",
    },
    Signup: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "スリランカの茶園の息をのむような景色",
      eyebrow: "メンバー特典",
      title: "あなたの",
      accent: "エリート体験を始める",
      body: "旅行者の限定サークルに参加して、スリランカ全土のオーダーメイドの贅沢な世界を解き放ちましょう。",
    },
    Login: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "夕暮れ時のスリランカの豪華な海岸沿いのリゾート",
      eyebrow: "プレミアムトラベル",
      title: "楽園の中心への",
      accent: "旅",
      body: "インドの涙のしずくでの厳選された体験。今すぐゲートウェイを確保しましょう。",
    },
    Recovery: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "ミリッサの穏やかで平和なビーチの波",
      eyebrow: "セキュリティ第一",
      title: "あなたの島のアクセスを",
      accent: "保護する",
      body: "ご心配なく、誰にでも起こることです。すぐに旅行に戻れるようサポートいたします。",
    },
    Reset: {
      image: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
      imageAlt: "エラの山々に昇る美しい日の出",
      eyebrow: "新たな始まり",
      title: "あなたの",
      accent: "パラダイスボルトを保護する",
      body: "旅行の旅程とプロフィールを安全に保つためにパスワードを更新してください。",
    },
  },
  FormHeaders: {
    Gateway: { eyebrow: "オプションを選択", title: "サインインまたは登録" },
    Signup: { eyebrow: "ゲスト登録", title: "アカウント作成" },
    Login: { eyebrow: "セキュアゲートウェイ", title: "お帰りなさい" },
    Recovery: { eyebrow: "アカウントの復元", title: "パスワードをお忘れですか？" },
    Reset: { eyebrow: "最終ステップ", title: "パスワードのリセット" },
  },
  Social: {
    continueGoogle: "Googleで続ける",
    continueApple: "Appleで続ける",
    continueEmail: "メールアドレスで続ける",
    orContinueWith: "または以下で続ける",
  },
  Links: {
    alreadyHaveAccount: "メンバーの方ですか？",
    signInHere: "ゲートウェイへ",
    firstTime: "初めてですか？",
    createAccount: "クラブに参加",
    forgotPassword: "鍵をお忘れですか？",
    rememberIt: "思い出しました！",
    backToProfile: "プロフィールへ",
    backToLogin: "ログインへ戻る",
    backToSignIn: "ゲートウェイへ戻る",
  },
} as const;
