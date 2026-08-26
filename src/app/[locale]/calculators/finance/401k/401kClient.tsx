'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts'
import CalculatorsLayout from '@/components/calculators/Calculatorslayout'
import { useI18n } from '@/i18n/I18nProvider'

interface InfoSection {
  calculatorDescription: React.ReactNode
  howToUse?: React.ReactNode
  workedExamples?: React.ReactNode
  calculationFormula: React.ReactNode
  usefulTips: React.ReactNode
  faq?: React.ReactNode
}

const Retire401kClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retireAge, setRetireAge] = useState<number>(65)
  const [currentBalance, setCurrentBalance] = useState<number>(10000)
  const [annualSalary, setAnnualSalary] = useState<number>(80000)
  const [contribPct, setContribPct] = useState<number>(10)
  const [employerMatchPct, setEmployerMatchPct] = useState<number>(50)
  const [employerMatchCapPct, setEmployerMatchCapPct] = useState<number>(6)
  const [annualReturnPct, setAnnualReturnPct] = useState<number>(7)
  const [annualLimit, setAnnualLimit] = useState<number>(23500)
  const [accountType, setAccountType] = useState<'traditional' | 'roth'>('traditional')
  const [retireTaxRate, setRetireTaxRate] = useState<number>(15)

  const fmt = (n: number) =>
    isKo ? '₩' + Math.round(n).toLocaleString('ko-KR') : '$' + Math.round(n).toLocaleString('en-US')

  const { projected, totalContrib, growth, afterTax, chartData, error } = useMemo(() => {
    if (retireAge <= currentAge) {
      return { projected: 0, totalContrib: 0, growth: 0, afterTax: 0, chartData: [], error: isKo ? '은퇴 나이는 현재 나이보다 커야 합니다.' : 'Retirement age must be greater than current age.' }
    }
    const years = retireAge - currentAge
    const months = years * 12
    const empAnnual = Math.min((annualSalary * contribPct) / 100, annualLimit)
    const employerMatch = Math.min(empAnnual, (annualSalary * employerMatchCapPct) / 100) * (employerMatchPct / 100)
    const annualTotal = empAnnual + employerMatch
    const monthlyTotal = annualTotal / 12
    const r = annualReturnPct / 100 / 12

    const fvBalance = currentBalance * Math.pow(1 + r, months)
    const fvContrib = r > 0 ? monthlyTotal * ((Math.pow(1 + r, months) - 1) / r) : monthlyTotal * months
    const projected = fvBalance + fvContrib
    const totalContrib = currentBalance + annualTotal * years
    const growth = projected - totalContrib
    const afterTax = accountType === 'traditional' ? projected * (1 - retireTaxRate / 100) : projected

    const data: { age: number; balance: number }[] = []
    for (let y = 0; y <= years; y++) {
      const m = y * 12
      const fb = currentBalance * Math.pow(1 + r, m)
      const fc = r > 0 ? monthlyTotal * ((Math.pow(1 + r, m) - 1) / r) : monthlyTotal * m
      data.push({ age: currentAge + y, balance: Math.round(fb + fc) })
    }
    return { projected, totalContrib, growth, afterTax, chartData: data, error: '' }
  }, [currentAge, retireAge, currentBalance, annualSalary, contribPct, employerMatchPct, employerMatchCapPct, annualReturnPct, annualLimit, accountType, retireTaxRate])

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label>{isKo ? '현재 나이' : 'Current age'}</Label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(+e.target.value)} /></div>
        <div><Label>{isKo ? '은퇴 목표 나이' : 'Retirement age'}</Label><Input type="number" value={retireAge} onChange={(e) => setRetireAge(+e.target.value)} /></div>
        <div><Label>{isKo ? '현재 401(k) 잔액' : 'Current 401(k) balance'}</Label><Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(+e.target.value)} /></div>
        <div><Label>{isKo ? '연봉' : 'Annual salary'}</Label><Input type="number" value={annualSalary} onChange={(e) => setAnnualSalary(+e.target.value)} /></div>
        <div><Label>{isKo ? '내 기여율 (% of salary)' : 'Your contribution (%)'}</Label><Input type="number" value={contribPct} onChange={(e) => setContribPct(+e.target.value)} /></div>
        <div><Label>{isKo ? '년 기여 한도' : 'Annual contribution limit'}</Label><Input type="number" value={annualLimit} onChange={(e) => setAnnualLimit(+e.target.value)} /></div>
        <div><Label>{isKo ? '회사 매칭 비율 (%)' : 'Employer match (%)'}</Label><Input type="number" value={employerMatchPct} onChange={(e) => setEmployerMatchPct(+e.target.value)} /></div>
        <div><Label>{isKo ? '매칭 상한 (% of salary)' : 'Match cap (% of salary)'}</Label><Input type="number" value={employerMatchCapPct} onChange={(e) => setEmployerMatchCapPct(+e.target.value)} /></div>
        <div><Label>{isKo ? '예상 연 수익률 (%)' : 'Expected annual return (%)'}</Label><Input type="number" value={annualReturnPct} onChange={(e) => setAnnualReturnPct(+e.target.value)} /></div>
        <div><Label>{isKo ? '은퇴 시 세율 (%)' : 'Retirement tax rate (%)'}</Label><Input type="number" value={retireTaxRate} onChange={(e) => setRetireTaxRate(+e.target.value)} /></div>
      </div>
      <Tabs value={accountType} onValueChange={(v) => setAccountType(v as 'traditional' | 'roth')}>
        <TabsList>
          <TabsTrigger value="traditional">{isKo ? 'Traditional (세액공제型)' : 'Traditional (pre-tax)'}</TabsTrigger>
          <TabsTrigger value="roth">{isKo ? 'Roth (세후型)' : 'Roth (after-tax)'}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '예상 은퇴 적립금' : 'Projected balance'}</p><p className="text-2xl font-bold mt-1">{fmt(projected)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 납입 원금' : 'Total contributions'}</p><p className="text-2xl font-bold mt-1">{fmt(totalContrib)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '투자 수익(이자)' : 'Investment growth'}</p><p className="text-2xl font-bold mt-1">{fmt(growth)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '세후 예상 수령액' : 'After-tax value'}</p><p className="text-2xl font-bold mt-1">{fmt(afterTax)}</p></div>
      </div>
    </div>
  )

  const fullWidthSection = (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis tickFormatter={(v) => (isKo ? (v / 10000).toFixed(0) + '만' : '$' + (v / 1000).toFixed(0) + 'k')} />
          <RechartsTooltip formatter={(v: number) => fmt(v)} />
          <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? '401(k) / Roth IRA 계산기' : '401(k) / Roth IRA Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '연도별 적립금 추이' : 'Balance by age'}
      infoSection={infoSection}
    />
  )
}

export default Retire401kClient
