'use client';

import { useState, useRef } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ImageConverterProps {
  infoSection: InfoSection;
}

const ImageConverter = ({ infoSection }: ImageConverterProps) => {
  const { dict, locale } = useI18n();
  const t = dict.imageConverter;
  const isKo = locale === 'ko';
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState<number>(92);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(t.errorSelectFile);
      return;
    }

    setError('');
    setImageFile(file);
    setOriginalSize(file.size);
    setConvertedUrl('');
    setConvertedSize(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!imageFile) return;

    setIsConverting(true);
    setError('');

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError(t.errorCanvas);
        setIsConverting(false);
        return;
      }

      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
            setConvertedSize(blob.size);
          } else {
            setError(t.errorConversion);
          }
          setIsConverting(false);
        },
        outputFormat,
        outputFormat === 'image/jpeg' || outputFormat === 'image/webp' ? quality / 100 : undefined
      );
    };

    img.onerror = () => {
      setError(t.errorLoad);
      setIsConverting(false);
    };

    img.src = preview;
  };

  const download = () => {
    if (!convertedUrl) return;
    const ext = outputFormat.split('/')[1];
    const a = document.createElement('a');
    a.href = convertedUrl;
    a.download = `converted-image.${ext}`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.uploadLabel}</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
          {imageFile ? imageFile.name : t.chooseButton}
        </Button>
        {imageFile && (
          <p className="text-xs text-muted-foreground text-center">
            {t.convertedInfo.replace('{size}', formatSize(originalSize)).replace('{format}', imageFile.type.split('/')[1].toUpperCase())}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.formatLabel}</label>
        <div className="flex gap-2">
          {(['image/png', 'image/jpeg', 'image/webp'] as OutputFormat[]).map((fmt) => (
            <Button
              key={fmt}
              variant={outputFormat === fmt ? 'default' : 'outline'}
              onClick={() => setOutputFormat(fmt)}
              className="flex-1"
            >
              {fmt.split('/')[1].toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {(outputFormat === 'image/jpeg' || outputFormat === 'image/webp') && (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.qualityLabel.replace('{quality}', String(quality))}</label>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <Button onClick={convert} disabled={!imageFile || isConverting} className="w-full">
        {isConverting ? t.converting : t.convertButton}
      </Button>
    </div>
  );

  const resultSection = convertedUrl ? (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>{t.convertedInfo.replace('{size}', formatSize(convertedSize)).replace('{format}', outputFormat.split('/')[1].toUpperCase())}</p>
        <p>{t.savedInfo.replace('{size}', formatSize(Math.abs(originalSize - convertedSize))).replace('{percent}', String(Math.round((1 - convertedSize / originalSize) * 100)))}</p>
      </div>
      <Button variant="outline" size="sm" onClick={download} className="w-full">{t.downloadButton}</Button>
      <div className="flex items-center justify-center bg-muted rounded-lg p-2">
        <img src={convertedUrl} alt="Converted" className="max-h-[300px] object-contain rounded" />
      </div>
    </div>
  ) : preview ? (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">{t.originalPreview}</p>
      <div className="flex items-center justify-center bg-muted rounded-lg p-2">
        <img src={preview} alt="Original" className="max-h-[300px] object-contain rounded" />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground h-full">
      {t.emptyPrompt}
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

export default ImageConverter;
