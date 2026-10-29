/**
 * 계산기 화면 하단에 자동으로 붙는 고유 FAQ.
 * - 페이지가 이미 infoSection.faq 를 넘긴 경우에는 렌더링하지 않는다(중복 방지).
 * - 문구는 계산기별로 직접 작성하며, 템플릿 복사/치환으로 만들지 않는다.
 */

export type QA = { q: string; a: string };

export const calculatorFaqs: Record<string, { ko: QA[]; en: QA[] }> = {
  "loan-interest": {
    ko: [
      { q: "대출 이자는 매달 같은 금액인가요?", a: "상환 방식에 따라 다릅니다. 원리금균등은 매달 총 납입액이 같고, 원금균등은 매달 원금이 같아 납입액이 점차 줄며, 만기일시는 이자만 내다가 만기에 원금을 한 번에 갚습니다." },
      { q: "총이자만 보고 상품을 고르면 되나요?", a: "총이자가 적은 쪽이 유리한 것은 맞지만, 초기 현금흐름도 함께 봐야 합니다. 원금균등은 총이자가 적은 대신 초기 납입액이 커서 소득이 일정하지 않으면 부담이 될 수 있습니다." },
      { q: "중도상환하면 이자가 줄어드나요?", a: "줄어듭니다. 남은 원금에 대해서만 이자가 붙기 때문입니다. 다만 중도상환수수료가 남아 있을 수 있으니 수수료 계산기로 실제 절감액을 먼저 확인하세요." },
    ],
    en: [
      { q: "Is the monthly loan payment always the same?", a: "It depends on the repayment method. Equal payment keeps the total monthly amount fixed, equal principal keeps the principal fixed so payments decline, and bullet repayment pays interest only until the principal comes due." },
      { q: "Should I choose a loan by total interest alone?", a: "Lower total interest is genuinely better, but early cash flow matters too. Equal principal saves interest while requiring larger early payments, which can strain uneven income." },
      { q: "Does prepaying reduce interest?", a: "Yes — interest only accrues on the remaining balance. Still, a prepayment fee may apply, so check the actual saving with the prepayment-fee calculator first." },
    ],
  },
  "mortgage-calculator": {
    ko: [
      { q: "월 상환액에 세금과 보험료도 포함되나요?", a: "이 계산기는 원금과 이자 기준의 상환액을 보여줍니다. 재산세, 주택보험, PMI, 관리비까지 포함한 실질 부담은 별도 항목으로 더해야 합니다." },
      { q: "LTV는 무엇을 의미하나요?", a: "주택 가격 대비 대출금 비율입니다. LTV가 높을수록 자기자본이 적고, 규제 지역에서는 LTV 한도가 대출 가능 금액을 직접 제한합니다." },
      { q: "고정금리와 변동금리 중 무엇이 유리한가요?", a: "금리 상승기에는 고정금리가, 하락기에는 변동금리가 유리합니다. 다만 변동금리는 상승 시 상환 부담이 커지므로, 감당 가능한 최대 월 납입액을 먼저 정하고 선택하세요." },
    ],
    en: [
      { q: "Does the monthly payment include taxes and insurance?", a: "This calculator shows principal and interest. Property tax, homeowners insurance, PMI and HOA fees must be added separately to see the true monthly burden." },
      { q: "What does LTV mean?", a: "Loan-to-value — the loan amount as a share of the property price. Higher LTV means less equity, and in regulated areas the LTV cap directly limits how much you can borrow." },
      { q: "Fixed or variable rate — which is better?", a: "Fixed rates suit rising-rate periods, variable rates suit falling ones. Since variable payments can jump, decide your maximum affordable monthly payment first." },
    ],
  },
  "compound-interest": {
    ko: [
      { q: "복리 계산에서 기간은 얼마나 중요하나요?", a: "가장 큰 변수입니다. 수익률을 조금 높이는 것보다 시작을 5년 앞당기는 편이 최종 금액에 더 크게 작용하는 경우가 많습니다." },
      { q: "이자를 중간에 인출하면 어떻게 되나요?", a: "복리 효과가 끊깁니다. 인출한 이자는 더 이상 원금처럼 불어나지 않으므로, 장기 목표라면 재투자를 유지하는 것이 핵심입니다." },
      { q: "세금을 반영한 결과인가요?", a: "아닙니다. 이 계산기는 세전 성장을 보여줍니다. 실제 수령액은 이자소득세 등 과세와 수수료를 반영해야 하므로 세후 기준으로 다시 확인하세요." },
    ],
    en: [
      { q: "How much does the time horizon matter?", a: "It is the biggest variable. Starting five years earlier often moves the final balance more than squeezing out a slightly higher return." },
      { q: "What happens if I withdraw interest along the way?", a: "Compounding stops on the withdrawn amount. Money taken out no longer grows like principal, so keeping gains invested is the core of long-term results." },
      { q: "Does this include taxes?", a: "No — it shows pre-tax growth. Actual proceeds depend on taxes and fees, so re-check using after-tax figures." },
    ],
  },
  "deposit-interest": {
    ko: [
      { q: "단리와 복리 중 어느 쪽이 유리한가요?", a: "같은 금리·기간이라면 복리가 항상 유리합니다. 다만 상품별 표시 금리가 다르므로, 금리가 낮은 복리 상품이 금리 높은 단리 상품을 이기는지는 총이자로 비교해야 합니다." },
      { q: "만기 이자에 세금이 얼마나 붙나요?", a: "일반 과세 기준 이자소득세 14%와 농어촌특별세 1.4%를 합쳐 15.4%가 원천징수됩니다. 세후 실수령액으로 상품을 비교하는 것이 정확합니다." },
      { q: "중도 해지하면 이자는 어떻게 되나요?", a: "약정 금리가 아닌 중도해지 금리가 적용되어 이자가 크게 줄어듭니다. 만기 전 자금이 필요할 수 있다면 자유적금이나 파킹통장을 함께 고려하세요." },
    ],
    en: [
      { q: "Is simple or compound interest better?", a: "At the same rate and term, compound always wins. Across different advertised rates, though, compare total interest — a lower-rate compound product can lose to a higher-rate simple one." },
      { q: "How much tax applies to deposit interest?", a: "Standard withholding is 15.4% (14% income tax plus a 1.4% surtax). Comparing after-tax proceeds is the accurate way to rank products." },
      { q: "What if I close the deposit early?", a: "A lower early-withdrawal rate applies, sharply cutting interest. If you might need the money, consider flexible savings or a parking account alongside." },
    ],
  },
  "stock-compound-interest": {
    ko: [
      { q: "배당 재투자를 가정한 계산인가요?", a: "네, 배당과 이익을 재투자한다는 가정입니다. 배당을 현금으로 받아 쓰면 실제 성장은 계산보다 낮아집니다." },
      { q: "연 수익률은 몇 %로 넣어야 하나요?", a: "과거 지수 장기 평균은 참고값일 뿐 보장이 아닙니다. 보수적 시나리오와 낙관적 시나리오를 각각 넣어 범위로 보는 것이 안전합니다." },
      { q: "물가상승은 반영되나요?", a: "명목 금액 기준입니다. 실질 구매력을 보려면 물가상승률 계산기로 같은 기간 인플레이션을 적용해 비교하세요." },
    ],
    en: [
      { q: "Does this assume dividend reinvestment?", a: "Yes — it assumes dividends and gains are reinvested. Taking dividends as cash lowers real growth below the projection." },
      { q: "What annual return should I enter?", a: "Long-run index averages are a reference, not a guarantee. Run conservative and optimistic scenarios and read the result as a range." },
      { q: "Is inflation included?", a: "No, figures are nominal. To see real purchasing power, apply the same period to the inflation calculator and compare." },
    ],
  },
  "inflation-calculator": {
    ko: [
      { q: "물가상승률은 얼마로 가정해야 하나요?", a: "중앙은행의 물가안정 목표는 보통 2% 수준입니다. 장기 계획에는 2~3% 범위를 넣고, 최근 실제 소비자물가 추이와 함께 판단하세요." },
      { q: "미래 금액과 현재 가치는 어떻게 다른가요?", a: "미래 금액은 오늘의 돈이 N년 뒤 명목상 얼마가 되는지를, 현재 가치는 미래의 돈을 오늘 가치로 환산한 금액을 뜻합니다. 후자가 구매력 비교에 적합합니다." },
      { q: "내 소비 패턴의 물가와 다른 이유는?", a: "공식 소비자물가는 평균 바스켓 기준입니다. 주거비·교육비·의료비 비중이 높은 가구는 체감 물가가 더 높게 나타날 수 있습니다." },
    ],
    en: [
      { q: "What inflation rate should I assume?", a: "Central banks typically target around 2%. For long-term planning, use a 2–3% range and sanity-check it against recent consumer-price data." },
      { q: "How do future value and present value differ?", a: "Future value shows what today's money becomes in nominal terms after N years; present value converts future money back into today's purchasing power. The latter is better for comparing real value." },
      { q: "Why does my cost of living differ from official inflation?", a: "Official CPI tracks an average basket. Households with heavy housing, education or medical spending often feel higher inflation." },
    ],
  },
  "vat": {
    ko: [
      { q: "부가세 포함가에서 공급가액을 어떻게 구하나요?", a: "포함가를 1.1로 나누면 됩니다. 예를 들어 110,000원이면 공급가액 100,000원, 부가세 10,000원입니다." },
      { q: "10%를 곱해서 빼면 왜 틀리나요?", a: "부가세는 공급가액의 10%이지 포함가의 10%가 아니기 때문입니다. 110,000원에서 11,000원을 빼면 실제 세액 10,000원과 달라집니다." },
      { q: "간이과세자도 같은 계산인가요?", a: "아닙니다. 간이과세자는 업종별 부가율을 적용해 세액을 산정하므로, 일반과세 기준인 이 계산 결과와 차이가 납니다." },
    ],
    en: [
      { q: "How do I get the net price from a VAT-inclusive total?", a: "Divide the total by 1.1. A 110,000 total means 100,000 net plus 10,000 VAT." },
      { q: "Why is subtracting 10% of the total wrong?", a: "VAT is 10% of the net price, not 10% of the gross. Subtracting 11,000 from 110,000 gives the wrong 10,000 actual tax figure." },
      { q: "Does this work for simplified-tax businesses?", a: "No. Simplified taxpayers apply sector-specific ratios, so results differ from this standard-rate calculation." },
    ],
  },
  "bmi-calculator": {
    ko: [
      { q: "BMI만으로 건강 상태를 판단해도 되나요?", a: "부족합니다. BMI는 근육량과 체지방 분포를 구분하지 못합니다. 허리둘레와 체지방률을 함께 보는 것이 정확합니다." },
      { q: "WHO 기준과 아시아 기준이 다른 이유는?", a: "아시아인은 같은 BMI에서도 내장지방과 당뇨 위험이 더 높게 나타나 과체중 기준을 23으로 낮춰 적용합니다." },
      { q: "어린이·청소년도 같은 기준인가요?", a: "아닙니다. 성장기에는 성별·연령별 백분위수를 사용하므로 성인 BMI 기준을 그대로 적용하면 안 됩니다." },
    ],
    en: [
      { q: "Can BMI alone judge my health?", a: "No. BMI cannot separate muscle from fat or show fat distribution. Pair it with waist circumference and body-fat percentage." },
      { q: "Why do WHO and Asian thresholds differ?", a: "Asian populations show higher visceral fat and diabetes risk at the same BMI, so the overweight threshold is lowered to 23." },
      { q: "Does the same scale apply to children?", a: "No. Children and teens use age- and sex-specific percentiles, so adult BMI categories do not apply." },
    ],
  },
  "calorie-calculator": {
    ko: [
      { q: "TDEE와 기초대사량은 어떻게 다른가요?", a: "기초대사량은 가만히 있을 때 쓰는 에너지이고, TDEE는 여기에 활동·소화·운동을 더한 하루 총소비량입니다. 다이어트 기준은 TDEE입니다." },
      { q: "감량 목표는 몇 칼로리 적자가 적당한가요?", a: "하루 300~500kcal 적자가 일반적입니다. 기초대사량 이하로 떨어뜨리면 근손실과 요요 위험이 커지므로 피하세요." },
      { q: "운동 칼로리는 얼마나 믿을 수 있나요?", a: "기기와 앱의 소모 칼로리는 추정치이며 개인차가 큽니다. 섭취량을 정확히 기록하고 체중 추세로 보정하는 편이 현실적입니다." },
    ],
    en: [
      { q: "How do TDEE and BMR differ?", a: "BMR is the energy you burn at rest; TDEE adds activity, digestion and exercise for total daily burn. Diet targets should use TDEE." },
      { q: "What calorie deficit is reasonable?", a: "A 300–500 kcal daily deficit is typical. Dropping below BMR risks muscle loss and rebound, so avoid it." },
      { q: "How reliable are exercise calorie estimates?", a: "Device and app estimates vary widely between people. Log intake accurately and adjust based on your weight trend instead." },
    ],
  },
  "due-date-calculator": {
    ko: [
      { q: "출산 예정일은 어떻게 계산되나요?", a: "마지막 월경 시작일부터 280일(40주)을 더하는 네겔레 방식이 표준입니다. 배란 시기가 불규칙하면 초음파 측정으로 보정합니다." },
      { q: "예정일과 실제 출산일이 다른 이유는?", a: "예정일은 통계적 기준일 뿐입니다. 실제 분만은 예정일 전후 2주 범위에서 다양하게 나타납니다." },
      { q: "임신 주수는 어떻게 세나요?", a: "마지막 월경 시작일을 기준으로 주 단위로 셉니다. 초음파 주수와 차이가 있으면 의료진 판단을 우선하세요." },
    ],
    en: [
      { q: "How is the due date calculated?", a: "The standard Naegele method adds 280 days (40 weeks) to the first day of the last menstrual period. Irregular cycles are corrected by ultrasound dating." },
      { q: "Why does the actual birth date differ?", a: "The due date is a statistical reference. Births commonly occur within two weeks either side." },
      { q: "How are pregnancy weeks counted?", a: "Weeks count from the first day of the last menstrual period. If ultrasound dating differs, follow your clinician's assessment." },
    ],
  },
  "percentage-calculator": {
    ko: [
      { q: "증감률과 퍼센트포인트는 어떻게 다른가요?", a: "2%에서 3%로 오르면 1%포인트 상승이지만 증감률은 50%입니다. 금리·비율을 다룰 때 두 표현을 혼동하면 오해가 생깁니다." },
      { q: "할인율을 두 번 적용하면 더해야 하나요?", a: "곱해야 합니다. 30% 할인 후 20% 추가 할인은 0.7×0.8=0.56으로 총 44% 할인입니다." },
      { q: "원래 값으로 되돌리는 계산은?", a: "증가 후 값이라면 1+비율로, 감소 후 값이라면 1−비율로 나눕니다. 20% 인상된 120의 원래 값은 120÷1.2=100입니다." },
    ],
    en: [
      { q: "How do percentage change and percentage points differ?", a: "Going from 2% to 3% is a 1 percentage-point rise but a 50% increase. Mixing the two causes real misreading of rates." },
      { q: "Do stacked discounts add?", a: "No, they multiply. 30% off then another 20% gives 0.7 × 0.8 = 0.56, a 44% total discount." },
      { q: "How do I reverse a percentage change?", a: "Divide by 1 plus the rate for an increase, or 1 minus the rate for a decrease. A 20% increase to 120 came from 120 ÷ 1.2 = 100." },
    ],
  },
  "unit-converter": {
    ko: [
      { q: "온도 변환도 같은 방식인가요?", a: "아닙니다. 섭씨·화씨는 영점이 달라 단순 비례가 아니라 (F−32)×5/9처럼 덧셈·뺄셈이 포함됩니다." },
      { q: "면적·부피는 왜 값이 크게 차이 나나요?", a: "제곱·세제곱 단위이기 때문입니다. 1피트는 30.48cm지만 1제곱피트는 약 929cm²입니다." },
      { q: "반올림 오차는 어떻게 처리하나요?", a: "표시 자릿수에서 반올림하므로 아주 작은 값은 0으로 보일 수 있습니다. 정밀 계산이 필요하면 표시 단위를 더 작은 단위로 바꿔 확인하세요." },
    ],
    en: [
      { q: "Does temperature convert the same way?", a: "No. Celsius and Fahrenheit have different zero points, so conversion involves addition and subtraction like (F−32)×5/9." },
      { q: "Why do area and volume differ so much?", a: "Because they are squared and cubed. One foot is 30.48 cm, but one square foot is about 929 cm²." },
      { q: "How is rounding handled?", a: "Values round at the displayed precision, so tiny numbers can show as zero. Switch to a smaller unit for finer resolution." },
    ],
  },
  "data-size-converter": {
    ko: [
      { q: "1GB는 1000MB인가요, 1024MB인가요?", a: "저장장치는 십진 기준(1000), 운영체제는 이진 기준(1024, GiB)을 쓰는 경우가 많습니다. 두 기준을 구분해 확인하세요." },
      { q: "인터넷 속도와 다운로드 시간은 어떻게 다른가요?", a: "속도는 Mbps(메가비트/초), 파일 크기는 MB(메가바이트)입니다. 8비트가 1바이트이므로 100Mbps 회선의 실제 속도는 약 12.5MB/s입니다." },
      { q: "표시 용량과 실제 용량이 다른 이유는?", a: "제조사 기준과 운영체제 기준의 차이, 그리고 파일시스템 예약 영역 때문입니다. 500GB 드라이브가 465GB로 보이는 것이 대표적입니다." },
    ],
    en: [
      { q: "Is 1 GB 1000 MB or 1024 MB?", a: "Storage vendors typically use decimal (1000) while operating systems use binary (1024, GiB). Check which standard you need." },
      { q: "How do network speed and download time relate?", a: "Speed is in Mbps (megabits per second) while file size is in MB (megabytes). With 8 bits to a byte, a 100 Mbps line delivers about 12.5 MB/s." },
      { q: "Why is usable capacity smaller than advertised?", a: "Vendor and OS standards differ, and filesystems reserve space. A 500 GB drive showing 465 GB is typical." },
    ],
  },
  "currency-converter": {
    ko: [
      { q: "환율은 실시간인가요?", a: "입력 시점의 참조 환율을 사용하며, 실제 카드·은행 적용 환율은 수수료와 스프레드가 붙어 더 불리합니다." },
      { q: "해외 결제 시 어떤 환율이 적용되나요?", a: "카드사는 국제브랜드 기준 환율에 수수료(보통 1~2%)를 더합니다. 계산 결과에 이 비용을 감안하세요." },
      { q: "송금과 현찰 환율이 다른 이유는?", a: "현찰은 취급 비용과 재고 위험이 반영되어 송금보다 스프레드가 큽니다. 목적에 맞는 환율 종류를 선택해야 합니다." },
    ],
    en: [
      { q: "Is the exchange rate live?", a: "It uses a reference rate at the moment of input. Bank and card rates include fees and spreads, so actual costs are less favorable." },
      { q: "Which rate applies to overseas card payments?", a: "Card networks apply their rate plus a fee, usually 1–2%. Factor that into the converted figure." },
      { q: "Why do cash and transfer rates differ?", a: "Cash rates price in handling cost and inventory risk, so their spread is wider than transfers. Pick the rate type matching your purpose." },
    ],
  },
  "subnet-calculator": {
    ko: [
      { q: "호스트 수가 2개 적게 나오는 이유는?", a: "네트워크 주소와 브로드캐스트 주소는 호스트에 할당할 수 없기 때문입니다. /24라면 256개 중 254개를 쓸 수 있습니다." },
      { q: "CIDR 표기와 서브넷 마스크는 같은 건가요?", a: "같은 정보를 다르게 쓴 것입니다. /24는 255.255.255.0과 동일하며, 1의 개수가 프리픽스 길이입니다." },
      { q: "VLSM은 무엇인가요?", a: "필요한 호스트 수에 맞춰 서브넷 크기를 다르게 나누는 방식입니다. 큰 서브넷부터 배치하면 주소 낭비를 줄일 수 있습니다." },
    ],
    en: [
      { q: "Why are usable hosts two fewer?", a: "The network and broadcast addresses cannot be assigned to hosts. A /24 yields 254 usable of 256 total addresses." },
      { q: "Are CIDR notation and subnet mask equivalent?", a: "They express the same thing. /24 equals 255.255.255.0, with the count of ones defining the prefix length." },
      { q: "What is VLSM?", a: "Variable-length subnet masking sizes each subnet to its host requirement. Allocating the largest subnets first minimizes wasted addresses." },
    ],
  },
  "qr-generator": {
    ko: [
      { q: "생성한 QR 코드는 만료되나요?", a: "아닙니다. 입력한 내용이 코드에 직접 담기므로 서버나 만료 기간에 의존하지 않습니다. 대신 내용을 바꾸려면 새로 생성해야 합니다." },
      { q: "인쇄용으로 해상도는 얼마나 필요하나요?", a: "최소 300dpi 이상, 권장 인쇄 크기는 2cm 이상입니다. 스캔 거리가 멀수록 더 크게 출력하세요." },
      { q: "스캔이 안 될 때 원인은?", a: "대비 부족, 로고 과다 삽입, 여백(쿼리트 존) 손상이 대표적입니다. 코드 주변 여백을 유지하고 색 대비를 높이세요." },
    ],
    en: [
      { q: "Do generated QR codes expire?", a: "No. The content is embedded directly in the code, with no server or expiry. Changing content requires generating a new code." },
      { q: "What resolution do I need for print?", a: "At least 300 dpi, with a printed size of 2 cm or more. Larger output is needed for greater scanning distance." },
      { q: "Why won't my code scan?", a: "Low contrast, overlaid logos and damaged quiet zones are the usual causes. Keep the surrounding margin clear and raise contrast." },
    ],
  },
  "npsh": {
    ko: [
      { q: "NPSHa와 NPSHr 중 무엇을 봐야 하나요?", a: "둘 다 봐야 합니다. 시스템이 주는 NPSHa가 펌프가 요구하는 NPSHr보다 커야 하며, 실무에서는 1.3배 이상의 여유를 권장합니다." },
      { q: "여유가 부족하면 어떤 조치가 효과적인가요?", a: "펌프를 낮추거나 탱크를 올려 위치 수두를 확보하는 것이 가장 확실합니다. 다음으로 흡입관 직경을 키워 마찰 손실을 줄입니다." },
      { q: "고온수에서 NPSHa가 급감하는 이유는?", a: "온도가 오르면 증기압이 급격히 상승해 압력 여유가 줄어들기 때문입니다. 100°C 근처에서는 여유가 거의 사라집니다." },
    ],
    en: [
      { q: "Should I check NPSHa or NPSHr?", a: "Both. The system's NPSHa must exceed the pump's NPSHr, with practice recommending a 1.3× margin." },
      { q: "What fixes insufficient margin fastest?", a: "Lowering the pump or raising the tank to gain position head is most reliable, followed by enlarging the suction pipe to cut friction loss." },
      { q: "Why does NPSHa collapse with hot water?", a: "Rising temperature sharply increases vapor pressure, eroding the pressure margin — near 100°C almost none remains." },
    ],
  },
  "pump-power": {
    ko: [
      { q: "수동력과 축동력의 차이는?", a: "수동력은 물에 실제 전달되는 동력이고, 축동력은 펌프 효율로 나눈 값으로 모터가 내야 하는 동력입니다." },
      { q: "모터 용량은 어떻게 정하나요?", a: "축동력에 여유율(10~25%)을 더해 표준 정격으로 올림합니다. 기동 전류와 운전점 변동도 고려해야 합니다." },
      { q: "유량을 절반으로 줄이면 동력은?", a: "회전수를 절반으로 낮추면 상사법칙에 따라 동력은 약 1/8이 됩니다. 밸브로 조이는 방식보다 인버터 제어가 효율적입니다." },
    ],
    en: [
      { q: "What is the difference between hydraulic and shaft power?", a: "Hydraulic power is what the water receives; shaft power divides by pump efficiency and is what the motor must supply." },
      { q: "How do I size the motor?", a: "Add a 10–25% margin over shaft power and round up to a standard rating, accounting for starting current and duty variation." },
      { q: "What happens to power at half flow?", a: "Halving speed cuts power to about one-eighth by the affinity laws. Inverter control beats throttling with a valve." },
    ],
  },
  "pipe-friction": {
    ko: [
      { q: "마찰계수는 어떻게 정하나요?", a: "층류에서는 레이놀즈 수의 함수(64/Re)이고, 난류에서는 관 재질 조도와 Re로 Colebrook 식을 풉니다. 이 계산기는 입력값에 맞춰 자동 적용합니다." },
      { q: "관경을 두 배로 키우면 손실은?", a: "유속이 1/4로 줄어 마찰 손실이 크게 감소합니다. 다만 관경이 커지면 설치비가 늘어 경제성 검토가 필요합니다." },
      { q: "국부 손실도 포함되나요?", a: "밸브·엘보 같은 국부 손실은 별도 계수로 더해야 합니다. 이 계산기는 직관 마찰 손실 기준입니다." },
    ],
    en: [
      { q: "How is the friction factor determined?", a: "Laminar flow uses 64/Re; turbulent flow solves Colebrook using roughness and Reynolds number. This calculator applies the right relation to your inputs." },
      { q: "What if I double the pipe diameter?", a: "Velocity drops to a quarter and friction loss falls sharply — though larger pipe costs more to install, so check economics." },
      { q: "Are minor losses included?", a: "Valve and elbow losses must be added separately with their own coefficients. This calculator covers straight-pipe friction." },
    ],
  },
  "beam-deflection": {
    ko: [
      { q: "허용 처짐은 얼마로 봐야 하나요?", a: "건축 구조 기준으로 보통 경간의 1/250~1/360을 적용합니다. 마감재가 민감하면 더 엄격한 값을 씁니다." },
      { q: "단면 2차 모멘트가 큰 영향을 주나요?", a: "처짐은 I에 반비례하므로 단면 형상이 결정적입니다. 같은 면적이라도 높이가 큰 단면이 유리합니다." },
      { q: "이 계산기는 어떤 하중을 다루나요?", a: "집중하중과 등분포하중 기준입니다. 이동하중이나 다점 지지 등 복잡한 조건은 구조 해석 프로그램이 필요합니다." },
    ],
    en: [
      { q: "What deflection limit should I use?", a: "Structural codes commonly allow span/250 to span/360, with stricter limits for brittle finishes." },
      { q: "Does the second moment of area matter much?", a: "Deflection is inversely proportional to I, so section shape is decisive — deeper sections win at equal area." },
      { q: "Which load cases are supported?", a: "Point loads and uniformly distributed loads. Moving loads or multi-support cases need structural analysis software." },
    ],
  },
  "ohms-law": {
    ko: [
      { q: "네 값 중 몇 개를 입력해야 하나요?", a: "두 개면 나머지를 모두 계산할 수 있습니다. 세 개를 입력하면 서로 모순될 수 있으므로 두 개만 남기세요." },
      { q: "전력은 왜 P=VI인가요?", a: "전압(단위 전하당 에너지)과 전류(단위 시간당 전하)를 곱하면 단위 시간당 에너지, 즉 전력이 됩니다." },
      { q: "교류 회로에도 그대로 적용되나요?", a: "순수 저항 부하에서는 유효값 기준으로 성립합니다. 코일·콘덴서가 있으면 역률을 고려한 교류 전력 계산이 필요합니다." },
    ],
    en: [
      { q: "How many values should I enter?", a: "Two values determine the rest. Entering three can create contradictions, so leave exactly two." },
      { q: "Why is power P = VI?", a: "Voltage is energy per charge and current is charge per time; multiplying gives energy per time — power." },
      { q: "Does this apply to AC circuits?", a: "For purely resistive loads it holds using RMS values. With inductors or capacitors, use AC power math with power factor." },
    ],
  },
  "voltage-drop": {
    ko: [
      { q: "허용 전압 강하는 몇 %인가요?", a: "일반적으로 조명·전원 회로는 3%, 동력 회로는 5% 이내를 권장합니다. 설비 규정과 내부 기준을 확인하세요." },
      { q: "전선 굵기를 키우면 왜 줄어드나요?", a: "저항이 단면적에 반비례하기 때문입니다. 강하 전압은 전류와 저항의 곱이므로 굵은 선이 유리합니다." },
      { q: "길이는 왕복으로 계산해야 하나요?", a: "네. 전류가 가고 오는 경로 전체가 저항에 포함되므로 케이블 길이의 2배를 적용합니다." },
    ],
    en: [
      { q: "What voltage drop is acceptable?", a: "Common practice allows up to 3% for lighting and power circuits and 5% for motor circuits — confirm against your code and site standard." },
      { q: "Why does a thicker cable reduce drop?", a: "Resistance is inversely proportional to cross-section, and drop is current times resistance — so thicker wins." },
      { q: "Should length be doubled?", a: "Yes. Current travels out and back, so the full loop — twice the cable length — counts toward resistance." },
    ],
  },
  "ac-power": {
    ko: [
      { q: "역률이 낮으면 어떤 손해가 있나요?", a: "같은 유효 전력을 내기 위해 더 큰 전류가 흘러 배선 손실과 전압 강하가 커지고, 일부 요금제에서는 역률 할증이 붙습니다." },
      { q: "무효 전력은 어디로 사라지나요?", a: "사라지지 않고 전원과 부하 사이를 왕복합니다. 일을 하지 않지만 설비 용량을 차지합니다." },
      { q: "3상에서 √3을 곱하는 이유는?", a: "선간 전압과 선전류로 계산할 때 각 상의 위상차 120°가 합쳐져 √3 계수가 나타나기 때문입니다." },
    ],
    en: [
      { q: "What does a low power factor cost me?", a: "A larger current is needed for the same real power, raising I²R losses and voltage drop — and some tariffs add a power-factor penalty." },
      { q: "Where does reactive power go?", a: "It oscillates between source and load rather than disappearing. It does no work but occupies equipment capacity." },
      { q: "Why the √3 factor in three-phase?", a: "Using line-to-line voltage and line current, the 120° phase separation combines into a √3 coefficient." },
    ],
  },
  "u-value": {
    ko: [
      { q: "U값과 R값은 어떤 관계인가요?", a: "서로 역수입니다. R값이 클수록 단열이 좋고 U값이 작아집니다. 미국식 표기는 R, 유럽·국내 기준은 U를 주로 씁니다." },
      { q: "층을 여러 개 쌓으면 어떻게 계산하나요?", a: "각 층의 R값을 모두 더한 뒤 역수를 취합니다. 표면 열저항도 포함해야 실제에 가깝습니다." },
      { q: "결로와도 관련이 있나요?", a: "간접적으로 관련됩니다. 단열이 부족하면 내부 표면 온도가 이슬점 아래로 내려가 결로가 생기므로, 이슬점 계산과 함께 검토하세요." },
    ],
    en: [
      { q: "How do U-value and R-value relate?", a: "They are reciprocals. Higher R means better insulation and lower U. US practice prefers R, European and Korean codes prefer U." },
      { q: "How do I combine multiple layers?", a: "Add each layer's R-value then invert. Include surface resistances for realistic results." },
      { q: "Does it relate to condensation?", a: "Indirectly. Poor insulation drops interior surface temperature below the dew point, causing condensation — check together with a dew-point calculation." },
    ],
  },
  "lmtd": {
    ko: [
      { q: "LMTD와 산술평균 온도차는 무엇이 다른가요?", a: "LMTD는 로그 평균으로 계산해 실제 열전달을 더 정확히 반영합니다. 입출구 온도차가 클수록 산술평균과의 차이도 커집니다." },
      { q: "보정계수 F는 언제 적용하나요?", a: "다중 패스·교차류처럼 순수 향류·병류가 아닌 배열에서 적용합니다. F가 0.8 미만이면 배열 재검토가 필요합니다." },
      { q: "향류가 병류보다 유리한 이유는?", a: "향류는 양단 온도차가 고르게 유지되어 같은 면적으로 더 많은 열을 전달합니다." },
    ],
    en: [
      { q: "How does LMTD differ from arithmetic mean ΔT?", a: "LMTD uses a logarithmic mean, reflecting real heat transfer more accurately. The larger the terminal differences, the bigger the gap from the arithmetic mean." },
      { q: "When do I apply correction factor F?", a: "For multi-pass or cross-flow arrangements that are not pure counterflow or parallel flow. Below F = 0.8, reconsider the arrangement." },
      { q: "Why is counterflow better than parallel?", a: "Counterflow keeps terminal differences more even, transferring more heat with the same area." },
    ],
  },
  "dew-point": {
    ko: [
      { q: "이슬점과 습구온도는 어떻게 다른가요?", a: "이슬점은 냉각 시 응결이 시작되는 온도이고, 습구온도는 증발 냉각으로 도달하는 온도입니다. 보통 이슬점이 습구온도보다 낮습니다." },
      { q: "결로를 막으려면 무엇을 봐야 하나요?", a: "표면 온도가 이슬점보다 높아야 합니다. 단열 보강, 환기, 표면 온도 상승이 대표 대책입니다." },
      { q: "실내 이슬점은 어느 정도가 쾌적한가요?", a: "일반적으로 10~16도 범위가 쾌적합니다. 18도 이상이면 습도가 높아 불쾌하고 곰팡이 위험이 커집니다." },
    ],
    en: [
      { q: "How do dew point and wet-bulb differ?", a: "Dew point is the temperature at which cooling starts condensation; wet-bulb is the temperature reached by evaporative cooling. Dew point is usually lower." },
      { q: "What prevents condensation?", a: "Surface temperature must stay above the dew point — add insulation, ventilate, or raise surface temperature." },
      { q: "What indoor dew point is comfortable?", a: "Roughly 10–16°C feels comfortable. Above 18°C humidity is high, raising discomfort and mold risk." },
    ],
  },
  "cagr": {
    ko: [
      { q: "CAGR와 산술평균 성장률은 왜 다른가요?", a: "산술평균은 각 연도 증감률을 단순 평균한 값이고, CAGR은 시작값과 종료값만으로 계산한 연평균 복리 성장률입니다. 변동성이 큰 자산은 산술평균이 실제보다 높게 보이므로 장기 비교에는 CAGR이 적합합니다." },
      { q: "중간에 투자를 추가하면 CAGR을 쓸 수 있나요?", a: "엄밀히는 어렵습니다. CAGR은 최초·최종 가치만 보므로 중간 입출금이 있으면 왜곡됩니다. 이 경우에는 내부수익률(IRR)이나 금액가중수익률을 사용해야 합니다." },
      { q: "CAGR이 마이너스로 나올 수도 있나요?", a: "가능합니다. 최종 가치가 시작값보다 작으면 CAGR은 음수가 됩니다. 예를 들어 100이 3년 뒤 80이 되면 약 -7.2%입니다." },
    ],
    en: [
      { q: "Why does CAGR differ from an arithmetic average?", a: "An arithmetic average simply averages yearly percentage changes, while CAGR is the compounded annual rate implied by the start and end values only. For volatile assets the arithmetic mean overstates reality, so CAGR is the right measure for long-horizon comparison." },
      { q: "Can I use CAGR when I add money along the way?", a: "Strictly, no. CAGR looks only at the first and last value, so intermediate contributions distort it. Use IRR or a money-weighted return instead." },
      { q: "Can CAGR be negative?", a: "Yes. If the ending value is below the starting value, CAGR is negative — 100 falling to 80 over three years is about -7.2%." },
    ],
  },
  "dti": {
    ko: [
      { q: "DTI에는 어떤 대출이 포함되나요?", a: "주택담보대출 원리금과 신용대출·카드론 등 금융권 대출의 연간 상환액이 포함됩니다. 다만 전세자금대출처럼 산정에서 제외되거나 별도로 취급되는 상품이 있으므로, 실제 심사에서는 은행의 산정 기준을 확인해야 합니다." },
      { q: "소득은 세전 기준인가요, 세후 기준인가요?", a: "세전 연소득을 기준으로 합니다. 근로소득은 원천징수영수증의 총급여, 사업소득은 소득금액증명원의 소득금액이 쓰이며, 상여나 변동소득은 인정 폭이 줄어들 수 있습니다." },
      { q: "DTI가 낮으면 대출이 무조건 나오나요?", a: "아닙니다. DTI는 여러 심사 지표 중 하나일 뿐이고, DSR·LTV·신용등급·담보 가치가 함께 적용됩니다. DTI가 기준 이내여도 DSR에서 막히는 경우가 흔합니다." },
    ],
    en: [
      { q: "Which loans count toward DTI?", a: "Annual repayments on mortgages plus credit loans, card loans and other financial-sector debt. Some products such as jeonse loans are excluded or treated separately, so confirm the lender's methodology for your actual case." },
      { q: "Is income measured before or after tax?", a: "Pre-tax annual income is used — gross pay from the withholding statement for employees, business income from the income certificate for the self-employed. Bonuses and variable pay may be discounted." },
      { q: "Does passing DTI guarantee approval?", a: "No. DTI is one of several tests alongside DSR, LTV, credit score and collateral value. It is common to clear DTI and still fail on DSR." },
    ],
  },
  "principal-and-interest-equal-repayment": {
    ko: [
      { q: "원리금균등은 왜 초기에 이자를 많이 내나요?", a: "매달 총 납입액을 일정하게 맞추기 위해, 잔액이 큰 초기에는 이자 비중이 커지고 원금 상환은 적어집니다. 시간이 지나 잔액이 줄면 이자가 줄고 원금 비중이 커집니다." },
      { q: "원금균등과 비교해 총이자는 얼마나 차이 나나요?", a: "같은 금리·기간이라면 원금균등의 총이자가 항상 적습니다. 3억 원·연 4%·30년 기준으로 수백만 원 차이가 나므로, 대출 이자 계산기에서 두 방식을 같은 조건으로 비교해 보세요." },
      { q: "중도상환수수료는 언제까지 내나요?", a: "보통 대출 실행일부터 3년 이내에 중도상환하면 잔액의 일정 비율을 수수료로 냅니다. 기간이 지날수록 요율이 낮아지는 슬라이딩 방식이 일반적입니다." },
    ],
    en: [
      { q: "Why is interest front-loaded in equal-payment loans?", a: "To keep the total payment constant, the early months — when the balance is largest — put more weight on interest and less on principal. As the balance falls, interest shrinks and principal repayment grows." },
      { q: "How much more interest than equal principal?", a: "At the same rate and term, equal principal always costs less in total. On a 300M loan at 4% over 30 years the gap runs into millions, so compare both in the loan interest calculator under identical terms." },
      { q: "How long do prepayment fees apply?", a: "Typically a percentage of the remaining balance if repaid within three years of origination, often on a sliding scale that falls as time passes." },
    ],
  },
  "principal-equal-amortization": {
    ko: [
      { q: "원금균등은 왜 매달 납입액이 줄어드나요?", a: "원금을 매달 같은 금액으로 나눠 갚으므로 잔액이 빠르게 줄고, 그만큼 이자가 감소합니다. 결과적으로 초반 납입액이 가장 크고 이후 완만하게 줄어듭니다." },
      { q: "소득이 일정한 직장인에게도 유리한가요?", a: "총이자는 적지만 초기 부담이 큽니다. 월 납입액이 감당 가능한 수준인지 먼저 확인하고, 여유가 없다면 원리금균등이 현실적입니다." },
      { q: "중도상환에 유리한 방식인가요?", a: "원금이 빨리 줄어 잔액이 작아지므로, 중도상환 시 절감 효과가 상대적으로 작게 느껴질 수 있습니다. 다만 이미 낸 이자가 적다는 점은 변하지 않습니다." },
    ],
    en: [
      { q: "Why do payments decline in equal-principal loans?", a: "Principal is split into equal monthly slices, so the balance falls quickly and interest falls with it. Payments start at their highest and decline gently thereafter." },
      { q: "Is it good for salaried workers with steady income?", a: "Total interest is lower, but early payments are larger. Confirm the first payments fit your budget — if not, equal payment is the realistic choice." },
      { q: "Is it better for prepayment?", a: "The balance shrinks fast, so a prepayment saves less in absolute terms than on a slowly amortizing loan. The fact that you have already paid less interest still holds." },
    ],
  },
  "regular-installment-savings": {
    ko: [
      { q: "정액적립식과 자유적립식은 무엇이 다른가요?", a: "정액적립식은 매월 같은 금액을 납입하는 방식이고, 자유적립식은 매월 금액을 자유롭게 바꿀 수 있습니다. 같은 금리라면 정액적립식이 이자 계산이 유리한 경우가 많습니다." },
      { q: "적금 이자는 왜 예금보다 적게 나오나요?", a: "적금은 매달 납입하므로 첫 회차를 제외한 금액은 만기까지 1년을 채우지 못합니다. 평균 예치 기간이 절반 수준이라 같은 금리에서도 이자가 예금의 절반 정도가 됩니다." },
      { q: "만기 전에 해지하면 어떻게 되나요?", a: "약정 금리가 아닌 중도해지 금리가 적용되어 이자가 크게 줄어듭니다. 급전이 필요할 수 있다면 자유적립식이나 파킹통장을 함께 고려하세요." },
    ],
    en: [
      { q: "What is the difference between fixed and flexible installments?", a: "Fixed installment plans require the same amount each month; flexible ones let you vary it. At the same rate, fixed plans often compute interest more favorably." },
      { q: "Why does installment savings pay less than a term deposit?", a: "Each monthly contribution except the first does not stay for the full term. Average time on deposit is roughly half the term, so interest lands near half of an equivalent lump-sum deposit." },
      { q: "What happens if I cancel early?", a: "A lower early-withdrawal rate applies and interest drops sharply. If you may need the cash, consider flexible plans or a parking account alongside." },
    ],
  },
  "free-installment-savings": {
    ko: [
      { q: "자유적립식은 매달 금액을 바꿔도 되나요?", a: "네, 납입 금액과 횟수를 자유롭게 조정할 수 있습니다. 다만 상품별로 월 최소·최대 납입 한도가 정해져 있으므로 가입 전에 확인하세요." },
      { q: "금액을 몰아서 넣으면 이자가 늘어나나요?", a: "늘어납니다. 이자는 실제 예치 기간에 비례하므로, 같은 총액이라면 초반에 많이 넣을수록 유리합니다. 목표 금액이 정해져 있다면 초반 납입을 앞당기는 것이 효과적입니다." },
      { q: "목표 금액에서 월 납입액을 역산할 수 있나요?", a: "가능합니다. 목표액과 금리·기간을 넣고 월 납입액을 조정해 보세요. 계산기에서 납입액을 바꿔가며 만기 수령액이 목표에 닿는 지점을 찾으면 됩니다." },
    ],
    en: [
      { q: "Can I change the monthly amount in a flexible plan?", a: "Yes — amount and frequency are adjustable. Individual products set monthly minimums and maximums, so check the terms before opening one." },
      { q: "Does front-loading contributions increase interest?", a: "Yes. Interest accrues on time on deposit, so for a fixed total, contributing more early earns more. If you have a target amount, move contributions earlier." },
      { q: "Can I work backwards from a target amount?", a: "Yes. Enter the target, rate and term, then adjust the monthly contribution until the maturity value reaches your goal." },
    ],
  },
  "installment-savings-monthly-compound-interest": {
    ko: [
      { q: "월복리 적금은 어떻게 이자가 붙나요?", a: "매달 발생한 이자를 원금에 더해 다음 달 이자의 기준으로 삼습니다. 같은 표시 금리라면 연 단위 복리보다 유리하며, 기간이 길수록 차이가 커집니다." },
      { q: "월복리면 이자가 두 배가 되나요?", a: "아닙니다. 연 4% 상품이라면 월복리 실효금리는 약 4.07% 수준입니다. 적금은 납입 시점이 흩어져 있어 실제 차이는 더 작습니다." },
      { q: "세금은 어떻게 반영해야 하나요?", a: "이자소득세 14%와 농어촌특별세 1.4%를 합쳐 15.4%가 원천징수됩니다. 계산 결과에서 세후 금액을 확인하고 상품을 비교하세요." },
    ],
    en: [
      { q: "How does monthly compounding work in savings?", a: "Interest earned each month is added to principal and becomes the base for the next month. At the same advertised rate this beats annual compounding, and the gap widens with term." },
      { q: "Does monthly compounding double the interest?", a: "No. A 4% product compounds to an effective annual rate near 4.07%. Because installment contributions are spread across months, the real difference is even smaller." },
      { q: "How should I account for tax?", a: "Withholding is 15.4% (14% income tax plus 1.4% surtax). Compare products on the after-tax figure shown in the result." },
    ],
  },
  "early-repayment-fee": {
    ko: [
      { q: "중도상환수수료는 어떻게 계산되나요?", a: "보통 중도상환 금액 × 수수료율 × (남은 기간 ÷ 약정 기간)으로 계산합니다. 대출 초반에 갚을수록 부과 비중이 커지고, 3년이 지나면 면제되는 상품이 많습니다." },
      { q: "수수료를 내고 갚는 것이 이득인가요?", a: "절감되는 이자와 수수료를 비교해야 합니다. 금리가 높고 남은 기간이 길수록 절감액이 커지므로, 계산기에서 두 값을 함께 확인하세요." },
      { q: "일부만 상환해도 수수료가 붙나요?", a: "네. 중도상환한 금액에 대해서만 수수료가 부과됩니다. 다만 상품별로 연간 면제 한도나 횟수 조건이 있으니 약정서를 확인하세요." },
    ],
    en: [
      { q: "How is the prepayment fee calculated?", a: "Usually prepaid amount × fee rate × (remaining term ÷ original term). The fee weighs heaviest early in the loan and many products waive it after three years." },
      { q: "Is it worth paying the fee to prepay?", a: "Compare the interest saved against the fee. Higher rates and longer remaining terms make prepayment more attractive — check both figures in the calculator." },
      { q: "Does a partial prepayment incur a fee?", a: "Yes, charged only on the amount prepaid. Products often include annual allowance limits or free-prepayment counts, so read the agreement." },
    ],
  },
  "reynolds-number": {
    ko: [
      { q: "레이놀즈 수 기준층류와 난류는 어디서 갈리나요?", a: "관 내부 유동에서는 Re < 2,300을 층류, 2,300~4,000을 천이영역, 4,000 이상을 난류로 봅니다. 경계값은 문헌마다 조금씩 다르므로 설계 기준을 확인하세요." },
      { q: "특성길이는 무엇을 쓰나요?", a: "관 내부 유동은 관경(직경), 평판 유동은 흐름 방향 길이를 씁니다. 같은 유체라도 특성길이를 바꾸면 Re가 달라지므로 계산 전에 정의를 맞춰야 합니다." },
      { q: "점성계수는 어디서 구하나요?", a: "물·공기 같은 주요 유체는 온도별 표가 공개되어 있습니다. 온도가 바뀌면 점성이 크게 변하므로, 실제 운전 온도의 값을 사용해야 합니다." },
    ],
    en: [
      { q: "Where do laminar and turbulent flow divide?", a: "For pipe flow, Re < 2,300 is laminar, 2,300–4,000 transitional, and above 4,000 turbulent. Thresholds vary slightly between references, so check your design code." },
      { q: "Which characteristic length should I use?", a: "Pipe flow uses the inside diameter; flat-plate flow uses length along the flow. Changing the characteristic length changes Re, so fix the definition before calculating." },
      { q: "Where do I get viscosity values?", a: "Published tables cover common fluids like water and air by temperature. Viscosity shifts strongly with temperature, so use the value at your actual operating temperature." },
    ],
  },
  "bernoulli": {
    ko: [
      { q: "베르누이 방정식은 어떤 조건에서 성립하나요?", a: "정상·비압축성·비점성 유동을 가정합니다. 실제 배관에서는 마찰 손실이 있으므로 손실 수두 항을 추가해야 하며, 이 계산기는 이상 유동 기준의 결과를 보여줍니다." },
      { q: "압력이 낮아지면 속도가 빨라지는 이유는?", a: "에너지 보존 때문입니다. 압력 에너지가 줄어든 만큼 운동 에너지가 늘어나 속도가 증가합니다. 노즐이나 벤투리관이 이 원리를 씁니다." },
      { q: "높이 차이는 어떻게 반영하나요?", a: "위치 수두 ρgh 항으로 반영됩니다. 펌프가 물을 위로 올릴 때 필요한 양정의 기본이 되며, 마찰 손실과 함께 전양정을 구성합니다." },
    ],
    en: [
      { q: "When does Bernoulli's equation apply?", a: "It assumes steady, incompressible, inviscid flow. Real piping has friction, so a head-loss term must be added; this calculator reports ideal-flow results." },
      { q: "Why does lower pressure mean higher velocity?", a: "Energy conservation — as pressure energy falls, kinetic energy rises and velocity increases. Nozzles and Venturi meters exploit exactly this." },
      { q: "How is elevation difference handled?", a: "Through the potential term ρgh. It underpins the head needed to lift water and, together with friction loss, makes up total pump head." },
    ],
  },
  "heat-transfer": {
    ko: [
      { q: "전도·대류·복사 중 무엇을 계산하나요?", a: "이 계산기는 고체 벽을 통한 전도(Fourier 법칙)를 다룹니다. 유체와 벽 사이의 대류, 표면에서의 복사는 별도 계산기로 확인해야 합니다." },
      { q: "열전도율 k는 어디서 오나요?", a: "재료별 물성표에 온도 함수로 제시됩니다. 합금·단열재는 조성에 따라 값이 크게 달라지므로, 제조사 데이터시트를 우선하세요." },
      { q: "두께를 두 배로 하면 열유속은 절반인가요?", a: "단일 평판이라면 정확히 절반입니다. 다만 실제 벽체는 여러 층과 표면 열저항이 있어, 두께만 늘리면 감소폭이 줄어듭니다." },
    ],
    en: [
      { q: "Which mode — conduction, convection or radiation?", a: "This calculator covers conduction through a solid wall (Fourier's law). Convection between fluid and wall, and surface radiation, need their own calculators." },
      { q: "Where do I find conductivity k?", a: "Material property tables give it, often as a function of temperature. Alloys and insulations vary widely by composition, so prefer manufacturer datasheets." },
      { q: "Does doubling thickness halve heat flux?", a: "For a single flat plate, exactly. Real walls include multiple layers and surface films, so adding thickness alone yields diminishing reductions." },
    ],
  },
  "psychrometric": {
    ko: [
      { q: "건구온도와 습구온도는 무엇이 다른가요?", a: "건구온도는 일반 온도계로 재는 공기 온도이고, 습구온도는 젖은 천을 감은 온도계로 재는 값입니다. 두 값의 차이가 클수록 습도가 낮아 증발이 활발합니다." },
      { q: "상대습도 100%가 되면 어떻게 되나요?", a: "공기가 더 이상 수증기를 머금을 수 없는 포화 상태가 되어 결로가 시작됩니다. 이때의 온도가 이슬점입니다." },
      { q: "공조 설계에서 엔탈피는 왜 보나요?", a: "현열만으로는 냉방 부하를 설명할 수 없기 때문입니다. 습기를 제거하는 잠열까지 포함한 엔탈피 차이로 코일 용량을 산정합니다." },
    ],
    en: [
      { q: "How do dry-bulb and wet-bulb differ?", a: "Dry-bulb is plain air temperature; wet-bulb comes from a thermometer wrapped in wet cloth. The bigger the gap, the drier the air and the faster evaporation." },
      { q: "What happens at 100% relative humidity?", a: "The air is saturated and cannot hold more vapor, so condensation begins. That temperature is the dew point." },
      { q: "Why does HVAC design use enthalpy?", a: "Sensible heat alone cannot describe cooling load. Coil sizing uses enthalpy difference, which includes the latent heat of removing moisture." },
    ],
  },
  "tank": {
    ko: [
      { q: "탱크 용량은 어떻게 계산하나요?", a: "원통형이면 π × 반지름² × 높이, 직육면체면 가로 × 세로 × 높이입니다. 계산 결과는 m³ 또는 L로 표시되며, 실제 저장 가능량은 여유 공간(오버플로우)만큼 적습니다." },
      { q: "유효 용량과 총 용량은 어떻게 다른가요?", a: "총 용량은 탱크 전체 부피이고, 유효 용량은 실제로 채우고 뺄 수 있는 범위입니다. 상단 여유와 바닥 퇴적 공간을 빼고 산정해야 합니다." },
      { q: "액체 무게도 알 수 있나요?", a: "부피에 밀도를 곱하면 됩니다. 물은 약 1,000kg/m³이지만 온도와 용질에 따라 달라지므로, 정확한 값이 필요하면 밀도 계산기를 함께 쓰세요." },
    ],
    en: [
      { q: "How is tank volume calculated?", a: "Cylinders use π × radius² × height; rectangular tanks use length × width × height. Results appear in m³ or liters, and usable volume is less by the freeboard allowance." },
      { q: "What is the difference between gross and working volume?", a: "Gross is the full geometric volume; working volume is what you can actually fill and draw. Subtract top freeboard and bottom sediment space." },
      { q: "Can I get the liquid weight?", a: "Multiply volume by density. Water is about 1,000 kg/m³, but temperature and dissolved solids change that — use the density calculator for precision." },
    ],
  },
  "wire-gauge": {
    ko: [
      { q: "AWG 숫자가 클수록 굵은 건가요, 얇은 건가요?", a: "숫자가 클수록 얇습니다. AWG 10은 AWG 20보다 훨씬 굵으며, 6단위 증가할 때마다 단면적이 약 절반이 됩니다." },
      { q: "AWG와 mm²는 어떻게 대응되나요?", a: "AWG 12는 약 3.31mm², AWG 10은 약 5.26mm²입니다. 국내 기준은 mm²를 쓰므로, 수입 제품 규격을 비교할 때 환산이 필요합니다." },
      { q: "전선 굵기는 허용전류만 보고 정하면 되나요?", a: "아닙니다. 허용전류와 전압강하를 모두 만족해야 합니다. 긴 배선에서는 전압강하가 더 엄격한 조건이 되므로 두 계산기를 함께 돌리세요." },
    ],
    en: [
      { q: "Does a higher AWG number mean thicker wire?", a: "No — higher numbers are thinner. AWG 10 is far thicker than AWG 20, and every six steps roughly halves the cross-section." },
      { q: "How do AWG and mm² correspond?", a: "AWG 12 is about 3.31 mm², AWG 10 about 5.26 mm². Metric countries specify mm², so convert when comparing imported specs." },
      { q: "Can I size wire by ampacity alone?", a: "No. It must satisfy both ampacity and voltage drop. On long runs voltage drop becomes the tighter constraint, so run both calculators." },
    ],
  },
  "stress-strain": {
    ko: [
      { q: "응력과 변형률은 어떤 관계인가요?", a: "탄성 구간에서는 응력 = 탄성계수 × 변형률(후크 법칙)이 성립합니다. 항복점을 넘으면 관계가 비선형이 되고 영구 변형이 남습니다." },
      { q: "탄성계수는 재료마다 다른가요?", a: "크게 다릅니다. 강은 약 200GPa, 알루미늄은 약 69GPa, 콘크리트는 20~30GPa 수준입니다. 같은 하중에서도 변형량이 몇 배씩 차이납니다." },
      { q: "안전율은 어떻게 적용하나요?", a: "허용응력 = 항복강도 ÷ 안전율로 정합니다. 구조 기준과 하중 종류에 따라 요구 안전율이 다르므로, 계산 결과를 그대로 설계에 쓰지 마세요." },
    ],
    en: [
      { q: "How do stress and strain relate?", a: "In the elastic range, stress = modulus × strain (Hooke's law). Past yield the relationship becomes nonlinear and permanent deformation remains." },
      { q: "Does the elastic modulus vary by material?", a: "Widely. Steel is about 200 GPa, aluminum about 69 GPa, concrete 20–30 GPa. The same load produces deformations that differ several-fold." },
      { q: "How is safety factor applied?", a: "Allowable stress = yield strength ÷ safety factor. Required factors differ by code and load type, so never take the raw result straight into a design." },
    ],
  },
  "euler-buckling": {
    ko: [
      { q: "오일러 좌굴식은 언제 적용되나요?", a: "세장비가 큰 압축재의 탄성 좌굴에 적용됩니다. 세장비가 작으면 항복이 먼저 일어나므로 오일러식이 과대평가가 됩니다." },
      { q: "지지 조건에 따라 값이 달라지나요?", a: "달라집니다. 양단 힌지는 유효길이 계수 K=1, 양단 고정은 0.5, 일단 고정·타단 자유는 2입니다. K가 커지면 좌굴 하중이 제곱에 반비례해 급감합니다." },
      { q: "단면 2차 모멘트는 어느 축으로 봐야 하나요?", a: "좌굴은 가장 약한 축에서 먼저 일어나므로 최소 I를 사용해야 합니다. 계산기는 최소값 기준 결과를 보여줍니다." },
    ],
    en: [
      { q: "When does Euler buckling apply?", a: "To elastic buckling of slender compression members. For stocky members yield occurs first, and the Euler formula overestimates capacity." },
      { q: "Do support conditions change the result?", a: "Yes. Pinned-pinned uses K = 1, fixed-fixed 0.5, fixed-free 2. Larger K cuts buckling load by its square." },
      { q: "Which axis moment of inertia should I use?", a: "Buckling happens about the weakest axis, so use the minimum I. The calculator reports results based on that minimum." },
    ],
  },
  "gear-ratio": {
    ko: [
      { q: "기어비가 크면 무엇이 변하나요?", a: "토크는 커지고 회전수는 줄어듭니다. 이상적인 경우 출력은 일정하므로, 토크와 속도의 곱이 유지되는 방향으로 맞바뀝니다." },
      { q: "감속비와 증가비는 어떻게 구분하나요?", a: "구동 기어보다 피동 기어의 이빨 수가 많으면 감속, 적으면 증속입니다. 계산기에 두 이빨 수를 넣으면 비율과 출력 회전수를 함께 보여줍니다." },
      { q: "실제 효율은 100%인가요?", a: "아닙니다. 스퍼기어는 단당 1~2%, 웜기어는 30~50% 손실이 발생합니다. 정밀한 동력 계산에는 효율을 곱해야 합니다." },
    ],
    en: [
      { q: "What changes when the gear ratio increases?", a: "Torque rises and speed falls. Ideally power stays constant, so torque and speed trade against each other." },
      { q: "How do I tell reduction from overdrive?", a: "More teeth on the driven gear than the driver means reduction; fewer means overdrive. Enter both tooth counts to see the ratio and output speed." },
      { q: "Is real efficiency 100%?", a: "No. Spur gears lose 1–2% per mesh while worm drives lose 30–50%. Multiply by efficiency for accurate power calculations." },
    ],
  },
  "mannings-equation": {
    ko: [
      { q: "조도계수 n은 어떻게 정하나요?", a: "관 재질과 상태에 따라 달라집니다. 신품 콘크리트는 0.012~0.014, 노후관은 0.015 이상, 자연 하천은 0.025~0.04 수준입니다. 상태가 나쁠수록 큰 값을 씁니다." },
      { q: "경사가 0이면 유속도 0인가요?", a: "식상으로는 그렇습니다. 실제로는 물이 고여 흐르지 않는 상태가 되며, 배관 설계에서는 최소 유속(0.6~1.0m/s)을 확보해 침전을 막습니다." },
      { q: "만관과 부분 만관은 어떻게 다른가요?", a: "만관은 관이 가득 찬 상태로 수리반경이 최대입니다. 부분 만관은 수심에 따라 수리반경이 달라지므로, 실제 운전 수위를 입력해야 정확합니다." },
    ],
    en: [
      { q: "How do I choose Manning's n?", a: "It depends on material and condition. New concrete runs 0.012–0.014, aged pipe above 0.015, natural channels 0.025–0.04. Use larger values for rougher conditions." },
      { q: "Does zero slope mean zero velocity?", a: "Formally yes, and in practice water simply stands. Pipe design therefore targets a minimum velocity of 0.6–1.0 m/s to prevent sedimentation." },
      { q: "Full flow vs partial flow?", a: "Full flow fills the pipe and maximizes hydraulic radius. Partial flow varies with depth, so enter the actual operating level for accuracy." },
    ],
  },
  "ideal-gas": {
    ko: [
      { q: "이상기체 법칙은 실제 기체에 써도 되나요?", a: "저압·고온에서는 오차가 작아 실용적입니다. 고압이거나 임계점 근처에서는 압축인자를 적용한 실제기체 식을 써야 합니다." },
      { q: "온도는 반드시 켈빈으로 넣어야 하나요?", a: "네. PV=nRT에서 T는 절대온도입니다. 섭씨를 그대로 넣으면 결과가 완전히 틀어지므로 273.15를 더해 변환하세요." },
      { q: "R 값은 얼마를 쓰나요?", a: "단위계에 따라 다릅니다. SI에서는 8.314 J/(mol·K), 압력을 atm·부피를 L로 쓰면 0.08206 L·atm/(mol·K)입니다. 단위를 섞으면 R도 바꿔야 합니다." },
    ],
    en: [
      { q: "Can I use the ideal gas law for real gases?", a: "At low pressure and high temperature the error is small enough for practical use. Near the critical point or at high pressure, use a real-gas equation with a compressibility factor." },
      { q: "Must temperature be in kelvin?", a: "Yes. In PV = nRT, T is absolute. Entering Celsius skews everything, so add 273.15 first." },
      { q: "Which R value should I use?", a: "It follows your units. SI uses 8.314 J/(mol·K); with atm and liters use 0.08206 L·atm/(mol·K). Mixing units means changing R too." },
    ],
  },
  "pump-affinity": {
    ko: [
      { q: "상사법칙은 어떤 조건에서 성립하나요?", a: "같은 펌프에서 형상비가 유지되고 레이놀즈 수 변화가 무시할 수준일 때 성립합니다. 임펠러를 절단하거나 점성이 높은 유체에는 보정이 필요합니다." },
      { q: "회전수를 20% 낮추면 유량은?", a: "유량은 회전수에 정비례하므로 20% 감소합니다. 양정은 제곱(36% 감소), 동력은 세제곱(약 49% 감소)으로 줄어듭니다." },
      { q: "인버터 제어가 밸브 조절보다 유리한 이유는?", a: "밸브는 유량을 줄여도 회전수가 그대로라 동력이 크게 줄지 않습니다. 반면 회전수를 낮추면 동력이 세제곱으로 줄어 에너지 절감이 큽니다." },
    ],
    en: [
      { q: "When do the affinity laws hold?", a: "For the same pump with geometry preserved and Reynolds-number effects negligible. Trimming impellers or pumping viscous fluids requires correction." },
      { q: "What happens to flow if I cut speed 20%?", a: "Flow drops proportionally by 20%. Head falls with the square (about 36%) and power with the cube (about 49%)." },
      { q: "Why is inverter control better than throttling?", a: "Throttling reduces flow while speed stays high, so power barely falls. Lowering speed cuts power with the cube, delivering large energy savings." },
    ],
  },
  "code-explainer": {
    ko: [
      { q: "입력한 코드가 저장되나요?", a: "아니요. 코드는 브라우저 안에서만 처리되며 서버로 전송되거나 저장되지 않습니다. 사내 코드라도 붙여넣을 수 있지만, 극도로 민감한 정보는 마스킹을 권장합니다." },
      { q: "어떤 언어를 지원하나요?", a: "JavaScript·TypeScript·Python·Java·C++ 등 주요 언어의 문법 구조를 인식합니다. 언어를 지정하지 않으면 자동으로 추정합니다." },
      { q: "설명이 실제 동작과 다를 수 있나요?", a: "가능합니다. 난독화된 코드나 매크로가 많은 코드는 해석이 어긋날 수 있으므로, 실행 결과와 함께 검증하세요." },
    ],
    en: [
      { q: "Is my code stored anywhere?", a: "No. Code is processed entirely in your browser and never sent to or stored on a server. Internal code is safe to paste, though masking highly sensitive values is still wise." },
      { q: "Which languages are supported?", a: "It recognizes the syntax structure of major languages including JavaScript, TypeScript, Python, Java and C++. Without a selection it infers the language." },
      { q: "Can the explanation differ from actual behavior?", a: "Sometimes. Obfuscated or macro-heavy code can be misread, so verify against real execution results." },
    ],
  },
  "meeting-notes": {
    ko: [
      { q: "회의 내용이 외부로 전송되나요?", a: "아니요. 입력한 텍스트는 브라우저 안에서만 처리됩니다. 다만 회의록에는 민감한 정보가 많으므로, 공유 전에 인물·금액을 검토하세요." },
      { q: "어떤 형식으로 정리되나요?", a: "참석자·안건·결정사항·후속 조치로 구분해 정리합니다. 회의 종류에 따라 템플릿을 바꾸면 더 유용한 결과를 얻을 수 있습니다." },
      { q: "자동 요약 결과를 그대로 써도 되나요?", a: "초안으로 활용하고 반드시 검토하세요. 결정사항의 주체와 기한은 사람이 확인해야 오해가 없습니다." },
    ],
    en: [
      { q: "Is meeting content sent externally?", a: "No. Text is processed only in your browser. Meeting notes often contain sensitive material, so review names and figures before sharing." },
      { q: "How is the output structured?", a: "It separates attendees, agenda, decisions and action items. Switching templates by meeting type produces more useful results." },
      { q: "Can I use the summary as-is?", a: "Treat it as a draft and always review. Owners and deadlines for decisions need human confirmation to avoid misunderstanding." },
    ],
  },
  "prompt-generator": {
    ko: [
      { q: "좋은 프롬프트의 핵심은 무엇인가요?", a: "역할·맥락·과업·형식·제약을 명시하는 것입니다. 원하는 출력 형식을 예시로 보여주면 결과 편차가 크게 줄어듭니다." },
      { q: "프롬프트가 길수록 좋은가요?", a: "아닙니다. 불필요한 지시는 모델의 주의를 분산시킵니다. 필요한 제약만 남기고, 예시는 짧고 명확하게 넣으세요." },
      { q: "입력한 내용이 저장되나요?", a: "아니요. 브라우저에서만 처리되며 서버로 전송되지 않습니다. 사내 정보가 포함되면 공유 전에 검토하세요." },
    ],
    en: [
      { q: "What makes a good prompt?", a: "Specify role, context, task, format and constraints. Showing an example of the output format sharply reduces variance." },
      { q: "Is a longer prompt always better?", a: "No. Unnecessary instructions dilute the model's attention. Keep only the constraints you need, with short clear examples." },
      { q: "Is my input stored?", a: "No. It is processed in the browser and never sent to a server. Review before sharing if it contains internal information." },
    ],
  },
};
