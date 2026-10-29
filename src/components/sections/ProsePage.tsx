'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProsePageProps {
  title: string;
  children: React.ReactNode;
}

export default function ProsePage({ title, children }: ProsePageProps) {
  const router = useRouter();
  const pathname = usePathname() || '';

  const handleBackClick = () => {
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');
    if (pathSegments.length > 1) {
      const parentPath = '/' + pathSegments.slice(0, -1).join('/');
      router.push(parentPath);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-background min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={handleBackClick}
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground break-keep">{title}</h1>
        </div>
        <div className="space-y-8 text-base leading-relaxed text-foreground break-keep">{children}</div>
      </div>
    </div>
  );
}

export function ProseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
