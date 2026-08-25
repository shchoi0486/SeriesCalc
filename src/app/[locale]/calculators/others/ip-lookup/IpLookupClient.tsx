'use client';

import React, { useState, useEffect } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, Wifi, Server, RefreshCw, Loader2, Copy, Check } from 'lucide-react';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
  postal: string;
}

const IPLookup: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.ipLookup;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchIPInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://ipinfo.io/json?token=demo');
      if (!response.ok) {
        throw new Error(t.errors.fetchFailed);
      }
      const data: IPInfo = await response.json();
      setIpInfo(data);
    } catch (err) {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error(t.errors.ipFetchFailed);
        const data = await response.json();
        setIpInfo({
          ip: data.ip,
          city: '-',
          region: '-',
          country: '-',
          loc: '-',
          org: '-',
          timezone: '-',
          postal: '-',
        });
      } catch (fallbackErr) {
        setError(t.errors.fetchFailed);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPInfo();
  }, []);

  const handleCopyIP = async () => {
    if (ipInfo?.ip) {
      await navigator.clipboard.writeText(ipInfo.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="text-center p-6">
        <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">{t.inputs.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.inputs.subtitle}
        </p>

        {loading ? (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t.inputs.loading}</span>
          </div>
        ) : (
          <Button onClick={fetchIPInfo} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> {t.inputs.refresh}
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-semibold text-sm mb-2">{t.inputs.notes}</h4>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>{t.inputs.note1}</li>
          <li>{t.inputs.note2}</li>
          <li>{t.inputs.note3}</li>
          <li>{t.inputs.note4}</li>
        </ul>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {!ipInfo && !loading && !error ? (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      ) : ipInfo ? (
        <>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t.results.publicIp}</div>
            <div className="text-3xl font-bold font-mono flex items-center justify-center space-x-2">
              <span>{ipInfo.ip}</span>
              <Button variant="ghost" size="icon" onClick={handleCopyIP} className="shrink-0">
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span>{t.results.city}</span>
              </div>
              <div className="font-medium">{ipInfo.city}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span>{t.results.region}</span>
              </div>
              <div className="font-medium">{ipInfo.region}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Globe className="w-4 h-4" />
                <span>{t.results.country}</span>
              </div>
              <div className="font-medium">{ipInfo.country}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Server className="w-4 h-4" />
                <span>{t.results.isp}</span>
              </div>
              <div className="font-medium text-sm">{ipInfo.org}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg col-span-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Wifi className="w-4 h-4" />
                <span>{t.results.coordinates}</span>
              </div>
              <div className="font-medium font-mono">{ipInfo.loc}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Globe className="w-4 h-4" />
                <span>{t.results.timezone}</span>
              </div>
              <div className="font-medium text-sm">{ipInfo.timezone}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span>{t.results.postal}</span>
              </div>
              <div className="font-medium">{ipInfo.postal}</div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      )}
    </div>
  );

    const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{t.info.title}</strong> {t.info.p1}
        </p>
        <p>{t.info.p2}</p>
        <p>{t.info.p3}</p>
        <p className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          {t.info.tip}
        </p>
        <TermGlossary
          items={[
            { term: t.glossary.publicIp.term, desc: t.glossary.publicIp.desc },
            { term: t.glossary.isp.term, desc: t.glossary.isp.desc },
            { term: t.glossary.vpn.term, desc: t.glossary.vpn.desc },
            { term: t.glossary.geoIp.term, desc: t.glossary.geoIp.desc },
          ]}
        />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.lookupMethod}</h4>
          <p>{t.formula.lookupDesc}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.primary}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-sm">GET https://ipinfo.io/json?token=demo</p>
          </div>
          <p className="text-sm text-muted-foreground">{t.formula.primaryDesc}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.fallback}</h4>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">GET https://api.ipify.org?format=json</p>
          </div>
          <p>{t.formula.fallbackDesc}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.vpn}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.vpnTip1}</li>
            <li>{t.tips.vpnTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.privacy}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.privacyTip1}</li>
            <li>{t.tips.privacyTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.remoteAccess}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.remoteTip1}</li>
            <li>{t.tips.remoteTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.troubleshooting}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.troubleTip1}</li>
            <li>{t.tips.troubleTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.regionCheck}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.regionTip1}</li>
            <li>{t.tips.regionTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.security}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.securityTip1}</li>
            <li>{t.tips.securityTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('IP 주소를 입력하거나 자동 감지 기능을 사용해 현재 공인 IP를 확인하세요.', 'Enter an IP address or use auto-detect to check your current public IP.')}</li>
          <li>{L('조회 버튼을 클릭하세요.', 'Click the lookup button.')}</li>
          <li>{L('위치, ISP, 조직 등의 지리적·네트워크 정보를 확인하세요.', 'View the geolocation, ISP, and organization information.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">8.8.8.8</h4>
          <p>{L('Google DNS로 알려진 공개 DNS 서버입니다. 위치는 미국(US)으로 표시됩니다.', 'A well-known public DNS server operated by Google. It is located in the United States (US).')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1.1.1.1</h4>
          <p>{L('Cloudflare의 공개 DNS 서버입니다. 위치는 호주(Australia)로 표시됩니다.', 'Cloudflare&apos;s public DNS server. It is located in Australia.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('자동 감지', 'Auto-Detect')}</h4>
          <p>{L('조회를 클릭하면 현재 네트워크의 공인 IP와 함께 대략적인 위치와 ISP 정보가 표시됩니다.', 'Click lookup to see your current network&apos;s public IP along with its approximate location and ISP information.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('IP 조회는 어떤 정보를 제공하나요?', 'What information does an IP lookup provide?'),
            a: L('공인 IP 주소, 대략적인 도시·지역·국가 위치, 좌표, 시간대, 우편번호, ISP(인터넷 서비스 제공자) 및 조직 정보를 제공합니다.', 'It provides the public IP address, approximate city/region/country location, coordinates, timezone, postal code, and ISP (Internet Service Provider) and organization information.'),
          },
          {
            q: L('IPv4와 IPv6의 차이는 무엇인가요?', 'What is the difference between IPv4 and IPv6?'),
            a: L('IPv4는 32비트 주소로 예: 192.168.1.1이며, IPv6는 128비트 주소로 예: 2001:0db8:85a3::8a2e:0370:7334입니다. IPv6는 더 많은 주소를 제공합니다.', 'IPv4 is a 32-bit address such as 192.168.1.1, while IPv6 is a 128-bit address such as 2001:0db8:85a3::8a2e:0370:7334. IPv6 offers a vastly larger address space.'),
          },
          {
            q: L('지리적 위치는 얼마나 정확한가요?', 'How accurate is the geolocation?'),
            a: L('IP 기반 위치는 대개 도시 수준의 근사치이며 국가 수준에서는 정확하지만 정확한 주소나 건물 단위는 아닙니다. ISP 데이터에 따라 달라질 수 있습니다.', 'IP-based location is usually an approximation at the city level and accurate at the country level, but not at the street or building level. Accuracy varies by ISP data.'),
          },
          {
            q: L('자신의 IP를 조회해도 안전한가요?', 'Is it safe to look up my own IP?'),
            a: L('네. 조회는 공개 데이터베이스를 사용하며 저장하지 않으므로 안전합니다. 다만 IP는 대략적인 위치를 드러내므로 공유할 때 주의해야 합니다.', 'Yes. Lookups use public databases and are not stored, so it is safe. Still, since an IP reveals approximate location, be careful about sharing it.'),
          },
          {
            q: L('VPN이나 프록시를 감지할 수 있나요?', 'Can it detect VPNs or proxies?'),
            a: L('IP를 통해 VPN 또는 프록시를 사용 중인지 확인할 수 있습니다. VPN을 사용하면 위치와 ISP가 VPN 제공업체로 표시되는 경우가 많습니다.', 'It is possible to tell whether a VPN or proxy is in use from the IP. When using a VPN, the location and ISP often show the VPN provider instead.'),
          },
        ].map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default IPLookup;
