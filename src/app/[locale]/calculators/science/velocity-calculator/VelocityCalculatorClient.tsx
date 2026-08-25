'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";
import FaqItem from "@/components/calculators/FaqItem";

const infoSection = (isKo: boolean) => {
  const L = (ko: string, en: string) => (isKo ? ko : en);
  return {
  calculatorDescription: (
    <div className="space-y-4">
      <p>
        <strong>{L('속도 계산기', 'Velocity Calculator')}</strong>{L('는 물체의 이동 속도와 가속도를 정확하게 계산하는 필수적인 물리학 도구입니다. 이 계산기는 ', ' is an essential physics tool that accurately calculates an object’s speed and acceleration. It covers ')}<strong>{L('평균 속도', 'average velocity')}</strong>{L('와 ', ' and ')}<strong>{L('가속도', 'acceleration')}</strong>{L(' 두 가지 핵심 개념을 다루며, 일상생활부터 전문 분야까지 폭넓게 활용됩니다.', ' — two core concepts widely used from everyday life to specialized fields.')}
      </p>
      <p>
        <strong>{L('속도(velocity)', 'Velocity')}</strong>{L('는 물체의 위치 변화율로, 단위 시간당 이동하는 거리를 나타냅니다. 속도의 표준 단위는 ', ' is the rate of change of an object’s position, representing the distance traveled per unit time. Its standard unit is ')}<strong>{L('미터 매 초(m/s)', 'meters per second (m/s)')}</strong>{L('이며, 자동차의 속도, 달리기 속도, 바람의 속도 등 일상생활에서 매우 빈번하게 사용되는 물리량입니다. 속도는 방향을 포함한 벡터량으로, 동일한 속력이라도 방향이 다르면 서로 다른 속도가 됩니다.', ', and is a physical quantity used very frequently in daily life such as car speed, running speed, and wind speed. Velocity is a vector quantity that includes direction, so the same speed with a different direction is a different velocity.')}
      </p>
      <p>
        <strong>{L('가속도(acceleration)', 'Acceleration')}</strong>{L('는 속도의 변화율로, 단위 시간당 속도가 얼마나 변하는지를 나타냅니다. 가속도의 단위는 ', ' is the rate of change of velocity, indicating how much the velocity changes per unit time. Its unit is ')}<strong>{L('미터 매 초 제곱(m/s²)', 'meters per second squared (m/s²)')}</strong>{L('입니다. 자동차의 출발, 브레이크를 밟을 때의 감속, 자유 낙하 운동 등에서 중요한 역할을 하며, 양의 가속도는 속도 증가를, 음의 가속도는 감속을 의미합니다.', '. It plays an important role in a car starting off, decelerating when braking, and free-fall motion; positive acceleration means increasing speed, while negative acceleration means deceleration.')}
      </p>
      <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
        {L('이 계산기는 학생들에게 운동학적 개념을 직관적으로 이해시키는 교육 도구로서, 엔지니어들에게는 차량 성능 분석, 교통 시스템 설계, 항공우주 프로젝트 등에서 정확한 속도 및 가속도 데이터를 제공하는 실용적인 도구로 활용됩니다.', 'This calculator serves as an educational tool that helps students intuitively understand kinematic concepts, and as a practical tool that provides engineers with accurate velocity and acceleration data for vehicle performance analysis, traffic system design, aerospace projects, and more.')}
      </p>
      <TermGlossary items={[
        { term: L('속도(velocity)', 'Velocity'), desc: L('단위 시간당 위치 변화량으로, 방향을 포함한 벡터량이며 단위는 m/s입니다.', 'Change in position per unit time; a vector quantity that includes direction, with unit m/s.') },
        { term: L('가속도(acceleration)', 'Acceleration'), desc: L('단위 시간당 속도의 변화량으로, 단위는 m/s²입니다.', 'Change in velocity per unit time, with unit m/s².') },
        { term: L('속력(speed)', 'Speed'), desc: L('방향을 포함하지 않는 스칼라량으로, 속도의 크기만을 의미합니다.', 'A scalar quantity without direction, meaning only the magnitude of velocity.') },
      ]} />
    </div>
  ),
  calculationFormula: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('평균 속도 공식', 'Average Velocity Formula')}</h4>
        <p>{L('물체가 일정한 거리를 이동하는 데 걸린 시간을 알고 있을 때 속도를 계산합니다.', 'Calculate velocity when you know the time taken to travel a certain distance.')}</p>
        <div className="my-4 p-4 bg-muted rounded-lg text-center">
          <BlockMath math="v = \dfrac{d}{t}" />
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">v</span>{L('는 속도(velocity)를 나타내며, 단위는 m/s입니다.', ' is velocity, with unit m/s.')}</li>
          <li><span className="font-semibold">d</span>{L('는 거리(distance)를 나타내며, 단위는 미터(m)입니다.', ' is distance, with unit meter (m).')}</li>
          <li><span className="font-semibold">t</span>{L('는 시간(time)을 나타내며, 단위는 초(s)입니다.', ' is time, with unit second (s).')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('가속도 공식', 'Acceleration Formula')}</h4>
        <p>{L('초기 속도와 최종 속도, 그리고 시간을 통해 가속도를 계산합니다.', 'Calculate acceleration from initial velocity, final velocity, and time.')}</p>
        <div className="my-4 p-4 bg-muted rounded-lg text-center">
          <BlockMath math="a = \dfrac{v - v_0}{t}" />
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">a</span>{L('는 가속도(acceleration)를 나타내며, 단위는 m/s²입니다.', ' is acceleration, with unit m/s².')}</li>
          <li><span className="font-semibold">v</span>{L('는 최종 속도(final velocity)를 나타내며, 단위는 m/s입니다.', ' is the final velocity, with unit m/s.')}</li>
          <li><span className="font-semibold">v₀</span>{L('는 초기 속도(initial velocity)를 나타내며, 단위는 m/s입니다.', ' is the initial velocity, with unit m/s.')}</li>
          <li><span className="font-semibold">t</span>{L('는 시간(time)을 나타내며, 단위는 초(s)입니다.', ' is time, with unit second (s).')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('계산 예시', 'Example')}</h4>
        <p>{L('예를 들어, 자동차가 100m를 5초 만에 주행했다면?', 'For example, if a car travels 100 m in 5 seconds?')}</p>
        <div className="my-2 p-3 bg-muted rounded-lg">
          <BlockMath math="v = 100\,\text{m} / 5\,\text{s} = 20\,\text{m/s}\;(72\,\text{km/h})" />
        </div>
        <p>{L('자동차가 초당 20미터를 이동하며, 이는 시속 72km에 해당합니다.', 'The car moves 20 meters per second, which equals 72 km/h.')}</p>
      </div>
    </div>
  ),
  usefulTips: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('핵심 공식 정리', 'Key Formulas')}</h4>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('평균 속도:', 'Average velocity:')}</strong> v = d/t ({L('거리/시간', 'distance/time')})</li>
          <li><strong>{L('가속도:', 'Acceleration:')}</strong> a = (v - v₀)/t ({L('속도 변화율', 'rate of velocity change')})</li>
          <li><strong>{L('최종 속도:', 'Final velocity:')}</strong> v = v₀ + at ({L('등가속도 운동', 'uniform acceleration')})</li>
          <li><strong>{L('이동 거리:', 'Distance:')}</strong> d = v₀t + ½at² ({L('등가속도 운동', 'uniform acceleration')})</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('단위 변환 요령', 'Unit Conversion Tips')}</h4>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>1 m/s</strong> = 3.6 km/h ({L('시속으로 변환: 3.6 곱하기', 'to km/h: multiply by 3.6')})</li>
          <li><strong>1 km/h</strong> = 0.2778 m/s ({L('초속으로 변환: 3.6 나누기', 'to m/s: divide by 3.6')})</li>
          <li><strong>1 mph</strong> ≈ 0.4470 m/s ({L('마일퍼아워 → m/s', 'mph → m/s')})</li>
        </ul>
      </div>
      <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200 rounded-r-lg">
        <p className="font-bold text-sm">⚠️ {L('속도와 속력의 차이', 'Difference Between Velocity and Speed')}</p>
        <p className="text-xs mt-1">
          {L('물리학에서 ', 'In physics, ')}<strong>{L('속도(velocity)', 'velocity')}</strong>{L('는 방향을 포함한 벡터량이고, ', ' is a vector quantity that includes direction, while ')}<strong>{L('속력(speed)', 'speed')}</strong>{L('는 방향이 없는 스칼라량입니다. 예를 들어, 10m/s로 북쪽으로 달리는 선수와 10m/s로 남쪽으로 달리는 선수는 속력은 같지만 속도는 다릅니다.', ' is a scalar quantity without direction. For example, a runner moving north at 10 m/s and one moving south at 10 m/s have the same speed but different velocities.')}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('실생활 적용 사례', 'Real-Life Applications')}</h4>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('교통공학:', 'Traffic engineering:')}</strong> {L('도로 설계, 교통 흐름 분석, 신호 체계 설계', 'road design, traffic flow analysis, signal system design')}</li>
          <li><strong>{L('스포츠:', 'Sports:')}</strong> {L('선수 기록 분석, 훈련 프로그램 설계', 'athlete performance analysis, training program design')}</li>
          <li><strong>{L('항공우주:', 'Aerospace:')}</strong> {L('비행기 이륙 속도, 위성 궤도 속도 계산', 'aircraft takeoff speed, satellite orbital speed calculation')}</li>
          <li><strong>{L('자동차 공학:', 'Automotive engineering:')}</strong> {L('0→100km/h 가속 시간, 제동 거리 계산', '0→100 km/h acceleration time, braking distance calculation')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('교육 활용법', 'Educational Use')}</h4>
        <p>{L('이 계산기는 다음 개념을 이해하는 데 유용합니다.', 'This calculator is useful for understanding the following concepts.')}</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('일정 속도 운동:', 'Constant velocity motion:')}</strong> {L('가속도가 0일 때의 등속 직선 운동', 'uniform linear motion when acceleration is zero')}</li>
          <li><strong>{L('등가속도 운동:', 'Uniform acceleration motion:')}</strong> {L('중력 가속도(9.8 m/s²)를 이용한 자유 낙하', 'free fall using gravitational acceleration (9.8 m/s²)')}</li>
          <li><strong>{L('속도-시간 그래프:', 'Velocity-time graph:')}</strong> {L('기울기는 가속도, 면적은 이동 거리', 'slope is acceleration, area is distance')}</li>
        </ul>
      </div>
    </div>
  ),
  howToUse: (
    <div className="space-y-4">
      <ol className="list-decimal list-inside space-y-2">
        <li>{L('이동 거리를 입력하세요. (미터 m 또는 킬로미터 km)', 'Enter the distance traveled (meters m or kilometers km).')}</li>
        <li>{L('이동에 걸린 시간을 입력하세요. (초 s 또는 시간 h)', 'Enter the time taken (seconds s or hours h).')}</li>
        <li>{L('계산 버튼을 클릭하면 속도가 자동으로 계산됩니다.', 'Click calculate and the velocity is computed automatically.')}</li>
        <li>{L('결과를 읽고 단위(m/s, km/h)를 확인하세요.', 'Read the result and check the unit (m/s, km/h).')}</li>
      </ol>
    </div>
  ),
  workedExamples: (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
        <h4 className="font-bold text-lg mb-2">{L('100m를 10초에', '100 m in 10 s')}</h4>
        <p>{L('달리기 선수가 100m를 10초에 주파했다면 속도는 100 ÷ 10 = 10 m/s입니다.', 'If a runner covers 100 m in 10 seconds, the velocity is 100 ÷ 10 = 10 m/s.')}</p>
      </div>
      <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
        <h4 className="font-bold text-lg mb-2">{L('100km를 2시간에', '100 km in 2 h')}</h4>
        <p>{L('자동차가 100km를 2시간 동안 주행했다면 속도는 100 ÷ 2 = 50 km/h입니다.', 'If a car travels 100 km in 2 hours, the velocity is 100 ÷ 2 = 50 km/h.')}</p>
      </div>
      <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
        <h4 className="font-bold text-lg mb-2">{L('300m를 60초에', '300 m in 60 s')}</h4>
        <p>{L('300m를 1분(60초)에 이동했다면 속도는 300 ÷ 60 = 5 m/s입니다.', 'If 300 m is covered in 1 minute (60 s), the velocity is 300 ÷ 60 = 5 m/s.')}</p>
      </div>
    </div>
  ),
  faq: (
    <div className="space-y-4">
      {[
        {
          q: L('속도(velocity)와 속력(speed)의 차이는 무엇인가요?', 'What is the difference between velocity and speed?'),
          a: L('속력은 방향을 고려하지 않는 스칼라량으로 크기만 있고, 속도는 방향을 포함하는 벡터량입니다. 예를 들어 북쪽으로 10 m/s와 남쪽으로 10 m/s는 속력은 같지만 속도는 다릅니다.', 'Speed is a scalar quantity with magnitude only, while velocity is a vector quantity that includes direction. For example, 10 m/s north and 10 m/s south have the same speed but different velocities.'),
        },
        {
          q: L('m/s를 km/h로 어떻게 변환하나요?', 'How do I convert m/s to km/h?'),
          a: L('m/s에 3.6을 곱하면 km/h가 됩니다. 예를 들어 10 m/s는 10 × 3.6 = 36 km/h입니다. 반대로 km/h를 m/s로 바꾸려면 3.6으로 나눕니다.', 'Multiply m/s by 3.6 to get km/h. For example, 10 m/s equals 10 × 3.6 = 36 km/h. To convert km/h to m/s, divide by 3.6.'),
        },
        {
          q: L('평균 속도와 순간 속도의 차이는 무엇인가요?', 'What is the difference between average and instantaneous velocity?'),
          a: L('평균 속도는 전체 이동 거리를 전체 걸린 시간으로 나눈 값이고, 순간 속도는 특정 순간의 속도입니다. 자동차 계기판의 속도계는 순간 속도를 보여줍니다.', 'Average velocity is total distance divided by total time, while instantaneous velocity is the velocity at a specific moment. A car speedometer shows instantaneous velocity.'),
        },
        {
          q: L('변위(displacement)와 거리(distance)는 어떻게 다른가요?', 'How are displacement and distance different?'),
          a: L('거리는 이동한 전체 경로의 길이이고, 변위는 시작점에서 끝점까지의 직선 거리와 방향입니다. 출발점으로 돌아오면 변위는 0이지만 거리는 0이 아닙니다.', 'Distance is the total length of the path traveled, while displacement is the straight-line distance and direction from start to end. If you return to the starting point, displacement is zero but distance is not.'),
        },
        {
          q: L('속도에는 어떤 단위가 사용되나요?', 'What units are used for velocity?'),
          a: L('국제 단위계(SI)에서는 미터 매 초(m/s)를 사용하고, 일상생활에서는 km/h, mph, 노트(knot) 등도 흔히 사용됩니다. 1 m/s = 3.6 km/h ≈ 2.237 mph입니다.', 'The SI unit is meters per second (m/s), while km/h, mph, and knots are also commonly used in daily life. 1 m/s = 3.6 km/h ≈ 2.237 mph.'),
        },
      ].map((f, i) => (
        <FaqItem key={i} q={f.q} a={f.a} />
      ))}
    </div>
  ),
  };
};

