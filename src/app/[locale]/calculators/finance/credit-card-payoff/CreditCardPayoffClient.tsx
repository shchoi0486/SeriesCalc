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

const CreditCardPayoffClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [balance, setBalance] = useState<number>(5000)
  const [apr, setApr] = useState<number>(22)
  const [payment, setPayment] = useState<number>(200)
  const [extra, setExtra] = useState<number>(0)

  const fmt = (n: number) =>
    isKo ? '₩' + Math.round(n).toLocaleString('ko-KR') : '$' + Math.round(n).toLocaleString('en-US')

  const compute = (pmt: number) => {
    const r = apr / 100 / 12
    if (pmt <= balance * r) return { months: Infinity, interest: Infinity, total: Infinity }
    const months = Math.ceil(-Math.log(1 - (balance * r) / pmt) / Math.log(1 + r))
    const total = pmt * months
    return { months, interest: total - balance, total }
  }

  const base = useMemo(() => compute(payment), [balance, apr, payment])
  const withExtra = useMemo(() => compute(payment + extra), [balance, apr, payment, extra])

  const inputSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div><Label>{isKo ? '현재 잔액' : 'Current balance'}</Label><Input type="number" value={balance} onChange={(e) => setBalance(+e.target.value)} /></div>
      <div><Label>{isKo ? '연 APR (%)' : 'Annual APR (%)'}</Label><Input type="number" value={apr} onChange={(e) => setApr(+e.target.value)} /></div>
      <div><Label>{isKo ? '월 최소 납부액' : 'Monthly payment'}</Label><Input type="number" value={payment} onChange={(e) => setPayment(+e.target.value)} /></div>
      <div><Label>{isKo ? '추가 납부액 (선택)' : 'Extra payment (optional)'}</Label><Input type="number" value={extra} onChange={(e) => setExtra(+e.target.value)} /></div>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      {base.months === Infinity && (
        <p className="text-sm text-destructive">{isKo ? '월 납부액이 발생 이자보다 작아 원금이 줄어들지 않습니다. 납부액을 늘리세요.' : 'Payment is below the monthly interest; increase it to pay off the balance.'}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '상환 기간(현재)' : 'Payoff time (current)'}</p><p className="text-2xl font-bold mt-1">{base.months === Infinity ? '∞' : base.months + (isKo ? '개월' : ' mo')}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '총 이자(현재)' : 'Total interest (current)'}</p><p className="text-2xl font-bold mt-1">{fmt(base.interest)}</p></div>
        <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '추가 납부 시 절약 이자' : 'Interest saved w/ extra'}</p><p className="text-2xl font-bold mt-1">{extra > 0 && withExtra.interest < base.interest ? fmt(base.interest - withExtra.interest) : fmt(0)}</p></div>
      </div>
      <p className="text-xs text-muted-foreground">
        {isKo ? '※ 리볼빙 최소 납부만 하면 이자 폭탄이 발생합니다. 가능한 한 잔액의 2~3% 이상을 꾸준히 갚으세요.' : '※ Paying only the minimum triggers a compounding interest spiral. Pay more than the minimum whenever possible.'}
      </p>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? 'Credit Card Payoff 계산기' : 'Credit Card Payoff Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default CreditCardPayoffClient
