'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'seriescalc_consent';

const TEXT = {
  ko: {
    body: '본 사이트는 이용 분석과 광고 제공을 위해 Google Analytics 및 Google AdSense 쿠키를 사용합니다. "수락"을 누르면 쿠키 사용에 동의하는 것으로 간주합니다.',
    accept: '수락',
    decline: '거부',
  },
  en: {
    body: 'This site uses Google Analytics and Google AdSense cookies for usage analysis and advertising. Clicking "Accept" means you consent to the use of cookies.',
    accept: 'Accept',
    decline: 'Decline',
  },
} as const;

function grantAll() {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }
}

function denyAll() {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
}

export default function CookieConsent({ locale = 'en' }: { locale?: string }) {
  const [visible, setVisible] = useState(false);
  const t = locale === 'ko' ? TEXT.ko : TEXT.en;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'granted') {
      grantAll();
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'granted');
    grantAll();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'denied');
    denyAll();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 sm:right-4">
      <p className="mb-3 text-sm text-zinc-800 dark:text-zinc-100">{t.body}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleDecline}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {t.decline}
        </button>
        <button
          onClick={handleAccept}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