export default function VelocityCalculatorPage() {
  const { dict, locale } = useI18n();
  const t = dict.velocityCalculator;
  const isKo = locale === 'ko';

  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState<number | null>(null);

  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [accelTime, setAccelTime] = useState('');
  const [acceleration, setAcceleration] = useState<number | null>(null);

  const handleVelocityCalculate = useCallback(() => {
    const d = parseFloat(distance);
    const tVal = parseFloat(time);
    if (!isNaN(d) && !isNaN(tVal) && tVal !== 0) {
      setVelocity(d / tVal);
    } else {
      setVelocity(null);
    }
  }, [distance, time]);

  const handleVelocityReset = useCallback(() => {
    setDistance('');
    setTime('');
    setVelocity(null);
  }, []);

  const handleAccelerationCalculate = useCallback(() => {
    const v0 = parseFloat(initialVelocity);
    const v = parseFloat(finalVelocity);
    const tVal = parseFloat(accelTime);
    if (!isNaN(v0) && !isNaN(v) && !isNaN(tVal) && tVal !== 0) {
      setAcceleration((v - v0) / tVal);
    } else {
      setAcceleration(null);
    }
  }, [initialVelocity, finalVelocity, accelTime]);

  const handleAccelerationReset = useCallback(() => {
    setInitialVelocity('');
    setFinalVelocity('');
    setAccelTime('');
    setAcceleration(null);
  }, []);

  const inputSection = (
    <Tabs defaultValue="velocity">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="velocity">{t.tabVelocity}</TabsTrigger>
        <TabsTrigger value="acceleration">{t.tabAcceleration}</TabsTrigger>
      </TabsList>
      <TabsContent value="velocity" className="space-y-4 mt-4">
        <div>
          <Label htmlFor="distance">{t.inputDistance}</Label>
          <Input
            id="distance"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder={isKo ? '예: 100' : 'e.g. 100'}
          />
        </div>
        <div>
          <Label htmlFor="time">{t.inputTime}</Label>
          <Input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={isKo ? '예: 5' : 'e.g. 5'}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleVelocityCalculate} className="flex-1">{t.calculateBtn}</Button>
          <Button onClick={handleVelocityReset} variant="outline" className="flex-1">{t.resetBtn}</Button>
        </div>
      </TabsContent>
      <TabsContent value="acceleration" className="space-y-4 mt-4">
        <div>
          <Label htmlFor="initialVelocity">{t.inputInitialVelocity}</Label>
          <Input
            id="initialVelocity"
            type="number"
            value={initialVelocity}
            onChange={(e) => setInitialVelocity(e.target.value)}
            placeholder={isKo ? '예: 0' : 'e.g. 0'}
          />
        </div>
        <div>
          <Label htmlFor="finalVelocity">{t.inputFinalVelocity}</Label>
          <Input
            id="finalVelocity"
            type="number"
            value={finalVelocity}
            onChange={(e) => setFinalVelocity(e.target.value)}
            placeholder={isKo ? '예: 20' : 'e.g. 20'}
          />
        </div>
        <div>
          <Label htmlFor="accelTime">{t.inputAccelTime}</Label>
          <Input
            id="accelTime"
            type="number"
            value={accelTime}
            onChange={(e) => setAccelTime(e.target.value)}
            placeholder={isKo ? '예: 5' : 'e.g. 5'}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleAccelerationCalculate} className="flex-1">{t.calculateBtn}</Button>
          <Button onClick={handleAccelerationReset} variant="outline" className="flex-1">{t.resetBtn}</Button>
        </div>
      </TabsContent>
    </Tabs>
  );

  const resultSection = (
    <Tabs defaultValue="velocity">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="velocity">{t.resultTabVelocity}</TabsTrigger>
        <TabsTrigger value="acceleration">{t.resultTabAcceleration}</TabsTrigger>
      </TabsList>
      <TabsContent value="velocity" className="mt-4">
        {velocity !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{t.resultVelocity}</p>
            <p className="text-2xl font-bold">{velocity.toFixed(4)} m/s</p>
            <p className="text-sm text-muted-foreground mt-2">
              {(velocity * 3.6).toFixed(2)} km/h
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{t.placeholder}</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="acceleration" className="mt-4">
        {acceleration !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{t.resultAcceleration}</p>
            <p className="text-2xl font-bold">{acceleration.toFixed(4)} m/s²</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{t.placeholder}</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection(isKo)}
      variant="split"
    />
  );
}
