import Script from 'next/script';

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-7279511347629270';

type AdUnitProps = {
  slot?: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  minHeight?: number;
  label?: string;
};

export default function AdUnit({
  slot,
  className = '',
  format = 'auto',
  minHeight = 100,
  label,
}: AdUnitProps) {
  if (!slot) return null;

  return (
    <div className={className} style={{ minHeight }}>
      {label ? (
        <p className="mb-1 text-center text-xs text-muted-foreground">{label}</p>
      ) : null}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script
        id={`adsense-push-${slot}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }}
      />
    </div>
  );
}
