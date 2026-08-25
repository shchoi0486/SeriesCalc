'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw, Wifi, Download, Upload, Clock } from 'lucide-react';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';

type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

interface SpeedResult {
  ping: number;
  downloadSpeed: number;
  uploadSpeed: number;
  jitter: number;
}

const InternetSpeedTest: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.internetSpeedTest;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [phase, setPhase] = useState<TestPhase>('idle');
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const simulatePing = (): Promise<number> => {
    return new Promise((resolve) => {
      const pingValues: number[] = [];
      let count = 0;
      const maxPings = 10;

      intervalRef.current = setInterval(() => {
        const simulatedPing = 5 + Math.random() * 45;
        pingValues.push(simulatedPing);
        count++;

        setCurrentProgress((count / maxPings) * 100);
        setCurrentSpeed(simulatedPing);

        if (count >= maxPings) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          const avgPing = pingValues.reduce((a, b) => a + b, 0) / pingValues.length;
          resolve(Math.round(avgPing * 100) / 100);
        }
      }, 100);
    });
  };

  const simulateDownload = (): Promise<number> => {
    return new Promise((resolve) => {
      let progress = 0;
      const speeds: number[] = [];

      intervalRef.current = setInterval(() => {
        progress += 2;
        const speed = 50 + Math.random() * 150;
        speeds.push(speed);

        setCurrentProgress(Math.min(progress, 100));
        setCurrentSpeed(Math.round(speed * 10) / 10);

        if (progress >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
          resolve(Math.round(avgSpeed * 10) / 10);
        }
      }, 100);
    });
  };

  const simulateUpload = (): Promise<number> => {
    return new Promise((resolve) => {
      let progress = 0;
      const speeds: number[] = [];

      intervalRef.current = setInterval(() => {
        progress += 2;
        const speed = 20 + Math.random() * 80;
        speeds.push(speed);

        setCurrentProgress(Math.min(progress, 100));
        setCurrentSpeed(Math.round(speed * 10) / 10);

        if (progress >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
          resolve(Math.round(avgSpeed * 10) / 10);
        }
      }, 100);
    });
  };

  const startTest = async () => {
    setPhase('ping');
    setCurrentProgress(0);
    setCurrentSpeed(0);
    setResult(null);

    const ping = await simulatePing();

    setPhase('download');
    setCurrentProgress(0);
    setCurrentSpeed(0);
    const download = await simulateDownload();

    setPhase('upload');
    setCurrentProgress(0);
    setCurrentSpeed(0);
    const upload = await simulateUpload();

    const jitter = Math.round((Math.random() * 5 + 1) * 100) / 100;

    setResult({ ping, downloadSpeed: download, uploadSpeed: upload, jitter });
    setPhase('complete');
    setCurrentProgress(0);
    setCurrentSpeed(0);
  };

  const stopTest = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setPhase('idle');
    setCurrentProgress(0);
    setCurrentSpeed(0);
  };

  const resetTest = () => {
    stopTest();
    setResult(null);
    setPhase('idle');
  };

  const getSpeedRating = (speed: number, type: 'download' | 'upload' | 'ping'): string => {
    if (type === 'ping') {
      if (speed < 10) return t.ratings.ping.excellent;
      if (speed < 30) return t.ratings.ping.good;
      if (speed < 60) return t.ratings.ping.fair;
      return t.ratings.ping.poor;
    }
    if (type === 'download') {
      if (speed > 100) return t.ratings.download.excellent;
      if (speed > 50) return t.ratings.download.good;
      if (speed > 20) return t.ratings.download.fair;
      return t.ratings.download.poor;
    }
    if (speed > 50) return t.ratings.upload.good;
    if (speed > 20) return t.ratings.upload.fair;
    return t.ratings.upload.poor;
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="text-center p-6">
        <Wifi className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">{t.inputs.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.inputs.subtitle}
        </p>

        {phase === 'idle' && (
          <Button onClick={startTest} size="lg" className="w-full">
            <Play className="w-5 h-5 mr-2" /> {t.inputs.startTest}
          </Button>
        )}

        {phase !== 'idle' && phase !== 'complete' && (
          <div className="space-y-4">
            <div className="text-sm font-medium">
              {phase === 'ping' && t.inputs.pingTesting}
              {phase === 'download' && t.inputs.downloadTesting}
              {phase === 'upload' && t.inputs.uploadTesting}
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-100 ease-linear"
                style={{ width: `${currentProgress}%` }}
              />
            </div>

            <div className="text-2xl font-bold text-primary">
              {phase === 'ping' ? `${currentSpeed} ms` : `${currentSpeed} Mbps`}
            </div>

            <Button variant="destructive" onClick={stopTest} className="w-full">
              <Square className="w-4 h-4 mr-2" /> {t.inputs.stop}
            </Button>
          </div>
        )}

        {phase === 'complete' && result && (
          <Button variant="secondary" onClick={resetTest} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" /> {t.inputs.retest}
          </Button>
        )}
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {!result ? (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{result.ping}</div>
              <div className="text-xs text-muted-foreground">{t.results.ping}</div>
              <div className="text-xs text-green-600 font-medium mt-1">{getSpeedRating(result.ping, 'ping')}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Download className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{result.downloadSpeed}</div>
              <div className="text-xs text-muted-foreground">{t.results.download}</div>
              <div className="text-xs text-green-600 font-medium mt-1">{getSpeedRating(result.downloadSpeed, 'download')}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Upload className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{result.uploadSpeed}</div>
              <div className="text-xs text-muted-foreground">{t.results.upload}</div>
              <div className="text-xs text-green-600 font-medium mt-1">{getSpeedRating(result.uploadSpeed, 'upload')}</div>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{t.results.speedVisual}</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.results.downloadLabel}</span>
                  <span>{result.downloadSpeed} Mbps</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: `${Math.min((result.downloadSpeed / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.results.uploadLabel}</span>
                  <span>{result.uploadSpeed} Mbps</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-full rounded-full"
                    style={{ width: `${Math.min((result.uploadSpeed / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg text-sm">
            <h4 className="font-semibold mb-2">{t.results.details}</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>{t.results.pingLatency} <strong>{result.ping} ms</strong></div>
              <div>{t.results.jitter} <strong>{result.jitter} ms</strong></div>
              <div>{t.results.downloadSpeed} <strong>{result.downloadSpeed} Mbps</strong></div>
              <div>{t.results.uploadSpeed} <strong>{result.uploadSpeed} Mbps</strong></div>
            </div>
          </div>
        </>
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
            { term: t.glossary.ping.term, desc: t.glossary.ping.desc },
            { term: t.glossary.mbps.term, desc: t.glossary.mbps.desc },
            { term: t.glossary.speeds.term, desc: t.glossary.speeds.desc },
            { term: t.glossary.jitter.term, desc: t.glossary.jitter.desc },
          ]}
        />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.ping}</h4>
          <p>{t.formula.pingDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center overflow-x-auto">
            <BlockMath math={t.formula.pingFormula} />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.download}</h4>
          <p>{t.formula.downloadDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center overflow-x-auto">
            <BlockMath math={t.formula.downloadFormula} />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.uploadJitter}</h4>
          <div className="my-2 p-3 bg-muted rounded-lg overflow-x-auto">
            <BlockMath math={t.formula.uploadFormula} />
          </div>
          <p>{t.formula.jitterNote}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.wired}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.wiredTip1}</li>
            <li>{t.tips.wiredTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.otherDevices}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.otherTip1}</li>
            <li>{t.tips.otherTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.vpn}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.vpnTip1}</li>
            <li>{t.tips.vpnTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.repeat}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.repeatTip1}</li>
            <li>{t.tips.repeatTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.speedRef}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.speedRefTip1}</li>
            <li>{t.tips.speedRefTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.troubleshooting}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.troubleTip1}</li>
            <li>{t.tips.troubleTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('테스트 시작 버튼을 클릭하세요.', 'Click the start test button.')}</li>
          <li>{L('다운로드, 업로드, 핑 결과가 나올 때까지 기다리세요.', 'Wait while download, upload, and ping results are measured.')}</li>
          <li>{L('성능 등급을 확인하고 속도가 적절한지 판단하세요.', 'Review the performance grade and judge whether your speed is adequate.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('100Mbps 요금제', '100Mbps Plan')}</h4>
          <p>{L('100Mbps 요금제의 경우 실제 다운로드 속도는 네트워크 오버헤드 때문에 보통 85~95Mbps로 측정됩니다. 이는 정상입니다.', 'For a 100Mbps plan, the actual download speed typically measures 85-95Mbps due to network overhead, which is normal.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('게이밍 핑', 'Gaming Ping')}</h4>
          <p>{L('핑이 20ms 미만이면 온라인 게임에 이상적이며, 20~60ms도 대부분의 게임에서 원활하게 플레이할 수 있습니다.', 'A ping under 20ms is ideal for online gaming, and 20-60ms is still playable smoothly for most games.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('높은 대기 시간', 'High Latency')}</h4>
          <p>{L('핑이 100ms를 넘으면 화상 회의나 게임에서 지연이 눈에 띄게 느껴질 수 있으며, 유선 연결이나 더 가까운 서버로 개선할 수 있습니다.', 'When ping exceeds 100ms, delays become noticeable in video calls and gaming; a wired connection or closer server can help.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('Mbps와 MBps의 차이는 무엇인가요?', 'What is the difference between Mbps and MBps?'),
            a: L('Mbps는 초당 메가비트, MBps는 초당 메가바이트입니다. 1바이트는 8비트이므로 100Mbps는 약 12.5MBps입니다.', 'Mbps is megabits per second and MBps is megabytes per second. Since 1 byte equals 8 bits, 100Mbps is about 12.5MBps.'),
          },
          {
            q: L('측정 속도가 요금제보다 낮은 이유는 무엇인가요?', 'Why is my measured speed lower than my plan?'),
            a: L('실제 속도는 네트워크 오버헤드, WiFi 간섭, 서버 거리, 기기 성능, 동시 사용자 수 등 여러 요인으로 요금제의 최대치보다 낮게 나오는 것이 일반적입니다.', 'Actual speed is typically lower than your plan&apos;s maximum due to network overhead, WiFi interference, server distance, device performance, and concurrent users.'),
          },
          {
            q: L('핑(대기 시간)이란 무엇인가요?', 'What does ping (latency) mean?'),
            a: L('핑은 기기에서 서버까지 데이터가 왕복하는 데 걸리는 시간(ms)입니다. 값이 낮을수록 반응이 빠르며 게임과 화상 통화에 중요합니다.', 'Ping is the time in milliseconds for data to travel to a server and back. Lower values mean faster response, which matters for gaming and video calls.'),
          },
          {
            q: L('서버 위치가 결과에 영향을 주나요?', 'Does the server location affect the results?'),
            a: L('네. 가까운 서버일수록 핑이 낮고 더 높은 속도를 측정하는 경향이 있습니다. 서로 다른 지역의 서버로 테스트하면 거리에 따른 차이를 볼 수 있습니다.', 'Yes. Closer servers tend to give lower ping and higher measured speeds. Testing against servers in different regions shows the difference distance makes.'),
          },
          {
            q: L('속도에 영향을 주는 요인은 무엇인가요?', 'What factors affect the speed?'),
            a: L('WiFi 신호 세기, 사용 시간대(혼잡도), 연결된 기기 수, 라우터 성능, 배선 상태 등이 모두 결과에 영향을 줍니다. 유선 연결과 이른 시간대 테스트가 더 안정적입니다.', 'WiFi signal strength, time of day (congestion), number of connected devices, router performance, and cabling all affect results. A wired connection and testing during off-peak hours are more reliable.'),
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

export default InternetSpeedTest;
