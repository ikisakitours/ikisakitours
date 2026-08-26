export default {
  Metadata: {
    title: "プロフィール設定",
    description: "IkiSakiのプロフィールの詳細、アカウントのセキュリティ、プライバシー設定を管理します。",
  },
  Dashboard: {
    titleBase: "アカウント",
    titleAccent: "設定",
    tabProfile: "プロフィール管理",
    tabSecurity: "セキュリティとプライバシー",
    shortProfile: "プロフィール",
    shortSecurity: "セキュリティ",
    tabReferral: "友達を招待",
    shortReferral: "紹介",
    menuBtn: "メニュー",
    accountMenuTitle: "アカウントメニュー",
  },
  Badge: {
    verified: "認証済み",
    vipMember: "VIP メンバー",
  },
  Milestone: {
    title: "アドベンチャー・マイルストーン",
    quote:
      "スリランカの魂は、私たちが歩む道に宿っています。あなたの旅が始まったばかりであっても、その足跡がすでに形作られていても、インド洋の真珠は常にさらなる驚異を見せてくれます。",
  },
  DetailsPanel: {
    title: "個人情報",
    toursText: "ツアー",
    profilePicTitle: "プロフィール写真",
    profilePicDesc: "PNG、JPG、またはGIF。最大5MB。",
    savePhotoBtn: "写真を保存",
  },
  SecurityPanel: {
    title: "セキュリティアクセス",
    forgotPassword: "パスワードをお忘れですか？",
  },
  ReferralPanel: {
    title: "友達を招待して特典を獲得",
    subtitle: "あなた専用のリンクをシェアして、プレミアムな旅行特典をアンロックしましょう。",
    offerTitle: "10%割引をプレゼント、",
    offerAmount: "$50 獲得",
    offerDescription:
      "あなたのリンクから友人が初めての旅行を予約すると、友人は10%割引になり、あなたは次回の旅行に使える$50分のトラベルクレジットを獲得できます。",
    yourLink: "あなた専用の招待リンク",
    copy: "コピー",
    copied: "コピーしました！",
    stats: {
      invites: "送信した招待",
      joined: "予約した友人",
      earned: "獲得総額",
    },
  },
  Modals: {
    Crop: {
      title: "プロフィール写真の調整",
      zoom: "ズーム：",
      dragHelp: "ドラッグして位置を調整",
      btnProcessing: "処理中...",
      btnCropSave: "切り抜いて保存",
    },
    Source: {
      title: "プロフィール写真を更新",
      errorTitle: "アクセスエラー",
      btnTakePhoto: "写真を撮る",
      btnTakePhotoSub: "デバイスのカメラを使用",
      btnGallery: "ギャラリー",
      btnGallerySub: "ファイルを参照",
      errorNotSupported: "お使いのブラウザはカメラをサポートしていません",
      errorNoCamera: "このデバイスでカメラが検出されませんでした",
      errorDenied: "カメラへのアクセスが拒否されました。ブラウザの設定でカメラへのアクセスを許可してください。",
      errorGeneral: "カメラにアクセスできません。デバイスの設定を確認してください。",
      errorUnexpected: "カメラへのアクセス中に予期せぬエラーが発生しました。",
    },
  },
} as const;
