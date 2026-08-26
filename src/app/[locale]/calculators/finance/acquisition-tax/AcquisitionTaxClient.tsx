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

const AcquisitionTaxClient = ({ infoSection }: { infoSection: InfoSection }) => {
  const { locale } = useI18n()
  const isKo = locale === 'ko'

  const [price, setPrice] = useState<number>(800000000)
  const [region, setRegion] = useState<'general' | 'adjust'>('adjust')
  const [homeCount, setHomeCount] = useState<number>(1)
  const [lifeFirst, setLifeFirst] = useState<boolean>(false)

  const fmt = (n: number) => '₩' + Math.round(n).toLocaleString('ko-KR')

  const { rate, baseTax, eduTax, total } = useMemo(() => {
    let r: number
    if (homeCount >= 3) r = 0.12
    else if (homeCount === 2) r = 0.08
    else {
      r = price <= 600000000 ? 0.01 : price <= 900000000 ? 0.02 : 0.03
      if (region === 'adjust') r += 0.01
    }
    if (lifeFirst && price <= 1200000000) r = Math.min(r, 0.01)
    const base = price * r
    const edu = base * 0.1
    return { rate: r, baseTax: base, eduTax: edu, total: base + edu }
  }, [price, region, homeCount, lifeFirst])

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label>{isKo ? '거래가액(주택)' : 'Property price'}</Label><Input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} /></div>
        <div><Label>{isKo ? '주택 보유 주택 수' : 'Number of homes owned'}</Label><Input type="number" value={homeCount} onChange={(e) => setHomeCount(Math.max(0, +e.target.value))} /></div>
      </div>
      <Tabs value={region} onValueChange={(v) => setRegion(v as 'general' | 'adjust')}>
        <TabsList>
          <TabsTrigger value="general">{isKo ? '일반 지역' : 'General area'}</TabsTrigger>
          <TabsTrigger value="adjust">{isKo ? '조정대상지역' : 'Regulated area'}</TabsTrigger>
        </TabsList>
      </Tabs>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={lifeFirst} onChange={(e) => setLifeFirst(e.target.checked)} />
        {isKo ? '생애최초 구입 + 12억 이하 감면 적용' : 'First-time buyer under 1.2B relief'}
      </label>
    </div>
  )

  const resultSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '적용 세율' : 'Effective rate'}</p><p className="text-2xl font-bold mt-1">{(rate * 100).toFixed(0)}%</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '취득세' : 'Acquisition tax'}</p><p className="text-2xl font-bold mt-1">{fmt(baseTax)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '지방교육세(10%)' : 'Edu. tax (10%)'}</p><p className="text-2xl font-bold mt-1">{fmt(eduTax)}</p></div>
      <div className="rounded-xl border border-border p-4"><p className="text-sm text-muted-foreground">{isKo ? '합계' : 'Total'}</p><p className="text-2xl font-bold mt-1">{fmt(total)}</p></div>
    </div>
  )

  return (
    <CalculatorsLayout
      title={isKo ? '주택 취득세 계산기' : 'Acquisition Tax Calculator'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={
        <p className="text-xs text-muted-foreground">
          {isKo ? '※ 본 계산은 2024~2025년 기준 간이화된 세율입니다. 다주택자 중과(8%/12%), 조정대상지역 가산, 생애최초 감면(12억 이하)을 반영하나 실제로는 취득가액 구간·감면 요건이 더 정밀하므로 관할 시청에 확인하세요.' : '※ Simplified 2024–2025 rates with multi-home surcharges (8%/12%), regulated-area addition, and first-time relief. Verify with your municipality.'}
        </p>
      }
      fullWidthTitle={isKo ? '안내' : 'Note'}
      infoSection={infoSection}
    />
  )
}

export default AcquisitionTaxClient
