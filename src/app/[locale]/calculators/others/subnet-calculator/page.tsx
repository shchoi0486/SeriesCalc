
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./SubnetCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/others/subnet-calculator", "others", "subnet-calculator");
}



export default function SubnetCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('CIDR 표기란 무엇인가요?', 'What is CIDR notation?'),
      a: L('CIDR(Classless Inter-Domain Routing)은 슬래시 뒤에 접두사 길이를 붙여 네트워크 크기를 나타냅니다. 예를 들어 /24는 네트워크 부분이 24비트임을 의미합니다.', 'CIDR (Classless Inter-Domain Routing) indicates network size with a slash and prefix length. For example, /24 means 24 bits are the network portion.'),
    },
    {
      q: L('사용 가능한 호스트 수는 어떻게 계산하나요?', 'How is the number of usable hosts calculated?'),
      a: L('공식은 2^(32-prefix) - 2입니다. 총 주소 수에서 네트워크 주소와 브로드캐스트 주소를 빼서 구합니다.', 'The formula is 2^(32-prefix) - 2. You subtract the network and broadcast addresses from the total number of addresses.'),
    },
    {
      q: L('서브넷 마스크와 CIDR은 같은 것인가요?', 'Are subnet mask and CIDR the same?'),
      a: L('둘 다 네트워크 크기를 나타내지만 표현 방식이 다릅니다. 서브넷 마스크는 255.255.255.0 형태로, CIDR은 /24 형태로 표현합니다.', 'They both describe network size but in different formats. A subnet mask uses the form 255.255.255.0, while CIDR uses the form /24.'),
    },
    {
      q: L('IPv6도 지원하나요?', 'Does it support IPv6?'),
      a: L('아니요. 현재 이 계산기는 IPv4 주소만 지원합니다. IPv6는 128비트 주소 체계로 별도의 도구가 필요합니다.', 'No. This calculator currently supports IPv4 addresses only. IPv6 uses a 128-bit addressing scheme and requires a separate tool.'),
    },
    {
      q: L('네트워크 주소와 브로드캐스트 주소를 사용할 수 없는 이유는 무엇인가요?', 'Why are network and broadcast addresses unusable?'),
      a: L('네트워크 주소는 네트워크 자체를 식별하고, 브로드캐스트 주소는 네트워크의 모든 호스트에 메시지를 보내는 데 사용되므로 호스트에 할당할 수 없습니다.', 'The network address identifies the network itself, and the broadcast address sends messages to all hosts on the network, so neither can be assigned to a host.'),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '서브넷 계산기는 IPv4 주소와 서브넷 마스크를 입력하여 네트워크 주소, 브로드캐스트 주소, 사용 가능한 호스트 범위 등을 계산해주는 도구입니다. 네트워크 설계, IP 할당 계획, 방화벽 규칙 설정 등에 활용됩니다.',
            'The Subnet Calculator computes the network address, broadcast address, and usable host range from an IPv4 address and subnet mask. It is used in network design, IP allocation planning, and firewall rule configuration.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('서브넷 마스크란?', 'What is a Subnet Mask?')}</h4>
          <p className="text-sm">
            {L(
              '서브넷 마스크는 IP 주소의 네트워크 부분과 호스트 부분을 구분하는 32비트 값입니다. CIDR 표기(/24) 또는 듀얼 포맷(255.255.255.0)으로 표현합니다.',
              'A subnet mask is a 32-bit value that separates the network and host portions of an IP address. It is expressed in CIDR notation (/24) or dotted-decimal format (255.255.255.0).',
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-blue-500 pl-3">
            {L('서브넷 계산 공식', 'Subnet Calculation Formulas')}
          </h4>
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="text-center text-blue-600 space-y-1">
              <BlockMath math="\text{네트워크 주소} = \text{IP} \wedge \text{마스크}" />
              <BlockMath math="\text{브로드캐스트 주소} = \text{네트워크} \vee \neg(\text{마스크})" />
              <BlockMath math="\text{전체 IP 수} = 2^{(32 - \text{CIDR})}" />
              <BlockMath math="\text{사용 가능 호스트} = 2^{(32 - \text{CIDR})} - 2" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('계산 예시', 'Example')}</h4>
          <div className="p-4 bg-muted rounded-lg text-sm space-y-1">
            <p><strong>IP:</strong> 192.168.1.100 / <strong>CIDR:</strong> /24</p>
            <p className="font-mono">네트워크 주소 = 192.168.1.0</p>
            <p className="font-mono">브로드캐스트 = 192.168.1.255</p>
            <p className="font-mono">사용 가능: 192.168.1.1 ~ 192.168.1.254</p>
            <p className="font-mono">전체 IP: 256, 호스트: 254</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('CIDR 표기법 가이드', 'CIDR Notation Guide')}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">CIDR</th>
                  <th className="border p-2 text-left">{L('마스크', 'Mask')}</th>
                  <th className="border p-2 text-center">{L('호스트 수', 'Hosts')}</th>
                  <th className="border p-2 text-left">{L('용도', 'Use Case')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cidr: '/8', mask: '255.0.0.0', hosts: '16,777,214', use: L('대규모 ISP', 'Large ISP') },
                  { cidr: '/16', mask: '255.255.0.0', hosts: '65,534', use: L('대기업', 'Large enterprise') },
                  { cidr: '/24', mask: '255.255.255.0', hosts: '254', use: L('소규모 사무실', 'Small office') },
                  { cidr: '/25', mask: '255.255.255.128', hosts: '126', use: L('서브넷 분할', 'Subnet split') },
                  { cidr: '/28', mask: '255.255.255.240', hosts: '14', use: L('소규모 네트워크', 'Small network') },
                  { cidr: '/30', mask: '255.255.255.252', hosts: '2', use: L('P2P 링크', 'P2P link') },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-muted/50' : ''}>
                    <td className="border p-2 font-mono font-medium">{row.cidr}</td>
                    <td className="border p-2 font-mono text-sm">{row.mask}</td>
                    <td className="border p-2 text-center font-mono">{row.hosts}</td>
                    <td className="border p-2">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('네트워크 설계 팁', 'Network Design Tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('불필요한 IP 낭비를 줄이기 위해 호스트 수에 맞는 최적의 서브넷 크기를 선택하세요.', 'Choose the optimal subnet size for the number of hosts to reduce IP waste.')}</li>
            <li>{L('네트워크 주소와 브로드캐스트 주소는 호스트에 할당할 수 없습니다.', 'Network and broadcast addresses cannot be assigned to hosts.')}</li>
            <li>{L('서브넷 분할(Subnetting)으로 하나의 대역을 여러 소규모 네트워크로 나눌 수 있습니다.', 'Subnetting divides a large network into smaller ones.')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4 leading-relaxed">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('IP 주소와 CIDR 표기를 입력하세요. 예: 192.168.1.0/24', 'Enter an IP address and CIDR notation, e.g. 192.168.1.0/24.')}</li>
          <li>{L('또는 점으로 구분된 마스크(예: 255.255.255.0)를 직접 선택하세요.', 'Alternatively, select a dotted-decimal mask such as 255.255.255.0.')}</li>
          <li>{L('네트워크 주소, 브로드캐스트 주소, 호스트 범위가 자동으로 계산됩니다.', 'The network address, broadcast address, and host range are computed automatically.')}</li>
          <li>{L('사용 가능한 호스트 수를 확인해 네트워크 규모를 파악하세요.', 'Review the usable host count to understand the size of your network.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4 leading-relaxed">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-base mb-2">192.168.1.0/24</h4>
          <p className="text-sm">{L('총 256개의 IP 주소(0~255) 중 254개의 호스트를 사용할 수 있습니다. 일반적인 소규모 사무실 네트워크에 적합합니다.', 'There are 256 total IP addresses (0-255), of which 254 hosts are usable. Ideal for a typical small office network.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-base mb-2">10.0.0.0/8</h4>
          <p className="text-sm">{L('총 16,777,216개의 IP 주소 중 16,777,214개의 호스트를 사용할 수 있습니다. 대규모 사설 네트워크에서 사용합니다.', 'There are 16,777,216 total IP addresses, of which 16,777,214 hosts are usable. Used for large private networks.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-base mb-2">192.168.1.0/30</h4>
          <p className="text-sm">{L('총 4개의 IP 주소 중 2개의 호스트만 사용할 수 있습니다. 라우터 간 포인트 투 포인트(point-to-point) 링크에 적합합니다.', 'There are 4 total IP addresses with only 2 usable hosts. Ideal for point-to-point links between routers.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4 leading-relaxed">
        {faqs.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
