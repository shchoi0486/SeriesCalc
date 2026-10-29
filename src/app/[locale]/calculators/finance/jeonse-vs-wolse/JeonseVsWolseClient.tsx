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

const fmt = (n: number) => '₩' + Math.round(n).toLocaleString('ko-KR')
const fmtInput = (n: number) => n.toLocaleString('ko-KR')
const parseInput = (s: string) => Number(s.replace(/[^0-9.-]/g, '')) || 0

const JeonseVsWolseClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [deposit, setDeposit] = useState<number>(300000000)
  const [monthlyRent, setMonthlyRent] = useState<number>(1000000)
  const [ratePct, setRatePct] = useState<number>(3.5)
  const [years, setYears] = useState<number>(2)

  const [depositStr, setDepositStr] = useState(fmtInput(300000000))
  const [rentStr, setRentStr] = useState(fmtInput(1000000))

  const { jeonseCost, wolseCost, diff, jeonseBetter } = useMemo(() => {
    const jc = deposit * (ratePct / 100) * years
    const wc = monthlyRent * 12 * years
    return { jeonseCost: jc, wolseCost: wc, diff: wc - jc, jeonseBetter: jc < wc }
  }, [deposit, monthlyRent, ratePct, years])

  const inputSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label>{isKo ? '전세 보증금' : 'Jeonse deposit'}</Label>
        <Input type="text" inputMode="numeric" value={depositStr}
          onChange={(e) => { setDepositStr(e.target.value); setDeposit(parseInput(e.target.value)); }}
          onBlur={() => setDepositStr(fmtInput(deposit))} />
      </div>
      <div className="space-y-1.5">
        <Label>{isKo ? '월세 (월)' : 'Monthly rent'}</Label>
        <Input type="text" inputMode="numeric" value={rentStr}
          onChange={(e) => { setRentStr(e.target.value); setMonthlyRent(parseInput(e.target.value)); }}
          onBlur={() => setRentStr(fmtInput(monthlyRent))} />
      </div>
      <div className="space-y-1.5">
        <Label>{isKo ? '예금 금리(기회비용) %' : 'Deposit rate (opportunity cost) %'}</Label>
        <Input type="number" value={ratePct} onChange={(e) => setRatePct(+e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>{isKo ? '비교 기간 (년)' : 'Comparison period (years)'}</Label>
        <Input type="number" value={years} onChange={(e) => setYears(+e.target.value)} />
      </div>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border p-3 min-w-0 overflow-hidden"><p className="text-xs sm:text-sm text-muted-foreground break-keep">{isKo ? '전세 기회비용' : 'Jeonse opportunity cost'}</p><p className="text-sm sm:text-base font-bold mt-1 whitespace-nowrap tabular-nums">{fmt(jeonseCost)}</p></div>
        <div className="rounded-xl border border-border p-3 min-w-0 overflow-hidden"><p className="text-xs sm:text-sm text-muted-foreground break-keep">{isKo ? '월세 총비용' : 'Total rent cost'}</p><p className="text-sm sm:text-base font-bold mt-1 whitespace-nowrap tabular-nums">{fmt(wolseCost)}</p></div>
        <div className="rounded-xl border border-border p-3 min-w-0 overflow-hidden sm:col-span-2"><p className="text-xs sm:text-sm text-muted-foreground break-keep">{isKo ? '결론' : 'Verdict'}</p><p className="text-sm sm:text-base font-bold mt-1 whitespace-nowrap break-keep">{jeonseBetter ? (isKo ? '전세 유리' : 'Jeonse better') : (isKo ? '월세 유리' : 'Rent better')}</p></div>
      </div>
      <p className="text-xs text-muted-foreground">
        {isKo ? `※ 전세 기회비용은 보증금을 예금에 넣었을 때 받을 수 있는 이자(≈${fmt(diff)})를 기준으로 한 추정치이며, 전세 사기·보증금 반환 리스크와 월세 인상분은 반영하지 않습니다.` : `※ Jeonse cost is the foregone deposit interest; excludes deposit-return risk and rent increases.`}
      </p>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? '전세 vs 월세 비교 계산기' : 'Jeonse vs Wolse Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default JeonseVsWolseClient
