import type { Metadata } from "next";
import Link from "next/link";
import { locales } from "@/i18n/config";
import ProsePage from "@/components/sections/ProsePage";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "계산 가이드 모음 | SeriesCalc" : "Calculation Guides | SeriesCalc",
    description: isKo
      ? "대출·연봉·복리부터 펌프·단위·퍼센트까지, 계산기를 200% 활용하는 설명 글을 모았습니다."
      : "From loans, salaries and compounding to pumps, units and percentages — guides to get the most from every calculator.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const GUIDES: { slug: string; ko: string; en: string; descKo: string; descEn: string }[] = [
  { slug: "salary-take-home", ko: "연봉 실수령액 완전 가이드", en: "The Complete Take-Home Pay Guide", descKo: "세전·세후 차이, 4대보험·소득세 구조와 이직 체크리스트", descEn: "Gross vs net, insurance and tax structure, offer checklist" },
  { slug: "dti-dsr", ko: "DTI·DSR 완전 가이드", en: "The Complete DTI & DSR Guide", descKo: "대출 한도를 결정하는 비율의 계산과 한도 늘리는 법", descEn: "How the ratios work and how to raise your limit" },
  { slug: "deposit-savings", ko: "예금·적금 이자 완전 가이드", en: "The Complete Savings Interest Guide", descKo: "단리·복리·월복리 차이와 세후 수령액 비교법", descEn: "Simple vs compound vs monthly compounding, after tax" },
  { slug: "compound-interest-power", ko: "복리의 힘", en: "The Power of Compound Interest", descKo: "복리 극대화 4가지 방법과 시뮬레이션", descEn: "Four ways to maximize compounding, with simulations" },
  { slug: "mortgage-repayment-types", ko: "원리금균등 vs 원금균등", en: "Equal Payment vs Equal Principal", descKo: "두 상환 방식의 원리와 총이자 차이", descEn: "How the two amortization methods differ" },
  { slug: "jeonse-vs-wolse", ko: "전세 vs 월세 비교", en: "Jeonse vs Wolse", descKo: "기회비용으로 따지는 주거 형태 선택", descEn: "Choosing lease types by opportunity cost" },
  { slug: "npsh-cavitation", ko: "NPSH·캐비테이션 완전 가이드", en: "The Complete NPSH & Cavitation Guide", descKo: "펌프가 망가지는 이유와 방지 대책 4가지", descEn: "Why pumps fail and four prevention measures" },
  { slug: "pump-selection", ko: "펌프 선정 완전 가이드", en: "The Complete Pump Selection Guide", descKo: "유량·양정·동력 읽는 법과 선정 순서", descEn: "Reading flow, head and power; selection steps" },
  { slug: "bmi-weight", ko: "BMI·체중 관리 완전 가이드", en: "The Complete BMI & Weight Guide", descKo: "지수 해석과 목표 칼로리, 요요 없는 감량 순서", descEn: "Reading the index, calorie targets, no-rebound order" },
  { slug: "date-math", ko: "날짜 계산 완전 가이드", en: "The Complete Date Math Guide", descKo: "디데이·만나이·기념일 기준과 실수 방지법", descEn: "D-days, ages, anniversaries and mistake-proofing" },
  { slug: "metric-imperial", ko: "미터법 vs 야드파운드법 완전 가이드", en: "Metric vs Imperial: The Complete Guide", descKo: "단위계 정의·환산과 자주 틀리는 포인트", descEn: "Definitions, conversions and common mistakes" },
  { slug: "percentage-mastery", ko: "퍼센트 완전정복 가이드", en: "The Complete Percentage Guide", descKo: "할인율·증감률·역산 계산법", descEn: "Discounts, change rates and reverse math" },
  { slug: "heat-insulation", ko: "단열·열전달 완전 가이드", en: "Insulation & Heat Transfer Guide", descKo: "U값·R값 계산과 결로 위험 판단", descEn: "U- and R-values, plus condensation risk" },
  { slug: "electrical-basics", ko: "전기 기초 완전 가이드", en: "Electrical Basics Guide", descKo: "옴의 법칙·전압강하·전선 굵기·3상 전력", descEn: "Ohm's law, voltage drop, cable sizing, three-phase" },
  { slug: "data-storage", ko: "데이터 용량 완전 가이드", en: "The Complete Data Storage Guide", descKo: "GB·GiB 차이와 속도로 전송 시간 계산", descEn: "GB vs GiB and computing transfer time" },
];

export default function GuidesPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return (
    <ProsePage title={isKo ? "계산 가이드 모음" : "Calculation Guides"}>
      <p className="text-muted-foreground">
        {isKo
          ? "계산기 사용법과 배경지식을 정리한 설명 글입니다. 도구를 돌리기 전에 읽으면 같은 숫자도 다르게 보입니다."
          : "Explain how to use the calculators and the background behind them. Read before you calculate — the same numbers will look different."}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/${params.locale}/guides/${g.slug}`}
              className="block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <p className="font-semibold text-foreground">{isKo ? g.ko : g.en}</p>
              <p className="mt-1 text-sm text-muted-foreground">{isKo ? g.descKo : g.descEn}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ProsePage>
  );
}
