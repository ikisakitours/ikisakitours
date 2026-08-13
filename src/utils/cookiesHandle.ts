// src/utils/cookiesHandle.ts
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

export type CookiePreferences = {
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

export const saveCookiePreferences = (prefs: CookiePreferences, status: "accepted" | "declined") => {
  if (typeof document === "undefined") return;

  document.cookie = `mapmate_cookie_preferences=${JSON.stringify(prefs)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  document.cookie = `mapmate_cookie_consent=${status}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;

  // ---------------------------------------------------------
  // 🚀 FUTURE DB LOGIC: Save to Database
  // අනාගතයේදී DB එකක් ආවාම මේ ටික Uncomment කරන්න.
  // මෙහිදී යූසර් ලොග් වෙලා නම් (Auth Token/Session තිබේ නම්),
  // API එකට request එකක් යවා DB එක අලුත් කරයි.
  // ---------------------------------------------------------
  /*
  fetch('/api/user/cookie-preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${userToken}` // අවශ්‍ය නම් පමණක්
    },
    body: JSON.stringify({
      preferences: prefs,
      consentStatus: status
    })
  }).catch(err => console.error("Failed to save cookie preferences to DB:", err));
  */
};

export const declineAllCookies = () => {
  if (typeof document === "undefined") return;

  const minPrefs: CookiePreferences = { performance: false, functional: false, targeting: false };

  document.cookie = `mapmate_cookie_preferences=${JSON.stringify(minPrefs)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  document.cookie = `mapmate_cookie_consent=declined; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;

  // ---------------------------------------------------------
  // 🚀 FUTURE DB LOGIC: Save 'Declined' to Database
  // ---------------------------------------------------------
  /*
  fetch('/api/user/cookie-preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      preferences: minPrefs,
      consentStatus: 'declined'
    })
  }).catch(err => console.error("Failed to update decline status to DB:", err));
  */
};

export const getCookieConsentStatus = () => {
  if (typeof document === "undefined") return null;
  const consent = document.cookie.split("; ").find((row) => row.startsWith("mapmate_cookie_consent="));
  return consent ? consent.split("=")[1] : null;
};

// ==========================================
// 4. 🚀 FUTURE DB LOGIC: Sync from Database on Login
// අනාගතයේදී යූසර් කෙනෙක් ලොග් වුණ ගමන් (Login Success වුණාම),
// මේ function එක call කරන්න.
// ==========================================
/*
export const syncCookiesFromDB = async () => {
  if (typeof document === "undefined") return;

  try {
    const response = await fetch('/api/user/cookie-preferences');
    
    // DB එකේ Data තිබේ නම් (පරණ යූසර් කෙනෙක් නම්)
    if (response.ok) {
      const data = await response.json();
      
      if (data && data.consentStatus) {
        // DB එකේ තියෙන data අරන් බ්‍රව්සර් එකේ Cookies අලුත් කරනවා.
        // එතකොට ආයෙත් Banner එක පෙන්වන්නේ නෑ.
        document.cookie = `mapmate_cookie_preferences=${JSON.stringify(data.preferences)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
        document.cookie = `mapmate_cookie_consent=${data.consentStatus}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
        
        // UI එක Update වෙන්න Event එක යවනවා
        window.dispatchEvent(new Event("cookieConsentUpdated"));
      }
    } 
    // DB එකේ Data නැත්නම් (response.ok වුණත් data null නම් / 404 නම්),
    // අලුත් යූසර් කෙනෙක් නිසා මුකුත් කරන්නේ නෑ. 
    // එතකොට සාමාන්‍ය විදිහට Cookie Banner එක පෙන්වනවා.

  } catch (err) {
    console.error("Failed to sync cookies from DB:", err);
  }
};
*/
