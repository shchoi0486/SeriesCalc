import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "데이터 용량 가이드: GB와 GiB, 속도와 전송 시간" : "Data Storage Guide: GB vs GiB, Speeds and Transfer Times",
    description: isKo
      ? "저장 용량이 표기보다 작게 보이는 이유, GB·GiB 차이, 인터넷 속도로 전송 시간 계산하는 법을 정리했습니다."
      : "Why drives show less capacity, how GB differs from GiB, and how to compute transfer time from network speed.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/conversion`;

  const faq = [
    {
      q: L("1GB는 1000MB인가요, 1024MB인가요?", "Is 1 GB 1000 MB or 1024 MB?"),
      a: L(
        "둘 다 맞지만 뜻이 다릅니다. 저장장치 제조사는 십진 기준(1GB = 1000MB)을, 운영체제는 이진 기준(1GiB = 1024MiB)을 쓰는 경우가 많습니다. 엄밀한 표기는 GB와 GiB로 구분하며, 데이터 크기 변환기에서 두 기준을 각각 확인할 수 있습니다.",
        "Both, with different meanings. Storage vendors typically use decimal (1 GB = 1000 MB) while operating systems use binary (1 GiB = 1024 MiB). Strict notation separates GB from GiB, and the data size converter shows both standards.",
      ),
    },
    {
      q: L("500GB 드라이브가 465GB로 보이는 이유는?", "Why does a 500 GB drive show as 465 GB?"),
      a: L(
        "제조사는 500GB를 500,000,000,000바이트로 만들지만, 운영체제는 이를 1024 단위로 나눠 표시합니다. 500,000,000,000 ÷ 1024³ ≈ 465.7GiB가 되어 약 465GB로 보입니다. 파일시스템 예약 영역까지 빼면 실제 여유는 조금 더 줄어듭니다.",
        "Vendors build 500,000,000,000 bytes; the OS displays it divided by 1024 steps. 500,000,000,000 ÷ 1024³ ≈ 465.7 GiB, which reads as about 465 GB. Filesystem reserves shrink usable space a bit further.",
      ),
    },
    {
      q: L("인터넷 속도가 100Mbps면 1GB 파일은 몇 초에 받나요?", "At 100 Mbps, how long does a 1 GB file take?"),
      a: L(
        "약 80초입니다. 100Mbps는 초당 100메가비트이고 8비트가 1바이트이므로 실효 속도는 12.5MB/s입니다. 1000MB ÷ 12.5MB/s = 80초가 됩니다. 실제로는 프로토콜 오버헤드와 서버 속도 때문에 조금 더 걸립니다.",
        "About 80 seconds. 100 Mbps means 100 megabits per second; with 8 bits to a byte the effective rate is 12.5 MB/s. 1000 MB ÷ 12.5 MB/s = 80 s. Protocol overhead and server limits usually add a little.",
      ),
    },
    {
      q: L("Mbps와 MB/s를 헷갈리면 어떤 실수가 생기나요?", "What goes wrong when Mbps and MB/s are confused?"),
      a: L(
        "속도를 8배 과대평가하게 됩니다. 500Mbps 회선을 500MB/s로 읽으면 실제의 8배이므로, 대용량 파일 전송 계획이나 스토리지 대역폭 산정이 통째로 틀어집니다. 소문자 b는 비트, 대문자 B는 바이트로 기억하세요.",
        "You overestimate by 8×. Reading a 500 Mbps line as 500 MB/s inflates throughput eightfold, wrecking large-transfer plans and storage bandwidth estimates. Remember: lowercase b is bits, uppercase B is bytes.",
      ),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProsePage title={L("데이터 용량 완전 가이드", "The Complete Data Storage Guide")}>
        <ProseSection title={L("GB와 GiB, 왜 두 개인가", "Why GB and GiB both exist")}>
          <p>
            {L(
              "컴퓨터는 2진수로 동작하므로 1024 단위가 자연스럽고, 사람은 10진수에 익숙해 1000 단위를 씁니다. 과거에는 두 체계를 모두 GB로 표기해 혼란이 컸고, 지금은 IEC 표준이 1024 기반을 GiB·MiB로 구분해 부릅니다. 문제는 관행이 아직 완전히 통일되지 않았다는 점입니다.",
              "Computers work in binary, so 1024 steps come naturally; people think in decimal, so 1000 steps feel right. Historically both were labeled GB, causing confusion. The IEC standard now calls the binary units GiB and MiB — but practice has not fully caught up.",
            )}
          </p>
          <p>
            {L(
              "그래서 같은 1GB라도 문맥에 따라 10⁹바이트(저장장치)와 2³⁰바이트(메모리·OS)가 됩니다. 두 값의 차이는 약 7.4%이며, 용량이 커질수록 절대 차이도 커집니다. 1TB에서 약 69GB, 4TB에서 약 276GB 차이가 납니다.",
              "So 1 GB can mean 10⁹ bytes (storage) or 2³⁰ bytes (memory and OS) depending on context — a 7.4% gap that grows in absolute terms with capacity: about 69 GB at 1 TB and 276 GB at 4 TB.",
            )}
          </p>
          <p>
            <Link href={`${base}/data-size-converter`} className="text-primary underline">{L("데이터 크기 변환기", "Data Size Converter")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("속도와 전송 시간 계산", "Speed and transfer time")}>
          <p>
            {L(
              "네트워크 속도는 비트/초(bps), 파일 크기는 바이트(B)로 표기됩니다. 따라서 전송 시간(초) = 파일 크기(MB) × 8 ÷ 속도(Mbps)입니다. 이 한 줄만 기억하면 '왜 이렇게 느리지' 싶은 상황의 대부분이 설명됩니다.",
              "Network speed is in bits per second, file size in bytes. So transfer time (s) = file size (MB) × 8 ÷ speed (Mbps). That single line explains most \"why is this so slow\" moments.",
            )}
          </p>
          <p>
            {L(
              "예시로 4GB 영상을 300Mbps 회선으로 받으면 4096 × 8 ÷ 300 ≈ 109초입니다. 여기에 서버 업로드 속도, TCP 오버헤드, Wi-Fi 감쇠가 더해져 실제로는 2~3분이 걸릴 수 있습니다. 계산 결과는 이론상 하한선으로 보세요.",
              "A 4 GB video over 300 Mbps takes 4096 × 8 ÷ 300 ≈ 109 s in theory. Server upload limits, TCP overhead and Wi-Fi attenuation can stretch that to 2–3 minutes. Treat the result as a theoretical floor.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("저장 매체별 실제 용량", "Real capacity by medium")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("SSD·HDD: 표기 용량의 약 93%가 OS에 보입니다. 여기에 파일시스템 예약분과 OP(과할당) 영역이 더해집니다.", "SSDs and HDDs show about 93% of advertised capacity in the OS, minus filesystem reserves and over-provisioning.")}</li>
            <li>{L("USB 메모리: 32GB 제품이 29GB 안팎으로 보이는 것이 정상입니다. 128GB 이상에서 차이가 눈에 띕니다.", "USB sticks: a 32 GB drive reading about 29 GB is normal; the gap becomes obvious at 128 GB and above.")}</li>
            <li>{L("클라우드: 제공사가 TB를 십진 기준으로 표기하는 경우가 많아, 동기화 후 로컬에서 더 크게 보일 수 있습니다.", "Cloud plans often quote decimal TB, so synced folders can appear larger locally.")}</li>
          </ul>
          <p>
            {L("단위 자체를 바꿔 확인하려면 ", "To switch units directly, use the ")}
            <Link href={`${base}/unit-converter`} className="text-primary underline">{L("종합 단위 변환기", "All-in-One Unit Converter")}</Link>
            {L("를 함께 쓰세요.", " alongside.")}
          </p>
        </ProseSection>

        <ProseSection title={L("용량 계획 체크리스트", "Capacity planning checklist")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("백업은 원본의 2배 이상 여유를 두세요. 스냅샷·버전 이력이 공간을 먹습니다.", "Leave at least double the source size for backups — snapshots and version history consume space.")}</li>
            <li>{L("영상 편집은 프록시·캐시용으로 원본의 3~5배를 잡는 것이 안전합니다.", "Video editing needs 3–5× the source for proxies and cache to stay safe.")}</li>
            <li>{L("SSD는 80% 이상 채우면 쓰기 성능이 떨어지므로 여유 공간을 남기세요.", "SSDs lose write performance above 80% full, so keep headroom.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
