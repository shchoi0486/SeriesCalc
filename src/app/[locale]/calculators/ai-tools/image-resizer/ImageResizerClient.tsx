'use client';

import { useState, useRef, useCallback } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ImageResizerProps {
  infoSection: InfoSection;
}

const ImageResizer = ({ infoSection }: ImageResizerProps) => {
  const { dict, locale } = useI18n();
  const t = dict.imageResizer;
  const isKo = locale === 'ko';
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(event.target?.result as string);
        setOriginalSize({ width: img.width, height: img.height });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        setResultImage(null);
        imgRef.current = img;
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleWidthChange = (value: number) => {
    setTargetWidth(value);
    if (maintainAspect && originalSize.width > 0) {
      setTargetHeight(Math.round((value / originalSize.width) * originalSize.height));
    }
  };

  const handleHeightChange = (value: number) => {
    setTargetHeight(value);
    if (maintainAspect && originalSize.height > 0) {
      setTargetWidth(Math.round((value / originalSize.height) * originalSize.width));
    }
  };

  const resize = () => {
    if (!imgRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(imgRef.current, 0, 0, targetWidth, targetHeight);
    setResultImage(canvas.toDataURL('image/png'));
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = 'resized-image.png';
    a.click();
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.uploadLabel}</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
        />
      </div>
      {originalImage && (
        <>
          <div className="text-xs text-muted-foreground text-center">
            {t.originalSize.replace('{width}', String(originalSize.width)).replace('{height}', String(originalSize.height))}
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img src={originalImage} alt="Original" className="w-full h-auto" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.targetSize}</label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min={1}
                max={4000}
                value={targetWidth}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
              />
              <span className="text-muted-foreground">x</span>
              <Input
                type="number"
                min={1}
                max={4000}
                value={targetHeight}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="rounded"
              />
              <span className="text-muted-foreground">{t.maintainAspect}</span>
            </label>
          </div>
          <Button onClick={resize} className="w-full">{t.resizeButton}</Button>
        </>
      )}
    </div>
  );

  const resultSection = resultImage ? (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground text-center">
        {t.resultSize.replace('{width}', String(targetWidth)).replace('{height}', String(targetHeight))}
      </div>
      <Button variant="outline" size="sm" onClick={downloadImage} className="w-full">{t.downloadButton}</Button>
      <div className="border border-border rounded-lg overflow-hidden">
        <img src={resultImage} alt="Resized" className="w-full h-auto" />
      </div>
    </div>
  ) : originalImage ? (
    <div className="flex items-center justify-center text-muted-foreground h-full">
      {t.emptyPromptResize}
    </div>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground h-full">
      {t.emptyPromptUpload}
    </div>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
      variant="split"
     />
  );
};

export default ImageResizer;
