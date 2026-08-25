'use client';

import React, { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Printer } from 'lucide-react';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  companyName: string;
  companyAddress: string;
  clientName: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
}

let nextId = 1;

const InvoiceGenerator: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.invoiceGenerator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [invoice, setInvoice] = useState<InvoiceData>({
    companyName: '',
    companyAddress: '',
    clientName: '',
    clientAddress: '',
    invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    items: [{ id: nextId++, name: '', quantity: 1, price: 0 }],
    taxRate: 10,
    notes: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: nextId++, name: '', quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (id: number) => {
    if (invoice.items.length <= 1) return;
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const updateField = (field: keyof InvoiceData, value: string | number) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const getSubtotal = () => invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const getTax = () => getSubtotal() * (invoice.taxRate / 100);
  const getTotal = () => getSubtotal() + getTax();

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => window.print(), 100);
  };

  const formatCurrency = (amount: number) => `${'\u20A9'}${amount.toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.companyName}</label>
          <Input
            value={invoice.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            placeholder={t.inputs.companyNamePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.clientName}</label>
          <Input
            value={invoice.clientName}
            onChange={(e) => updateField('clientName', e.target.value)}
            placeholder={t.inputs.clientNamePlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.companyAddress}</label>
          <Input
            value={invoice.companyAddress}
            onChange={(e) => updateField('companyAddress', e.target.value)}
            placeholder={t.inputs.companyAddressPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.clientAddress}</label>
          <Input
            value={invoice.clientAddress}
            onChange={(e) => updateField('clientAddress', e.target.value)}
            placeholder={t.inputs.clientAddressPlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.invoiceNumber}</label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateField('invoiceNumber', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.invoiceDate}</label>
          <Input
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => updateField('invoiceDate', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.taxRate}</label>
        <Input
          type="number"
          min={0}
          max={100}
          step={0.1}
          value={invoice.taxRate}
          onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">{t.inputs.items}</label>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-1" /> {t.inputs.addItem}
          </Button>
        </div>
        <div className="space-y-2">
          {invoice.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Input
                className="flex-1"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                placeholder={t.inputs.itemName}
              />
              <Input
                className="w-20"
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
              />
              <Input
                className="w-28"
                type="number"
                min={0}
                value={item.price}
                onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                placeholder={t.inputs.unitPrice}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                disabled={invoice.items.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.notes}</label>
        <Input
          value={invoice.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder={t.inputs.notesPlaceholder}
        />
      </div>

      <div className="flex space-x-2">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? t.inputs.backToInput : t.inputs.preview}
        </Button>
        <Button variant="secondary" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-1" /> {t.inputs.print}
        </Button>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-md">
        <h3 className="font-semibold mb-2">{t.results.summary}</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>{t.results.itemCount}</span>
            <span>{invoice.items.length}{t.results.countUnit}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.results.subtotal}</span>
            <span>{formatCurrency(getSubtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.results.tax.replace('{rate}', String(invoice.taxRate))}</span>
            <span>{formatCurrency(getTax())}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>{t.results.total}</span>
            <span>{formatCurrency(getTotal())}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center">{t.results.previewHint}</p>
    </div>
  );

  const fullWidthSection = showPreview ? (
    <div className="space-y-4 print:shadow-none">
      <div className="border-2 border-gray-800 p-6 bg-white text-black">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">{invoice.companyName || t.inputs.companyName}</h2>
            <p className="text-sm text-gray-600">{invoice.companyAddress}</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold">{t.preview.invoiceLabel}</h3>
            <p className="text-sm">{t.preview.number} {invoice.invoiceNumber}</p>
            <p className="text-sm">{t.preview.date} {invoice.invoiceDate}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-sm text-gray-500 mb-1">{t.preview.billTo}</h4>
          <p className="font-semibold">{invoice.clientName || t.inputs.clientName}</p>
          <p className="text-sm text-gray-600">{invoice.clientAddress}</p>
        </div>

        <table className="w-full mb-6 text-sm">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="text-left py-2">{t.preview.itemHeader}</th>
              <th className="text-center py-2 w-20">{t.preview.quantityHeader}</th>
              <th className="text-right py-2 w-28">{t.preview.unitPriceHeader}</th>
              <th className="text-right py-2 w-28">{t.preview.amountHeader}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2">{item.name || '-'}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">{formatCurrency(item.price)}</td>
                <td className="text-right py-2">{formatCurrency(item.quantity * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>{t.preview.subtotalLabel}</span>
              <span>{formatCurrency(getSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.preview.taxLabel.replace('{rate}', String(invoice.taxRate))}</span>
              <span>{formatCurrency(getTax())}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t-2 border-gray-800 pt-2 mt-2">
              <span>{t.preview.totalLabel}</span>
              <span>{formatCurrency(getTotal())}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-sm text-gray-500 mb-1">{t.preview.notesLabel}</h4>
            <p className="text-sm">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  ) : null;

    const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{t.info.title}</strong> {t.info.p1}
        </p>
        <p>{t.info.p2}</p>
        <p>{t.info.p3}</p>
        <p className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          {t.info.tip}
        </p>
        <TermGlossary
          items={[
            { term: t.glossary.invoice.term, desc: t.glossary.invoice.desc },
            { term: t.glossary.vat.term, desc: t.glossary.vat.desc },
            { term: t.glossary.subtotal.term, desc: t.glossary.subtotal.desc },
            { term: t.glossary.taxInvoice.term, desc: t.glossary.taxInvoice.desc },
          ]}
        />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.itemAmount}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-lg font-bold">{t.formula.itemFormula}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.subtotal}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-lg font-bold">{t.formula.subtotalFormula}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.taxTotal}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center space-y-1">
            <p className="font-mono text-sm">{t.formula.taxFormula}</p>
            <p className="font-mono text-sm">{t.formula.totalFormula}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t.formula.example}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.itemEntry}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.itemTip1}</li>
            <li>{t.tips.itemTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.taxSetup}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.taxTip1}</li>
            <li>{t.tips.taxTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.invoiceNumber}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.numTip1}</li>
            <li>{t.tips.numTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.printStore}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.printTip1}</li>
            <li>{t.tips.printTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.legalReqs}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.legalTip1}</li>
            <li>{t.tips.legalTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.notes}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.notesTip1}</li>
            <li>{t.tips.notesTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('회사(판매자)와 고객(구매자) 정보를 입력하세요.', 'Enter your company (seller) and customer (buyer) information.')}</li>
          <li>{L('항목 추가 버튼으로 품목을 추가하고 이름, 수량, 단가를 입력하세요.', 'Click add item to enter each line item with its name, quantity, and unit price.')}</li>
          <li>{L('적용할 세율(%)을 설정하세요.', 'Set the tax rate (%) to apply.')}</li>
          <li>{L('미리보기로 확인한 뒤 인쇄 또는 다운로드하여 발행하세요.', 'Review the preview, then print or download to issue the invoice.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('2개 상품에 10% 세금', 'Two Items with 10% Tax')}</h4>
          <p>{L('단가 $50 상품 2개를 추가하면 소계(subtotal)는 $100, 세금은 $10, 총액은 $110이 됩니다.', 'Add 2 items priced at $50 each: the subtotal is $100, the tax is $10, and the total is $110.')}</p>
          <code className="block bg-muted p-2 rounded-md my-2 text-xs">
            {L('소계 = 수량 × 단가 = 2 × $50 = $100', 'Subtotal = quantity × unit price = 2 × $50 = $100')}
          </code>
          <code className="block bg-muted p-2 rounded-md my-2 text-xs">
            {L('세금 = 소계 × 세율 = $100 × 10% = $10', 'Tax = subtotal × rate = $100 × 10% = $10')}
          </code>
          <p className="text-xs">{L('총액 = 소계 + 세금 = $110', 'Total = subtotal + tax = $110')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('수량과 단가 계산', 'Quantity x Unit Price')}</h4>
          <p>{L('수량 5, 단가 $20인 항목은 항목 금액 $100으로 계산되며, 이후 소계와 세금에 합산됩니다.', 'An item with quantity 5 and unit price $20 is calculated as $100, which is then added to the subtotal and taxed.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('세율 0%', 'Zero Tax Rate')}</h4>
          <p>{L('세율을 0%로 설정하면 세금 없이 소계가 총액과 같아집니다. 면세 거래에 유용합니다.', 'Setting the tax rate to 0% makes the subtotal equal the total with no tax, useful for tax-exempt transactions.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('세금은 어떻게 계산되나요?', 'How is the tax calculated?'),
            a: L('세금은 소계(모든 항목 금액의 합)에 설정한 세율을 곱해 계산합니다. 예: 소계 $100에 세율 10%면 세금은 $10입니다.', 'Tax is calculated by multiplying the subtotal (the sum of all line items) by the tax rate you set. Example: a $100 subtotal at 10% gives $10 of tax.'),
          },
          {
            q: L('인보이스와 영수증의 차이는 무엇인가요?', 'What is the difference between an invoice and a receipt?'),
            a: L('인보이스는 대금 지급을 요청하는 문서로 결제 전에 발행되고, 영수증은 결제 완료를 증명하는 문서로 결제 후에 발행됩니다.', 'An invoice is a document requesting payment and is issued before payment, while a receipt proves that payment has been made and is issued after payment.'),
          },
          {
            q: L('유효한 인보이스에는 무엇이 필요한가요?', 'What does a valid invoice require?'),
            a: L('판매자와 구매자 정보, 고유 인보이스 번호, 발행일, 품목·수량·단가, 소계, 세금, 총액이 포함되어야 합니다. 이 계산기가 이 모든 요소를 제공합니다.', 'A valid invoice needs seller and buyer details, a unique invoice number, issue date, item/quantity/unit price, subtotal, tax, and total. This calculator covers all of these.'),
          },
          {
            q: L('PDF로 내보내거나 인쇄할 수 있나요?', 'Can I export to PDF or print?'),
            a: L('네. 인쇄 버튼을 누르면 브라우저의 인쇄 대화상자가 열리며, 여기서 "PDF로 저장"을 선택하거나 프린터로 출력할 수 있습니다.', 'Yes. Press the print button to open your browser print dialog, where you can choose "Save as PDF" or send it to a printer.'),
          },
          {
            q: L('통화 형식은 어떻게 설정되나요?', 'How is the currency formatted?'),
            a: L('금액은 원(₩) 단위로 표시되며 수량과 단가를 입력한 대로 자동 계산됩니다. 필요한 통화가 있다면 숫자를 직접 해당 통화 값으로 입력할 수 있습니다.', 'Amounts are shown in won (₩) and computed automatically from the quantities and unit prices you enter. If you need a different currency, simply enter the numbers using that currency.'),
          },
        ].map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      variant="grouped"
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={t.preview.title}
      infoSection={infoSection}
    />
  );
};

export default InvoiceGenerator;
