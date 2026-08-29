import React from 'react';
import Link from 'next/link';
import { Facebook, Youtube, Linkedin, Twitter, Instagram } from 'lucide-react';
import type { Dictionary } from '@/i18n/config';

interface FooterSectionProps {
  dict: Dictionary;
  locale: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ dict, locale }) => {
  const f = dict.footer;
  const lp = (path: string) => `/${locale}${path}`;

  return (
    <footer className="bg-card py-12 md:py-16 lg:py-10 mt-20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-16 mb-12">
        {/* 왼쪽 섹션 - 로고 */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-foreground">SeriesCalc</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {locale === 'ko'
                ? '일상부터 전문 분야까지, 계산기 모두 한곳에.'
                : 'Every calculator you need — from daily life to professional fields.'}
            </p>
          </div>

          {/* 오른쪽 섹션 - 링크 그룹 */}
          <div className="lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">{f.about}</h3>
              <ul className="space-y-2">
                <li><Link href={lp('/about')} className="text-muted-foreground hover:text-foreground">{f.about}</Link></li>
                <li><Link href={lp('/contact')} className="text-muted-foreground hover:text-foreground">{f.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">{f.privacyPolicy}</h3>
              <ul className="space-y-2">
                <li><Link href={lp('/privacy-policy')} className="text-muted-foreground hover:text-foreground">{f.privacyPolicy}</Link></li>
                <li><Link href={lp('/terms-of-service')} className="text-muted-foreground hover:text-foreground">{f.termsOfService}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} SeriesCalc. {f.copyright}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
