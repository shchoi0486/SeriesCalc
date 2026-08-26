'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

const MortgagePitiClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [homePrice, setHomePrice] = useState<number>(400000)
  const [downPct, setDownPct] = useState<number>(20)
  const [termYears, setTermYears] = useState<number>(30)
  const [ratePct, setRatePct] = useState<number>(6.5)
  const [propTaxYear, setPropTaxYear] = useState<number>(4800)
  const [insuranceYear, setInsuranceYear] = useState<number>(1200)
  const [pmiRatePct, setPmiRatePct] = useState<number>(0.5)

  const fmt = (n: number) =>
    isKo ? '₩' + Math.round(n).toLocaleString('ko-KR') : '$' + Math.round(n).toLocaleString('en-US')

  const { monthlyPI, monthlyTax, monthlyIns, monthlyPmi, piti, totalInterest, error } = useMemo(() => {
    if (downPct >= 100) return { monthlyPI: 0, monthlyTax: 0, monthlyIns: 0, monthlyPmi: 0, piti: 0, totalInterest: 0, error: isKo ? '계약금이 100%면 대출이 필요 없습니다.' : 'Down payment of 100% needs no loan.' }
    const down = homePrice * downPct / 100
    const loan = homePrice - down
    const r = ratePct / 100 / 12
    const n = termYears * 12
    const pi = r > 0 ? loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : loan / n
    const tax = propTaxYear / 12
    const ins = insuranceYear / 12
    const ltv = loan / homePrice
    const pmi = ltv > 0.8 ? (loan * pmiRatePct / 100) / 12 : 0
    return {
      monthlyPI: pi, monthlyTax: tax, monthlyIns: ins, monthlyPmi: pmi,
      piti: pi + tax + ins + pmi, totalInterest: pi * n - loan, error: '',
    }
  }, [homePrice, downPct, termYears, ratePct, propTaxYear, insuranceYear, pmiRatePct, isKo])

  const inputSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div><Label>{isKo ? '주택 가격' : 'Home price'}</Label><Input type="number" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} /></div>
      <div><Label>{isKo ? '계약금 (%)' : 'Down payment (%)'}</Label><Input type="number" value={downPct} onChange={(e) => setDownPct(+e.target.value)} /></div>
      <div><Label>{isKo ? '대출 기간 (년)' : 'Loan term (years)'}</Label><Input type="number" value={termYears} onChange={(e) => setTermYears(+e.target.value)} /></div>
      <div><Label>{isKo ? '연 이자율 (%)' : 'Interest rate (%)'}</Label><Input type="number" value={ratePct} onChange={(e) => setRatePct(+e.target.value)} /></div>
      <div><Label>{isKo ? '연 재산세' : 'Annual property tax'}</Label><Input type="number" value={propTaxYear} onChange={(e) => setPropTaxYear(+e.target.value)} /></div>
      <div><Label>{isKo ? '연 주택보험료' : 'Annual home insurance'}</Label><Input type="number" value={insuranceYear} onChange={(e) => setInsuranceYear(+e.target.value)} /></div>
      <div><Label>{isKo ? 'PMI 연료(%) - LTV>80% 적용' : 'PMI rate (%) — if LTV>80%'}</Label><Input type="number" value={pmiRatePct} onChange={(e) => setPmiRatePct(+e.target.value)} /></div>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '월 PITI 합계' : 'Monthly PITI'}</p><p className="text-2xl font-bold mt-1">{fmt(piti)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '원리금(PI)' : 'Principal & Interest'}</p><p className="text-2xl font-bold mt-1">{fmt(monthlyPI)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '재산세' : 'Property tax'}</p><p className="text-2xl font-bold mt-1">{fmt(monthlyTax)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '주택보험' : 'Home insurance'}</p><p className="text-2xl font-bold mt-1">{fmt(monthlyIns)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">PMI</p><p className="text-2xl font-bold mt-1">{fmt(monthlyPmi)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 이자 지출' : 'Total interest'}</p><p className="text-2xl font-bold mt-1">{fmt(totalInterest)}</p></div>
      </div>
      <p className="text-xs text-muted-foreground">
        {isKo ? '※ LTV(대출비율)가 80%를 초과하면 PMI가 추가되며, 통상 20% 이상 equity 확보 시 취소됩니다. 수치는 추정치입니다.' : '※ PMI applies when LTV exceeds 80% and typically cancels once you reach 20% equity. Figures are estimates.'}
      </p>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? 'Mortgage PITI & PMI 계산기' : 'Mortgage PITI & PMI Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default MortgagePitiClient
