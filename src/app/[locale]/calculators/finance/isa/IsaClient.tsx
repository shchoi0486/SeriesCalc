'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const IsaClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [monthly, setMonthly] = useState<number>(700000)
  const [years, setYears] = useState<number>(5)
  const [ratePct, setRatePct] = useState<number>(4)
  const [type, setType] = useState<'isa' | 'youth'>('youth')
  const [taxFreeLimit, setTaxFreeLimit] = useState<number>(4000000)

  const fmt = (n: number) => '₩' + Math.round(n).toLocaleString('ko-KR')

  const { fv, totalContrib, interest, tax, net, savedVsNormal } = useMemo(() => {
    const months = years * 12
    const r = ratePct / 100 / 12
    const m = monthly
    const fvVal = r > 0 ? m * ((Math.pow(1 + r, months) - 1) / r) : m * months
    const contrib = m * months
    const int = fvVal - contrib
    const freeTotal = taxFreeLimit * years
    const taxable = Math.max(0, int - freeTotal)
    const t = taxable * 0.154
    const normalTax = int * 0.154
    return {
      fv: fvVal, totalContrib: contrib, interest: int,
      tax: t, net: fvVal - t, savedVsNormal: normalTax - t,
    }
  }, [monthly, years, ratePct, taxFreeLimit, type])

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label>{isKo ? '월 납입액' : 'Monthly contribution'}</Label><Input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} /></div>
        <div><Label>{isKo ? '납입 기간 (년)' : 'Term (years)'}</Label><Input type="number" value={years} onChange={(e) => setYears(+e.target.value)} /></div>
        <div><Label>{isKo ? '예상 연 수익률 (%)' : 'Expected annual return (%)'}</Label><Input type="number" value={ratePct} onChange={(e) => setRatePct(+e.target.value)} /></div>
        <div><Label>{isKo ? '연 비과세 한도' : 'Annual tax-free limit'}</Label><Input type="number" value={taxFreeLimit} onChange={(e) => setTaxFreeLimit(+e.target.value)} /></div>
      </div>
      <Tabs value={type} onValueChange={(v) => setType(v as 'isa' | 'youth')}>
        <TabsList>
          <TabsTrigger value="isa">{isKo ? '일반 ISA' : 'General ISA'}</TabsTrigger>
          <TabsTrigger value="youth">{isKo ? '청년도약계좌' : 'Youth Leap Account'}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )

  const resultSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '만기 예상 수령액' : 'Maturity value'}</p><p className="text-2xl font-bold mt-1">{fmt(fv)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 납입 원금' : 'Total contributed'}</p><p className="text-2xl font-bold mt-1">{fmt(totalContrib)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '세후 이자' : 'After-tax interest'}</p><p className="text-2xl font-bold mt-1">{fmt(interest - tax)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '일반계좌 대비 절세' : 'Tax saved vs normal'}</p><p className="text-2xl font-bold mt-1">{fmt(savedVsNormal)}</p></div>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? 'ISA / 청년도약계좌 계산기' : 'ISA / Youth Leap Account Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default IsaClient
