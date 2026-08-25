'use client'

import React, { useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CustomDatePickerWithPopover } from '@/components/ui/custom-date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { differenceInDays } from 'date-fns'
import { Trash2, PlusCircle, HelpCircle, FileText, PiggyBank } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { toast } from 'sonner'
import { formatNumber, parseNumber } from '@/utils/formatNumber'
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table'
import CalculatorsLayout from '@/components/calculators/Calculatorslayout'
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface FreeInstallmentSavingsPageProps {
  infoSection: InfoSection;
}

const FreeInstallmentSavingsPage = ({ infoSection }: FreeInstallmentSavingsPageProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const depositSchema = z.object({
    date: z.date({ required_error: isKo ? '날짜를 입력해주세요.' : 'Please enter a date.' }),
    amount: z.number({ required_error: isKo ? '유효한 숫자를 입력해주세요.' : 'Please enter a valid number.' })
      .refine(val => val > 0, { message: isKo ? '납입금액은 0보다 커야 합니다.' : 'The deposit amount must be greater than 0.' }),
  });

  const formSchema = z.object({
    deposits: z.array(depositSchema).min(1, isKo ? '하나 이상의 납입금이 필요합니다.' : 'At least one deposit is required.'),
    maturityDate: z.date({ required_error: isKo ? '만기일을 입력해주세요.' : 'Please enter a maturity date.' }),
    interestRate: z.number({ required_error: isKo ? '유효한 숫자를 입력해주세요.' : 'Please enter a valid number.' })
      .refine(val => {
          return val >= 0 && val <= 100;
      }, { message: isKo ? '이자율은 0에서 100 사이여야 합니다.' : 'The interest rate must be between 0 and 100.' }),
    interestType: z.enum(['simple', 'compound']),
    taxType: z.enum(['general', 'preferential', 'non-taxable']),
  }).refine(data => {
      for (const deposit of data.deposits) {
          if (differenceInDays(data.maturityDate, deposit.date) < 0) {
              return false;
          }
      }
      return true;
  }, { message: isKo ? '만기일은 모든 납입일보다 이후여야 합니다.' : 'The maturity date must be after all deposit dates.', path: ['maturityDate'] });

  const [result, setResult] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deposits: [{ date: new Date(), amount: 0 }],
      maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      interestRate: 2.5,
      interestType: 'simple',
      taxType: 'general',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'deposits',
  });

  const handleNumericInputChange = useCallback(
    (onChange: (value: number) => void) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const numericValue = value ? parseFloat(value.replace(/,/g, '')) : 0;
        onChange(isNaN(numericValue) ? 0 : numericValue);
    },
    []
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { deposits, maturityDate, interestRate, interestType, taxType } = values;
    const rate = interestRate / 100;

    let totalInterest = 0;
    const principal = deposits.reduce((sum, p) => sum + p.amount, 0);

    if (interestType === 'simple') {
      totalInterest = deposits.reduce((sum, deposit) => {
        const days = differenceInDays(maturityDate, deposit.date);
        if (days < 0) return sum;
        const interest = deposit.amount * rate * (days / 365);
        return sum + interest;
      }, 0);
    } else { // 월 복리 근사치
      totalInterest = deposits.reduce((sum, deposit) => {
        const months = (maturityDate.getFullYear() - deposit.date.getFullYear()) * 12 + (maturityDate.getMonth() - deposit.date.getMonth());
        if (months <= 0) return sum;
        const monthlyRate = rate / 12;
        const finalValue = deposit.amount * Math.pow(1 + monthlyRate, months);
        return sum + (finalValue - deposit.amount);
      }, 0);
    }

    const preTaxInterest = Math.floor(totalInterest);
    const taxRateValue = taxType === 'general' ? 0.154 : taxType === 'preferential' ? 0.095 : 0;
    const tax = Math.floor(preTaxInterest * taxRateValue);
    const postTaxInterest = preTaxInterest - tax;
    const finalAmount = principal + postTaxInterest;

    setResult({
      principal,
      preTaxInterest,
      tax,
      postTaxInterest,
      finalAmount,
      taxRate: taxRateValue * 100,
    });
    toast.success(isKo ? '자유적금 계산이 완료되었습니다.' : 'Free savings calculation completed.');
  };

  const LeftColumn = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="space-y-6 flex-grow">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isKo ? '납입금 정보' : 'Deposit information'}</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-2 p-2 border rounded-md">
                <div className="flex-grow space-y-2">
                  <FormField
                    control={form.control}
                    name={`deposits.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isKo ? '납입일' : 'Deposit date'}</FormLabel>
                        <FormControl><CustomDatePickerWithPopover date={field.value} setDate={field.onChange} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`deposits.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isKo ? '납입금액 (원)' : 'Deposit amount (KRW)'}</FormLabel>
                        <FormControl><Input placeholder={isKo ? '납입금액' : 'Deposit amount'} {...field} onChange={handleNumericInputChange(field.onChange)} className="text-right" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="mt-7">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ date: new Date(), amount: 0 })} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> {isKo ? '납입금 추가' : 'Add deposit'}
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isKo ? '적금 정보' : 'Savings information'}</h3>
            <FormField
              control={form.control}
              name="maturityDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isKo ? '만기일' : 'Maturity date'}</FormLabel>
                  <FormControl><CustomDatePickerWithPopover date={field.value} setDate={field.onChange} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isKo ? '연 이자율 (%)' : 'Annual interest rate (%)'}</FormLabel>
                  <FormControl><Input placeholder={isKo ? '연 이자율' : 'Annual rate'} {...field} onChange={handleNumericInputChange(field.onChange)} className="text-right" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isKo ? '이자 계산 방식' : 'Interest calculation method'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isKo ? '이자 계산 방식을 선택하세요' : 'Select interest method'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="simple">{isKo ? '단리' : 'Simple'}</SelectItem>
                      <SelectItem value="compound">{isKo ? '월복리' : 'Monthly compound'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isKo ? '과세 옵션' : 'Taxation option'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isKo ? '과세 옵션을 선택하세요' : 'Select tax option'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">{isKo ? '일반과세 (15.4%)' : 'General (15.4%)'}</SelectItem>
                      <SelectItem value="preferential">{isKo ? '세금우대 (9.5%)' : 'Preferential (9.5%)'}</SelectItem>
                      <SelectItem value="non-taxable">{isKo ? '비과세 (0%)' : 'Non-taxable (0%)'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-auto pt-4">
          <Button type="submit" className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
        </div>
      </form>
    </Form>
  );

  const RightColumn = (
    <div className="h-full flex flex-col">
      <CardContent className="flex-grow">
        {result ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-muted-foreground">{isKo ? '만기 시 예상 수령액' : 'Expected maturity amount'}</p>
              <p className="text-4xl font-bold text-primary">{formatNumber(result.finalAmount)}{isKo ? '원' : ' KRW'}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-muted-foreground">
            {isKo ? '계산하기 버튼을 눌러주세요' : 'Please press Calculate'}
          </div>
        )}
      </CardContent>
    </div>
  );

  const fullWidthSection = result ? (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>{isKo ? '총 납입 원금' : 'Total principal deposited'}</TableCell>
          <TableCell className="text-right">{formatNumber(result.principal)}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '세전 이자' : 'Pre-tax interest'}</TableCell>
          <TableCell className="text-right">{formatNumber(result.preTaxInterest)}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? `이자과세 (${result.taxRate}%)` : `Interest tax (${result.taxRate}%)`}</TableCell>
          <TableCell className="text-right text-red-500">-{formatNumber(result.tax)}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="font-semibold">
          <TableCell>{isKo ? '세후 수령 이자' : 'After-tax interest received'}</TableCell>
          <TableCell className="text-right">{formatNumber(result.postTaxInterest)}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : null;



  return (
    <CalculatorsLayout
      title={isKo ? "자유적금 계산기" : "Free Savings Calculator"}
      description={isKo ? "자유로운 납입 계획에 따른 만기 수령액을 계산해보세요." : "Calculate the maturity amount based on your flexible deposit plan."}
      inputSection={LeftColumn}
      resultSection={RightColumn}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? "상세 내역" : "Details"}
      infoSection={infoSection}
    />
  )
}

export default FreeInstallmentSavingsPage
