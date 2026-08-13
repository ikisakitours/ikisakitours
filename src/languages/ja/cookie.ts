// messages/ja/cookie.ts
export default {
  // CookieConsent component strings
  titlePrefix: "クッキーの",
  titleHighlight: "設定",
  description:
    "MapMateでは、より快適な高級感のあるブラウジング体験を提供するためにクッキーを使用しています。閲覧を続けることにより、クッキーの設定に同意したことになります。",
  wantToCustomize: "カスタマイズしますか？",
  managePreferences: "設定を管理",
  cookiePolicy: "クッキーポリシー",
  acceptAll: "すべて同意",

  // CookiePreferenceModal component strings
  modalTitlePrefix: "プライバシー",
  modalTitleHighlight: "設定センター",
  modalDescription:
    "ウェブサイトを訪問すると、ブラウザに情報が保存または取得されることがあります（主にクッキーの形式）。当社はお客様のプライバシー権を尊重するため、一部のクッキーの許可しないことを選択できます。",
  manageConsentTitle: "同意設定の管理",
  rejectAll: "すべて拒否",
  confirmChoices: "選択を確認",

  // CookiePageActions component strings
  pageActionTitle: "クッキーを",
  pageActionTitleHighlight: "受け入れますか",
  manageCookiesBtn: "クッキーを管理",
  allAccepted: "すべて同意済み",
  allRejected: "すべて拒否済み",

  // Categories for Preference Modal
  categories: {
    necessary: {
      title: "不可欠なクッキー",
      badge: "常に有効",
      description:
        "これらのクッキーはウェブサイトが機能するために必須であり、システムのスイッチを切ることができません。通常、お客様が行ったアクションに応じてのみ設定されます。",
    },
    performance: {
      title: "パフォーマンスクッキー",
      description:
        "これらのクッキーにより、訪問者数やトラフィックソースをカウントし、サイトのパフォーマンスを測定および改善することができます。",
    },
    functional: {
      title: "機能性クッキー",
      description:
        "これらのクッキーにより、言語の記憶など、ウェブサイトが高度な機能とパーソナライゼーションを提供できるようになります。",
    },
    targeting: {
      title: "ターゲティング / マーケティングクッキー",
      description:
        "これらのクッキーは、広告パートナーによってサイト経由で設定される場合があり、お客様の興味関心のプロファイルを構築するために使用されます。",
    },
  },
} as const;
