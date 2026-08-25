import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./RegularInstallmentSavingsClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/regular-installment-savings", "finance", "regular-installment-savings");
}

export default function RegularInstallmentSavingsPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          매달 꾸준히, 차곡차곡! 목돈 만들기의 가장 기본적이면서도 확실한 방법, 바로 <strong>정기적금</strong>입니다. 정기적금은 은행 등 금융기관과 약속한 기간 동안 매월 일정한 금액을 납입하고, 만기일에 원금과 약속된 이자를 함께 돌려받는 가장 대표적인 저축 상품입니다.
        </p>
        <p>
          여행 자금, 내 집 마련 계약금, 자녀 학자금 등 구체적인 목표를 위해 계획적으로 돈을 모으는 데 최적화되어 있습니다. 강제성이 부여되어 소비의 유혹을 이겨내고 꾸준한 저축 습관을 형성하는 데 큰 도움을 줍니다.
        </p>
        <p>
          본 정기적금 계산기는 여러분의 소중한 목표 달성을 돕는 스마트한 가이드입니다. 월 적립액, 이자율, 기간, 그리고 복잡한 세금 옵션까지 고려하여 만기 시 실제 손에 쥐게 될 금액을 미리 정확하게 계산해볼 수 있습니다. 이를 통해 여러 금융 상품을 비교하고 가장 유리한 선택을 하도록 도와 성공적인 자산 형성의 첫걸음을 응원합니다.
        </p>        <TermGlossary items={[
          { term: '정기적금', desc: '약정한 기간 동안 매월 일정 금액을 납입하고 만기 시 원금과 이자를 돌려받는 대표적인 저축 상품입니다.' },
          { term: '단리', desc: '매월 납입한 원금에 대해서만 이자를 계산하는 방식으로, 정기적금에서 흔히 사용됩니다.' },
          { term: '월복리', desc: '매월 발생한 이자를 원금에 합산해 다음 달 이자를 계산하는 방식으로, 기간이 길수록 단리보다 유리합니다.' },
        ]} />

      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">정기적금의 이자는 크게 단리와 월복리 방식으로 계산됩니다. 어떤 방식을 선택하느냐에 따라 만기 수령액이 달라지므로, 그 차이를 명확히 이해하는 것이 중요합니다.</p>
        
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">1. 단리 계산법 (Simple Interest)</h3>
          <p>매월 납입한 원금에 대해서만 만기까지의 기간을 적용하여 이자를 계산하는 가장 기본적인 방식입니다.</p>
          <BlockMath math="\text{총 이자} = \text{월 납입금} \times \dfrac{\text{연이율}}{12} \times \dfrac{\text{총 납입 개월 수}\,(\text{총 납입 개월 수} + 1)}{2}" />
          <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-2">※ 각 월의 납입금이 예치되는 기간이 모두 다르기 때문에(첫 달은 12개월, 마지막 달은 1개월) 위와 같은 공식이 사용됩니다.</p>
        </div>

        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">2. 월복리 계산법 (Monthly Compound Interest)</h3>
          <p>매월 발생한 이자를 원금에 더하고, 다음 달에는 '원금+이자'에 대한 이자를 계산하는 방식입니다. 이자에 이자가 붙어 시간이 지날수록 눈덩이처럼 불어나는 효과가 있습니다.</p>
          <BlockMath math="\text{만기지급액} = \text{월 납입금} \times \left[\dfrac{(1 + \text{월이율})^{\text{납입개월수}} - 1}{\text{월이율}}\right] \times (1 + \text{월이율})" />
          <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-2">※ 월이율 = 연이율 / 12</p>
        </div>

        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">3. 세금 계산법 (Tax Calculation)</h3>
          <p>이자에 대해서는 세금이 발생하며, 과세 종류에 따라 최종 수령액이 달라집니다. (2025년 기준)</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><strong>일반과세:</strong> 이자 소득의 15.4% (소득세 14% + 지방소득세 1.4%)</li>
            <li><strong>세금우대:</strong> 이자 소득의 9.5% (특정 금융상품, 한도 내에서 적용)</li>
            <li><strong>비과세:</strong> 0% (비과세 종합저축 등 특정 요건 충족 시)</li>
          </ul>
            <BlockMath math="\text{실수령액} = \text{원금 합계} + (\text{총 이자} - \text{총 이자} \times \text{세율})" />
          </div>
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">계산 예시 (월 10만 원, 12개월, 연 3%, 단리, 일반과세)</h4>
            <p className="text-sm text-muted-foreground">원금 합계 = 100,000 × 12 = 1,200,000원</p>
            <p className="font-mono text-sm text-primary mt-1">총 이자 = 100,000 × (12×13/2) × (0.03/12) = 19,500원</p>
            <p className="font-mono text-sm text-primary">세금 = 19,500 × 15.4% = 3,003원</p>
            <p className="font-mono text-sm text-primary">세후 수령액 = 1,200,000 + (19,500 − 3,003) = 1,216,497원</p>
          </div>
        </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">💡 2025년, 정기적금 200% 활용 가이드</h2>
        
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">1. '단리 vs 복리' 신화와 진실</h3>
          <p className="mt-2">
            흔히 복리는 무조건 좋다고 알려져 있지만, 1년 만기 정기적금에서는 단리와 월복리의 차이가 미미할 수 있습니다. 하지만 <strong>적금 기간이 길어지고 월 납입액이 커질수록 복리의 마법은 강력해집니다.</strong> 동일한 금리라면 고민 없이 월복리 상품을 선택하는 것이 유리합니다.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">2. 금리 쇼핑은 필수! 0.1%의 나비효과</h3>
          <p className="mt-2">
            발품, 아니 손품을 파는 만큼 이자는 올라갑니다. 주거래 은행만 고집하지 말고, <strong>인터넷 전문 은행이나 저축은행의 비대면 상품</strong>을 꼭 비교해보세요. 종종 1%p 이상 높은 금리의 특판 상품을 만날 수 있습니다. 금융감독원의 '금융상품 한눈에' 서비스를 활용하는 것도 좋은 방법입니다.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">3. '선저축 후지출'을 위한 자동이체 시스템 구축</h3>
          <p className="mt-2">
            '월급날 = 적금 이체일' 공식을 만드세요. 월급이 들어오자마자 적금 계좌로 자동이체 되도록 설정하면, 소비의 유혹에서 벗어나 강제적으로 저축하는 습관을 만들 수 있습니다. 이것이 목돈 만들기의 가장 확실한 첫걸음입니다.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">4. 2025년 비과세 종합저축 한도, 놓치지 마세요!</h3>
          <p className="mt-2">
            만 65세 이상 어르신, 장애인 등 특정 조건을 만족한다면 <strong>전 금융기관 통합 5,000만 원 한도</strong> 내에서 발생하는 이자 소득에 대해 세금을 전혀 내지 않는 '비과세 종합저축'에 가입할 수 있습니다. 15.4%의 세금을 아낄 수 있는 강력한 절세 혜택이므로, 해당된다면 반드시 최우선으로 활용해야 합니다.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">5. 고급 스킬: 풍차돌리기 & 선납이연</h3>
          <p className="mt-2">
            <strong>풍차돌리기</strong>는 매달 1년 만기 적금을 새로 가입하여 1년 뒤부터는 매달 적금 만기의 기쁨을 누리는 방법입니다. 꾸준함을 유지하기 좋고, 급전이 필요할 때 일부만 해지할 수 있는 장점이 있습니다. <strong>선납이연</strong>은 일부 상호금융권(신협, 새마을금고 등)에서 가능한 기술로, 납입 회차와 일자를 조절하여 일반 적금보다 높은 실질 이자를 얻는 방법입니다. 다소 복잡하므로 상품 설명서를 충분히 숙지한 후 도전해보는 것을 추천합니다.
          </p>
        </div>
      </div>
    )
  };

  return <CalculatorClient infoSection={infoSection} />;
}
