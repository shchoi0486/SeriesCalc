'use client';

import React, { useState, useMemo } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ipToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(Number);
  if (nums.some((n) => isNaN(n) || n < 0 || n > 255)) return null;
  return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join('.');
}

function intToBinary(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ]
    .map((b) => b.toString(2).padStart(8, '0'))
    .join('.');
}

function parseMask(mask: string): number | null {
  const trimmed = mask.trim();
  if (trimmed.startsWith('/')) {
    const cidr = parseInt(trimmed.slice(1), 10);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) return null;
    return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  }
  const parts = trimmed.split('.');
  if (parts.length === 4) {
    const num = ipToInt(trimmed);
    if (num === null) return null;
    const binary = num.toString(2).padStart(32, '0');
    if (!/^1*0*$/.test(binary)) return null;
    const ones = binary.split('0')[0].length;
    return ones;
  }
  const cidr = parseInt(trimmed, 10);
  if (isNaN(cidr) || cidr < 0 || cidr > 32) return null;
  return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}

interface SubnetResult {
  cidr: number;
  networkAddress: string;
  broadcastAddress: string;
  firstUsable: string;
  lastUsable: string;
  totalIPs: number;
  usableHosts: number;
  wildcardMask: string;
  subnetMaskInt: number;
  ipBinary: string;
  maskBinary: string;
}

function calculateSubnet(ip: string, maskInput: string): SubnetResult | null {
  const ipInt = ipToInt(ip);
  if (ipInt === null) return null;

  const maskResult = parseMask(maskInput);
  if (maskResult === null) return null;

  let cidr: number;
  let maskInt: number;

  if (typeof maskResult === 'number' && maskResult <= 32) {
    const trimmed = maskInput.trim();
    if (trimmed.startsWith('/')) {
      cidr = parseInt(trimmed.slice(1), 10);
      maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    } else if (trimmed.split('.').length === 4) {
      maskInt = maskResult;
      cidr = maskInt.toString(2).split('1').length - 1;
    } else {
      cidr = maskResult;
      maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    }
  } else {
    return null;
  }

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalIPs = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalIPs - 2;

  return {
    cidr,
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstUsable: cidr >= 31 ? intToIp(networkInt) : intToIp((networkInt + 1) >>> 0),
    lastUsable: cidr >= 31 ? intToIp(broadcastInt) : intToIp((broadcastInt - 1) >>> 0),
    totalIPs,
    usableHosts,
    wildcardMask: intToIp((~maskInt) >>> 0),
    subnetMaskInt: maskInt,
    ipBinary: intToBinary(ipInt),
    maskBinary: intToBinary(maskInt),
  };
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  howToUse?: React.ReactNode;
  workedExamples?: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
  faq?: React.ReactNode;
}

interface SubnetCalculatorProps {
  infoSection: InfoSection;
}

const SubnetCalculator = ({ infoSection }: SubnetCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [ip, setIp] = useState('192.168.1.0');
  const [mask, setMask] = useState('/24');

  const results = useMemo(() => {
    if (!ip || !mask) return null;
    return calculateSubnet(ip, mask);
  }, [ip, mask]);

  const handleReset = () => {
    setIp('192.168.1.0');
    setMask('/24');
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ipInput">{L('IP 주소', 'IP Address')}</Label>
        <Input
          id="ipInput"
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="192.168.1.0"
          className="font-mono"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maskInput">{L('서브넷 마스크', 'Subnet Mask')}</Label>
        <Input
          id="maskInput"
          type="text"
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          placeholder="/24 or 255.255.255.0"
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          {L('/xx 또는 255.255.xxx 형식 지원', 'Supports /xx or 255.255.xxx format')}
        </p>
      </div>
      <Button onClick={handleReset} className="w-full" variant="outline">
        {L('초기화', 'Reset')}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {!results ? (
        <p className="text-muted-foreground text-center py-8">
          {L('IP 주소와 서브넷 마스크를 입력하세요.', 'Enter an IP address and subnet mask.')}
        </p>
      ) : (
        <>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-sm text-muted-0 mb-1">{L('CIDR 표기', 'CIDR Notation')}</div>
            <div className="text-2xl font-bold font-mono">
              {results.networkAddress}/{results.cidr}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('네트워크 주소', 'Network Address')}</span>
              <span className="font-mono">{results.networkAddress}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('브로드캐스트 주소', 'Broadcast Address')}</span>
              <span className="font-mono">{results.broadcastAddress}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('첫 번째 사용 가능 IP', 'First Usable IP')}</span>
              <span className="font-mono">{results.firstUsable}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('마지막 사용 가능 IP', 'Last Usable IP')}</span>
              <span className="font-mono">{results.lastUsable}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('전체 IP 수', 'Total IPs')}</span>
              <span className="font-mono">{results.totalIPs.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('사용 가능 호스트 수', 'Usable Hosts')}</span>
              <span className="font-mono">{results.usableHosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('와일드카드 마스크', 'Wildcard Mask')}</span>
              <span className="font-mono">{results.wildcardMask}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-sm">{L('바이너리 표현', 'Binary Representation')}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left p-1"></th>
                    <th className="p-1 text-center">1~8</th>
                    <th className="p-1 text-center">9~16</th>
                    <th className="p-1 text-center">17~24</th>
                    <th className="p-1 text-center">25~32</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left p-1 font-medium">{L('IP', 'IP')}</td>
                    {results.ipBinary.split('.').map((octet, i) => (
                      <td key={i} className="p-1 text-center bg-blue-50 dark:bg-blue-900/20 rounded">
                        {octet}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="text-left p-1 font-medium">{L('마스크', 'Mask')}</td>
                    {results.maskBinary.split('.').map((octet, i) => (
                      <td key={i} className="p-1 text-center bg-orange-50 dark:bg-orange-900/20 rounded">
                        {octet}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={L('서브넷 계산기', 'Subnet Calculator')}
      description={L(
        'IPv4 주소와 서브넷 마스크를 입력하여 네트워크 정보를 계산합니다.',
        'Enter an IPv4 address and subnet mask to calculate network information.'
      )}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default SubnetCalculator;
