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

const RsuTaxClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [shares, setShares] = useState<number>(1000)
  const [fmv, setFmv] = useState<number>(150)
  const [fedRate, setFedRate] = useState<number>(24)
  const [stateRate, setStateRate] = useState<number>(5)
  const [ficaRate, setFicaRate] = useState<number>(7.65)

  const fmt = (n: number) =>
    isKo ? '₩' + Math.round(n).toLocaleString('ko-KR') : '$' + Math.round(n).toLocaleString('en-US')

  const { gross, fed, state, fica, totalTax, net } = useMemo(() => {
    const g = shares * fmv
    const f = g * fedRate / 100
    const s = g * stateRate / 100
    const fi = g * ficaRate / 100
    const t = f + s + fi
    return { gross: g, fed: f, state: s, fica: fi, totalTax: t, net: g - t }
  }, [shares, fmv, fedRate, stateRate, ficaRate])

  const inputSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div><Label>{isKo ? '베스팅 주식 수' : 'Vested shares'}</Label><Input type="number" value={shares} onChange={(e) => setShares(+e.target.value)} /></div>
      <div><Label>{isKo ? '베스팅 시 주가(FMV)' : 'FMV at vesting'}</Label><Input type="number" value={fmv} onChange={(e) => setFmv(+e.target.value)} /></div>
      <div><Label>{isKo ? '연방 소득세율 (%)' : 'Federal tax rate (%)'}</Label><Input type="number" value={fedRate} onChange={(e) => setFedRate(+e.target.value)} /></div>
      <div><Label>{isKo ? '주(State) 세율 (%)' : 'State tax rate (%)'}</Label><Input type="number" value={stateRate} onChange={(e) => setStateRate(+e.target.value)} /></div>
      <div><Label>{isKo ? 'FICA (OASDI+Medicare) %' : 'FICA rate (%)'}</Label><Input type="number" value={ficaRate} onChange={(e) => setFicaRate(+e.target.value)} /></div>
    </div>
  )

  const resultSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 과세 가치' : 'Total taxable value'}</p><p className="text-2xl font-bold mt-1">{fmt(gross)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '연방세' : 'Federal tax'}</p><p className="text-2xl font-bold mt-1">{fmt(fed)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '주세' : 'State tax'}</p><p className="text-2xl font-bold mt-1">{fmt(state)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">FICA</p><p className="text-2xl font-bold mt-1">{fmt(fica)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 세금' : 'Total tax'}</p><p className="text-2xl font-bold mt-1">{fmt(totalTax)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '세후 실수령액' : 'After-tax value'}</p><p className="text-2xl font-bold mt-1">{fmt(net)}</p></div>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? 'RSU / 주식 보상 세금 계산기' : 'RSU / Equity Tax Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default RsuTaxClient
