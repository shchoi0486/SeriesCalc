import React from 'react';

interface Faq {
  q: string;
  a: string;
}

interface Editorial {
  intro: string[];
  bullets: { title: string; body: string }[];
  tip: string;
  faqs: Faq[];
}

const CONTENT: Record<string, { ko: Editorial; en: Editorial }> = {
  finance: {
    ko: {
      intro: [
        '대출, 저축, 세금, 연봉처럼 숫자를 잘못 이해하면 손해가 바로 돈으로 이어지는 영역이 금융입니다. 금리가 0.1%포인트만 달라도 30년 주택담보대출의 총이자는 수백만 원씩 벌어지고, 상환 방식을 원리금균등과 원금균등 중 무엇으로 고르느냐에 따라 초기 부담과 총비용이 완전히 달라집니다. 감이 아니라 계산으로 결정해야 하는 이유입니다.',
        'SeriesCalc 금융 계산기는 대출 이자·상환 스케줄, 복리·적금 시뮬레이션, 연봉 실수령액, 부가세·소득세, DTI·DSR 같은 대출 규제 지표까지 한곳에서 계산합니다. 입력값은 브라우저 안에서만 처리되므로 금액 같은 민감한 숫자를 서버에 전송하지 않습니다. 큰 결정을 앞두고 있다면 아래 계산기로 먼저 시뮬레이션하고, 관련 가이드 글에서 배경지식을 확인하세요.',
      ],
      bullets: [
        { title: '대출·상환', body: '대출 이자, 원금균등·원리금균등 상환, 중도상환수수료, DTI·DSR 계산기로 빌리기 전 총비용을 먼저 확정하세요.' },
        { title: '저축·투자', body: '복리, 적금·월복리, 주식 복리, CAGR 계산기로 시간에 따른 자산 성장을 비교하면 상품 선택이 명확해집니다.' },
        { title: '급여·세금', body: '연봉 실수령액, 주휴수당·연차, 퇴직금, 부가세·소득세 계산기로 세후 기준 실제 금액을 확인하세요.' },
      ],
      tip: '같은 금리라도 복리 주기(월복리 vs 연복리)와 세금(15.4% 이자소득세)이 결과를 바꾸므로, 비교할 때는 조건을 동일하게 맞추고 세후 금액으로 판단하세요.',
      faqs: [
        { q: '원리금균등과 원금균등 중 무엇이 유리한가요?', a: '총이자만 보면 원금균등이 항상 적습니다. 다만 초기 상환액이 크기 때문에 초반 현금흐름이 빠듯하다면 원리금균등이 현실적입니다. 대출 이자 계산기에서 두 방식을 같은 조건으로 돌려 총이자 차이와 월 부담을 함께 보세요.' },
        { q: 'DTI와 DSR은 무엇이 다른가요?', a: 'DTI는 주택담보대출 위주의 상환 부담을 보는 지표이고, DSR은 모든 금융권 대출의 연간 상환액을 소득과 비교하는 더 넓은 지표입니다. 규제 기준을 넘으면 대출 한도가 깎이므로 DSR 계산기로 미리 확인하는 것이 좋습니다.' },
        { q: '계산 결과가 은행 상담 결과와 다를 수 있나요?', a: '네, 우대금리 조건, 중도상환수수료 요율, 보증료, 세금 공제 같은 개별 조건이 반영되지 않기 때문입니다. 계산기는 상품 간 상대 비교와 대략의 예산 파악용으로 쓰고, 최종 실행 전에는 금융기관의 약정서를 반드시 확인하세요.' },
      ],
    },
    en: {
      intro: [
        'In finance, misunderstanding a number turns directly into lost money. A 0.1 percentage-point rate difference can move total interest on a 30-year mortgage by thousands of dollars, and choosing between equal-payment and equal-principal amortization changes both the early burden and the lifetime cost. These decisions should be made by calculation, not by gut feeling.',
        'SeriesCalc finance calculators cover loan interest and amortization schedules, compound-interest and savings simulations, take-home pay, VAT and income tax, plus regulatory ratios like DTI and DSR — all in one place. Your inputs are processed locally in the browser, so sensitive amounts are never sent to a server. Before any big decision, simulate first and read the related guides for background.',
      ],
      bullets: [
        { title: 'Loans & repayment', body: 'Use the loan interest, amortization, prepayment-fee, DTI and DSR calculators to lock in the true total cost before borrowing.' },
        { title: 'Savings & investing', body: 'Compare asset growth over time with compound-interest, installment-savings, stock-compound and CAGR calculators to pick products with confidence.' },
        { title: 'Pay & taxes', body: 'Check after-tax reality with take-home pay, allowance, severance, VAT and income-tax calculators.' },
      ],
      tip: 'Even at the same rate, compounding frequency (monthly vs yearly) and taxes change the outcome — keep conditions identical and judge by after-tax amounts.',
      faqs: [
        { q: 'Equal payment vs equal principal — which is better?', a: 'Equal principal always costs less total interest, but starts with higher payments. If early cash flow is tight, equal payment is the practical choice. Run both in the loan calculator under identical conditions and compare total interest against monthly burden.' },
        { q: 'What is the difference between DTI and DSR?', a: 'DTI looks mainly at mortgage repayment burden, while DSR compares all annual debt repayments against income — a broader regulatory metric. Exceeding the threshold cuts your borrowing limit, so check the DSR calculator in advance.' },
        { q: 'Can results differ from what my bank quotes?', a: 'Yes — preferential-rate conditions, prepayment penalties, guarantee fees and tax deductions vary by case. Use the calculators for relative comparison and budgeting, and always verify the final loan agreement with the lender.' },
      ],
    },
  },
  conversion: {
    ko: {
      intro: [
        '길이·무게·온도·압력·데이터 용량처럼 단위를 잘못 환산하면 설계 오류, 구매 실수, 과제 감점으로 이어집니다. 특히 해외 직구(인치·파운드), 요리(컵·온스), IT(바이트·비트)처럼 서로 다른 단위계가 섞이는 상황에서 암산은 위험합니다.',
        'SeriesCalc 단위 변환기는 길이, 무게, 부피, 온도, 속도, 에너지, 전력, 압력, 데이터 크기, 시간대, 통화, 한국 의류·신발 사이즈까지 한 화면에서 즉시 변환합니다. 자주 쓰는 변환은 즐겨찾기처럼 반복 사용하고, 헷갈리는 단위의 정의는 각 계산기 하단의 설명에서 확인하세요.',
      ],
      bullets: [
        { title: '일상 변환', body: '길이·무게·온도·부피 변환기로 요리, 직구, 여행 준비를 실수 없이 처리하세요.' },
        { title: '전문 변환', body: '압력(MPa·bar·psi), 에너지·전력, 데이터 크기 변환으로 규격서와 문서 작업을 정확히 하세요.' },
        { title: '생활 밀착형', body: '시간대 변환, 통화 변환, 한국 의류·신발 사이즈 변환으로 해외 일정과 쇼핑을 편하게 준비하세요.' },
      ],
      tip: '온도처럼 영점이 다른 단위(°C/°F)는 단순 곱셈이 아니라 덧셈·뺄셈이 포함되므로 공식 확인이 필수입니다. 각 변환기 하단의 공식을 참고하세요.',
      faqs: [
        { q: '1인치는 정확히 몇 cm인가요?', a: '국제 표준으로 1인치는 정확히 2.54cm입니다. 길이 변환기에 1을 입력하면 inch→cm를 포함한 모든 단위를 동시에 확인할 수 있습니다.' },
        { q: '파운드(lb)와 킬로그램(kg)은 어떻게 바꾸나요?', a: '1파운드는 약 0.4536kg입니다. 무게 변환기에서 소수점 자릿수를 확인하며 변환하세요. 체중계·수하물 규정처럼 정밀도가 중요한 곳에서는 반올림 단위를 주의하세요.' },
        { q: '데이터 크기에서 1GB는 1000MB인가요, 1024MB인가요?', a: '저장장치 업계는 1000 단위(십진, GB)를, 운영체제와 메모리는 1024 단위(이진, GiB)를 쓰는 경우가 많습니다. 데이터 크기 변환기에서 두 기준을 구분해 표시하므로 용도에 맞게 고르세요.' },
      ],
    },
    en: {
      intro: [
        'Misconverting length, weight, temperature, pressure or data sizes leads to design errors, bad purchases and lost marks on assignments. Mental math is risky wherever unit systems mix — inches and pounds for overseas shopping, cups and ounces for cooking, bytes and bits for IT.',
        'SeriesCalc converters instantly translate length, weight, volume, temperature, speed, energy, power, pressure, data size, time zones, currency, and Korean clothing and shoe sizes. Reuse frequent conversions like bookmarks, and check each converter note for the exact definition of tricky units.',
      ],
      bullets: [
        { title: 'Everyday conversion', body: 'Handle cooking, overseas shopping and travel prep without mistakes using length, weight, temperature and volume converters.' },
        { title: 'Professional conversion', body: 'Work with spec sheets accurately using pressure (MPa, bar, psi), energy, power and data-size converters.' },
        { title: 'Lifestyle helpers', body: 'Plan trips and shopping with timezone, currency, and Korean clothing and shoe size converters.' },
      ],
      tip: 'Units with different zero points such as °C/°F need addition and subtraction, not just multiplication — always check the formula shown under each converter.',
      faqs: [
        { q: 'How many centimeters are in one inch?', a: 'By international standard, one inch is exactly 2.54 cm. Enter 1 in the length converter to see inch-to-cm alongside every other unit at once.' },
        { q: 'How do I convert pounds (lb) to kilograms?', a: 'One pound is about 0.4536 kg. Convert in the weight converter while watching the decimal precision — rounding matters for scales and luggage limits.' },
        { q: 'Is 1 GB 1000 MB or 1024 MB?', a: 'Storage makers typically use decimal (1000-based, GB) while operating systems and memory use binary (1024-based, GiB). The data-size converter shows both standards separately so you can pick the right one.' },
      ],
    },
  },
  life: {
    ko: {
      intro: [
        'BMI, 칼로리, 날짜 계산, 만 나이, 디데이처럼 자주 찾게 되는 생활 계산을 모았습니다. 건강 관리의 시작은 현재 상태를 숫자로 아는 것이고, 일정 관리의 시작은 날짜 사이의 간격을 정확히 세는 것입니다.',
        'SeriesCalc 생활 계산기는 건강(BMI·칼로리·체지방), 날짜(디데이·기념일·만 나이·날짜 차이), 쇼핑(할인·부가세), 도구(QR·비밀번호·색상·타자)까지 일상 잡무를 줄여줍니다. 결과 해석과 기준표가 함께 제공되므로 숫자 뒤의 의미까지 확인하세요.',
      ],
      bullets: [
        { title: '건강', body: 'BMI·칼로리·체지방 계산기로 현재 상태와 목표 섭취량을 숫자로 관리하세요.' },
        { title: '날짜·시간', body: '디데이, 기념일, 만나이, 날짜 차이 계산기로 근속·임대·프로젝트 기간을 정확히 세세요.' },
        { title: '생활 도구', body: 'QR 생성, 비밀번호 생성, 할인율, 텍스트 비교 같은 자잘한 작업을 브라우저에서 즉시 해결하세요.' },
      ],
      tip: 'BMI는 근육량을 구분하지 못하므로 운동선수·임산부는 허리둘레·체지방률과 함께 판단하세요. 계산기 결과 하단의 기준표를 참고하면 해석이 쉽습니다.',
      faqs: [
        { q: 'BMI 정상 범위는 어떻게 되나요?', a: 'WHO 기준 18.5~24.9가 정상이며, 아시아 기준으로는 18.5~22.9를 적용하기도 합니다. BMI 계산기에서 두 기준의 판정을 함께 보여주므로 결과 하단의 표를 확인하세요.' },
        { q: '만 나이는 어떻게 계산되나요?', a: '생일 기준으로 돌이 지났는지 따져 계산합니다. 만나이 계산기에 생년월일을 입력하면 세는나이와 만나이를 동시에 보여줍니다.' },
        { q: '입력한 개인정보가 저장되나요?', a: '아니요. 키·몸무게 같은 입력값은 브라우저 안에서만 처리되고 서버로 전송되거나 저장되지 않습니다.' },
      ],
    },
    en: {
      intro: [
        'Everyday calculators you reach for often: BMI, calories, date math, age, and day counters. Managing health starts with knowing your current numbers; managing schedules starts with counting exact intervals between dates.',
        'SeriesCalc lifestyle calculators cover health (BMI, calories, body fat), dates (countdowns, anniversaries, age, date differences), shopping (discounts, sales tax), and handy tools (QR codes, passwords, colors, typing tests). Each result ships with interpretation tables so you understand what the number means.',
      ],
      bullets: [
        { title: 'Health', body: 'Track your status and calorie targets numerically with BMI, calorie and body-fat calculators.' },
        { title: 'Dates & time', body: 'Count tenure, leases and project periods exactly with countdown, anniversary, age and date-difference calculators.' },
        { title: 'Daily tools', body: 'Handle small jobs instantly in the browser — QR codes, passwords, discounts, text comparison.' },
      ],
      tip: 'BMI cannot distinguish muscle mass, so athletes and pregnant users should judge together with waist circumference and body-fat percentage. The reference tables under each result make interpretation easy.',
      faqs: [
        { q: 'What is the normal BMI range?', a: 'WHO defines 18.5–24.9 as normal; Asian standards often use 18.5–22.9. The BMI calculator shows verdicts under both standards — see the table under the result.' },
        { q: 'How is international age calculated?', a: 'It counts whether your birthday has passed this year. Enter your birth date in the age calculator to see counting age and international age side by side.' },
        { q: 'Is my personal input stored?', a: 'No. Values like height and weight are processed only inside your browser and are never sent to or stored on a server.' },
      ],
    },
  },
  science: {
    ko: {
      intro: [
        '힘·속도·에너지 같은 물리량, 몰농도·희석 같은 화학량, 방정식·통계 같은 수학 계산은 공식 하나를 틀리면 전부 틀립니다. 단위까지 함께 검증해 주는 계산기가 필요한 이유입니다.',
        'SeriesCalc 과학 계산기는 물리(힘·속도·운동에너지·토크), 화학(몰농도·몰질량·용액 희석), 수학(분수·백분율·표준편차·삼각형)을 공식·단계별 풀이와 함께 제공합니다. 과제 검산, 실험 데이터 정리, 시험 대비에 쓰고, 풀이 과정은 BlockMath 수식으로 확인할 수 있습니다.',
      ],
      bullets: [
        { title: '물리', body: '힘(F=ma), 운동에너지, 속도, 토크 계산기로 역학 기본량을 검증하세요.' },
        { title: '화학', body: '몰농도, 몰질량, 용액 희석 계산기로 실험 준비와 농도 계산 실수를 줄이세요.' },
        { title: '수학', body: '분수, 백분율, 표준편차, 삼각형 계산기로 과제 검산과 통계 정리를 빠르게 하세요.' },
      ],
      tip: '과학 계산에서는 숫자보다 단위가 먼저입니다. kg과 g, m/s와 km/h를 섞어 입력했는지 결과 전에 단위를 한 번 더 확인하세요.',
      faqs: [
        { q: 'F=ma에서 단위는 어떻게 맞추나요?', a: '질량은 kg, 가속도는 m/s²로 입력하면 힘은 뉴턴(N)으로 나옵니다. g이나 km/h² 같은 단위를 썼다면 SI 단위로 먼저 환산하세요. 힘 계산기 하단의 단위 변환 요령을 참고하세요.' },
        { q: '몰농도(M)와 몰랄농도(m)는 다른가요?', a: '다릅니다. 몰농도는 용액 1L당 용질의 몰수이고, 몰랄농도는 용매 1kg당 용질의 몰수입니다. 몰농도 계산기는 전자 기준이며 온도 변화에 따라 부피가 달라질 수 있습니다.' },
        { q: '과제나 시험에 계산 과정을 그대로 써도 되나요?', a: '계산기는 검산용입니다. 풀이 과정은 참고하되, 제출 답안은 교재의 기호·유효숫자 규칙에 맞게 직접 정리하세요.' },
      ],
    },
    en: {
      intro: [
        'Physics quantities like force, velocity and energy, chemistry quantities like molarity and dilution, and math such as equations and statistics — one wrong formula ruins everything. That is why you need calculators that verify units alongside numbers.',
        'SeriesCalc science calculators cover physics (force, velocity, kinetic energy, torque), chemistry (molarity, molar mass, solution dilution), and math (fractions, percentages, standard deviation, triangles) with formulas and step-by-step solutions. Use them to check homework, organize lab data and prepare for exams; solution steps render as BlockMath equations.',
      ],
      bullets: [
        { title: 'Physics', body: 'Verify mechanics basics with force (F=ma), kinetic-energy, velocity and torque calculators.' },
        { title: 'Chemistry', body: 'Cut lab-prep and concentration errors with molarity, molar-mass and dilution calculators.' },
        { title: 'Math', body: 'Check homework and summarize statistics fast with fraction, percentage, standard-deviation and triangle calculators.' },
      ],
      tip: 'In science, units come before numbers. Double-check that you did not mix kg with g or m/s with km/h before trusting a result.',
      faqs: [
        { q: 'How do units work in F = ma?', a: 'Enter mass in kg and acceleration in m/s² to get force in newtons (N). Convert units like g or km/h² to SI first — see the unit-conversion tips under the force calculator.' },
        { q: 'Is molarity (M) different from molality (m)?', a: 'Yes. Molarity is moles of solute per liter of solution; molality is moles per kilogram of solvent. The molarity calculator uses the former, and note that volume shifts with temperature.' },
        { q: 'Can I copy the solution steps into homework?', a: 'Use calculators for verification. Reference the steps, but write submitted answers in your textbook notation and significant-figure rules.' },
      ],
    },
  },
  engineering: {
    ko: {
      intro: [
        '펌프·배관·열교환기·구조물처럼 공학 계산은 가정과 적용 범위를 먼저 이해해야 합니다. 같은 Darcy-Weisbach 식도 층류와 난류에서 마찰계수 구하는 법이 다르고, Barlow 공식은 얇은 원통 가정을 벗어나면 그대로 쓸 수 없습니다. 숫자를 내기 전에 식의 한계를 읽는 습관이 중요합니다.',
        'SeriesCalc 공학 계산기는 유체(NPSH·배관 마찰·레이놀즈수·탱크 용량), 열(열전달·LMTD·이슬점·습공기), 전기(옴의 법칙·전압강하·교류전력), 재료·구조(보 처짐·응력·좌굴·U값)까지 실무 검토용 도구를 제공합니다. 각 페이지의 공식·예시·주의사항을 먼저 읽고 입력 단위계(Metric/Imperial)를 맞추세요.',
      ],
      bullets: [
        { title: '유체·배관', body: 'NPSH, 배관 마찰, 탱크 용량, 펌프 동력 계산으로 캐비테이션과 양정을 사전 검토하세요.' },
        { title: '열·공조', body: '열전달, LMTD, 이슬점, 습공기 계산으로 열교환기 용량과 결로 위험을 판단하세요.' },
        { title: '전기·구조', body: '옴의 법칙·전압강하, 보 처짐·응력·U값 계산으로 설계 1차 검증을 빠르게 하세요.' },
      ],
      tip: '공학 계산기는 정적·정상상태 가정이며 안전계수를 대신하지 않습니다. 결과는 1차 검토용으로 쓰고 최종 설계는 해당 규격(ASME·KS 등)과 전문가 검토를 따르세요.',
      faqs: [
        { q: 'NPSHa와 NPSHr 중 무엇을 맞춰야 하나요?', a: '시스템이 제공하는 NPSHa가 펌프 요구치인 NPSHr보다 커야 하며, 실무에서는 1.3배 이상(또는 0.5m 이상)의 여유를 둡니다. NPSH 계산기에서 탱크 위치·온도·마찰 손실을 반영해 확인하세요.' },
        { q: 'Metric과 Imperial 단위를 섞어 써도 되나요?', a: '안 됩니다. MPa·mm 조합과 psi·inch 조합을 섞으면 결과가 완전히 달라집니다. 계산기 상단의 단위계를 하나로 통일하고 입력하세요.' },
        { q: '이 계산기로 설계 도장을 대신할 수 있나요?', a: '없습니다. 계산기는 교육·예비 검토용이며, 법적 효력이 있는 설계는 자격자와 승인 절차가 필요합니다. 주의사항 섹션의 한계를 반드시 읽어보세요.' },
      ],
    },
    en: {
      intro: [
        'Engineering math — pumps, piping, heat exchangers, structures — demands that you understand assumptions and scope first. The same Darcy-Weisbach equation needs different friction-factor treatment in laminar vs turbulent flow, and Barlow\'s formula cannot be used as-is beyond thin-cylinder assumptions. Read the limits before trusting a number.',
        'SeriesCalc engineering calculators serve fluids (NPSH, pipe friction, Reynolds number, tank volume), heat (heat transfer, LMTD, dew point, psychrometrics), electrical (Ohm\'s law, voltage drop, AC power), and materials and structures (beam deflection, stress, buckling, U-values). Read each page\'s formulas, examples and cautions first, and keep the unit system (Metric/Imperial) consistent.',
      ],
      bullets: [
        { title: 'Fluids & piping', body: 'Review cavitation and pump head early with NPSH, pipe-friction, tank-volume and pump-power calculators.' },
        { title: 'Heat & HVAC', body: 'Judge exchanger duty and condensation risk with heat-transfer, LMTD, dew-point and psychrometric calculators.' },
        { title: 'Electrical & structural', body: 'Run fast first-pass design checks with Ohm\'s-law, voltage-drop, beam-deflection, stress and U-value calculators.' },
      ],
      tip: 'Engineering calculators assume steady, ideal conditions and never replace safety factors. Treat results as first-pass review; final designs must follow the applicable codes (ASME, KS, etc.) with professional review.',
      faqs: [
        { q: 'Should I match NPSHa or NPSHr?', a: 'The system-provided NPSHa must exceed the pump-required NPSHr — in practice by 1.3× or more (or at least 0.5 m of margin). Verify with the NPSH calculator including tank position, temperature and friction losses.' },
        { q: 'Can I mix Metric and Imperial inputs?', a: 'No. Mixing MPa·mm with psi·inch combinations completely changes results. Unify the unit system at the top of the calculator before entering values.' },
        { q: 'Can these calculators replace stamped designs?', a: 'No. They are for education and preliminary review; legally effective designs require qualified professionals and approval procedures. Always read the limitations section.' },
      ],
    },
  },
  'ai-tools': {
    ko: {
      intro: [
        'Base64·URL 인코딩, JSON 정리, 텍스트 요약, 이미지 변환처럼 개발과 문서 작업에서 반복되는 잡무를 브라우저에서 바로 처리하는 도구 모음입니다. 별도 프로그램 설치 없이 열려 있는 탭에서 해결하는 것이 목표입니다.',
        '모든 처리는 서버 전송 없이 브라우저 안에서 이뤄지므로 토큰·키 같은 민감한 문자열도 안심하고 다룰 수 있습니다. 단, Base64는 암호화가 아니라 인코딩이므로 보안 용도로 단독 사용하지 마세요. 각 도구의 사용법과 예시는 페이지 하단에서 확인할 수 있습니다.',
      ],
      bullets: [
        { title: '인코딩·변환', body: 'Base64·URL 인코더/디코더, JSON·XML·YAML 생성/정리로 데이터 포맷 작업을 끝내세요.' },
        { title: '텍스트', body: '텍스트 요약, 모스부호, 회의록·프롬프트 정리로 문서 작업을 줄이세요.' },
        { title: '이미지', body: '이미지 크기·포맷 변환과 리사이저로 블로그·문서용 이미지를 가볍게 만드세요.' },
      ],
      tip: 'JSON·JWT·데이터 URI를 다룰 때는 인코딩 전후 길이가 약 33% 늘어나는(Base64) 점을 감안해 크기 제한을 확인하세요.',
      faqs: [
        { q: 'Base64는 암호화인가요?', a: '아닙니다. 누구나 디코딩할 수 있는 인코딩일 뿐입니다. 비밀번호·토큰 보호에는 HTTPS와 적절한 암호화를 함께 사용하세요.' },
        { q: '입력한 텍스트가 서버에 저장되나요?', a: '아니요. 모든 변환은 브라우저 안에서 처리되며 입력값이 서버로 전송되거나 저장되지 않습니다.' },
        { q: '이미지 변환 시 화질이 떨어지나요?', a: '포맷·압축률 설정에 따라 달라집니다. 리사이저에서 원본을 유지한 채 사본으로 실험한 뒤 최종본을 저장하는 것을 권장합니다.' },
      ],
    },
    en: {
      intro: [
        'A toolbox for repetitive dev and documentation chores — Base64 and URL encoding, JSON cleanup, text summarization, image conversion — handled right in the browser tab with no installs.',
        'Everything runs locally with no server transmission, so even sensitive strings like tokens and keys stay safe. Note that Base64 is encoding, not encryption — never rely on it alone for security. Usage steps and examples live at the bottom of each tool page.',
      ],
      bullets: [
        { title: 'Encode & convert', body: 'Finish data-format work with Base64/URL encoders and decoders plus JSON, XML and YAML generators and prettifiers.' },
        { title: 'Text', body: 'Cut document work with summarizers, Morse code, and meeting-note and prompt helpers.' },
        { title: 'Images', body: 'Lighten blog and document images with resizers and format converters.' },
      ],
      tip: 'When handling JSON, JWTs or data URIs, remember Base64 inflates size by about 33% — check size limits before embedding.',
      faqs: [
        { q: 'Is Base64 encryption?', a: 'No — it is an encoding anyone can decode. Pair HTTPS with proper encryption to protect passwords and tokens.' },
        { q: 'Is my input text stored on a server?', a: 'No. All conversions run inside your browser; inputs are never transmitted to or stored on a server.' },
        { q: 'Does image conversion lose quality?', a: 'It depends on format and compression settings. Experiment on a copy while keeping the original, then save the final version.' },
      ],
    },
  },
  game: {
    ko: {
      intro: [
        'DPS, 기대 피해량, 확률처럼 게임 플레이와 밸런싱 판단에 필요한 숫자를 계산하는 도구 모음입니다. 스펙업 우선순위를 정하거나 공략 글을 검증할 때 감 대신 수치로 비교하세요.',
        'SeriesCalc 게임 계산기는 DPS 시뮬레이션과 확률 계산을 제공합니다. 패치로 계수가 바뀌면 입력값만 갱신하면 되므로, 즐겨찾는 게임의 스펙 비교용으로 반복 사용하기 좋습니다.',
      ],
      bullets: [
        { title: 'DPS', body: '공격력·공속·치명타를 입력해 초당 피해량을 비교하고 세팅 우선순위를 정하세요.' },
        { title: '확률', body: '강화·뽑기 같은 확률 이벤트의 기대값을 계산해 과금·파밍 계획을 세우세요.' },
      ],
      tip: '게임 공식은 패치로 자주 바뀝니다. 계산 전 최신 패치 노트의 계수를 확인하고 입력값에 반영하세요.',
      faqs: [
        { q: 'DPS 계산기는 어떤 게임에 쓸 수 있나요?', a: '공격력·공격속도·치명타 구조가 있는 대부분의 RPG에 응용할 수 있습니다. 게임별 고유 계수(방어력 공식 등)는 입력 전에 확인하세요.' },
        { q: '계산 결과가 실제와 다를 수 있나요?', a: '네. 실전에는 버프 타이밍, 적 방어력, 네트워크 지연 같은 변수가 개입합니다. 계산기는 세팅 간 상대 비교용으로 활용하세요.' },
      ],
    },
    en: {
      intro: [
        'Numbers for play and balance decisions — DPS, expected damage, probabilities. Compare builds and verify guide claims with figures instead of feelings when setting upgrade priorities.',
        'SeriesCalc game calculators offer DPS simulation and probability math. When a patch changes coefficients, just update the inputs — handy for repeated build comparisons in your favorite games.',
      ],
      bullets: [
        { title: 'DPS', body: 'Enter attack, attack speed and crit to compare damage per second and prioritize gear.' },
        { title: 'Probability', body: 'Compute expected values of enhancement and gacha events to plan spending and farming.' },
      ],
      tip: 'Game formulas change with patches. Check the latest patch-note coefficients and reflect them in your inputs before calculating.',
      faqs: [
        { q: 'Which games does the DPS calculator fit?', a: 'Most RPGs with attack, attack-speed and crit mechanics. Verify game-specific factors (like defense formulas) before entering values.' },
        { q: 'Can results differ from real gameplay?', a: 'Yes — buff timing, enemy defense and network latency all intervene. Use the calculator for relative build comparison.' },
      ],
    },
  },
  others: {
    ko: {
      intro: [
        '난수·문자열 생성, QR·인보이스, 서브넷·IP 조회, 속도 측정처럼 분류하기 애매하지만 자주 필요한 실용 도구를 모았습니다. 필요할 때 검색으로 찾아 바로 쓰는 것이 가장 빠릅니다.',
        '생성된 값은 새로고침하면 사라지는 일회성(BMI 같은 기록형과 달리)이므로, 필요한 결과는 그 자리에서 복사·저장하세요. 네트워크 정보 조회 결과는 대략의 위치·회선 추정치이며 법적 증빙용이 아닙니다.',
      ],
      bullets: [
        { title: '생성기', body: '난수·문자열·이메일·비밀번호·QR·인보이스 생성으로 테스트 데이터와 실물을 빠르게 만드세요.' },
        { title: '네트워크', body: '서브넷 계산, IP 조회, 속도 측정으로 네트워크 구성과 회선 상태를 점검하세요.' },
      ],
      tip: '보안용 토큰·비밀번호는 생성 후 안전한 곳에 보관하세요. 브라우저를 닫으면 기록이 유지되지 않습니다.',
      faqs: [
        { q: '생성된 비밀번호는 안전한가요?', a: '브라우저 내 난수로 생성되며 서버에 전송되지 않습니다. 다만 중요한 계정은 12자 이상·문자 종류 혼합을 권장합니다.' },
        { q: 'IP 조회 결과는 정확한가요?', a: 'IP 기반 위치·통신사 정보는 대략의 추정치이며 VPN·프록시 사용 시 실제와 다를 수 있습니다.' },
      ],
    },
    en: {
      intro: [
        'Practical tools that defy categories but get used often — random and string generators, QR codes, invoices, subnet and IP lookups, speed tests. Searching and using on the spot is fastest.',
        'Generated values are one-off (unlike record-type tools): copy or save results immediately because a refresh clears them. Network lookup results are rough location and line estimates, not legal evidence.',
      ],
      bullets: [
        { title: 'Generators', body: 'Spin up test data and real artifacts fast — random numbers, strings, emails, passwords, QR codes, invoices.' },
        { title: 'Network', body: 'Check setups and line health with subnet math, IP lookup and speed tests.' },
      ],
      tip: 'Store security tokens and passwords somewhere safe after generating — history does not persist once the browser closes.',
      faqs: [
        { q: 'Are generated passwords safe?', a: 'They are generated with in-browser randomness and never sent to a server. Still, use 12+ characters with mixed character types for important accounts.' },
        { q: 'How accurate is IP lookup?', a: 'IP-based location and ISP data are rough estimates and can differ from reality behind VPNs or proxies.' },
      ],
    },
  },
};

interface Props {
  categoryId: string;
  locale: string;
}

export default function CategoryEditorial({ categoryId, locale }: Props) {
  const isKo = locale === 'ko';
  const data = CONTENT[categoryId]?.[isKo ? 'ko' : 'en'];
  if (!data) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="mt-14 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <section className="rounded-2xl border bg-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          {isKo ? '이 카테고리 계산기 활용 가이드' : 'How to use these calculators'}
        </h2>
        {data.intro.map((p, i) => (
          <p key={i} className="text-sm sm:text-base leading-relaxed text-muted-foreground">{p}</p>
        ))}
        <ul className="space-y-3 pt-1">
          {data.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm sm:text-base">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">{i + 1}</span>
              <div>
                <p className="font-semibold text-foreground">{b.title}</p>
                <p className="mt-0.5 text-muted-foreground">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="rounded-lg bg-muted/60 px-4 py-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {data.tip}
        </p>
      </section>
      <section className="mt-6 rounded-2xl border bg-card p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          {isKo ? '자주 묻는 질문' : 'Frequently asked questions'}
        </h2>
        <div className="space-y-4">
          {data.faqs.map((f, i) => (
            <div key={i}>
              <p className="font-semibold text-foreground text-sm sm:text-base">{f.q}</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
