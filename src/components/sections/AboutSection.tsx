import React from 'react';
import Link from 'next/link';

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          SeriesCalc에 오신 것을 환영합니다!
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          SeriesCalc는 일상과 전문 작업에 필요한 계산기를 한곳에 모아둔
          종합 계산기 플랫폼입니다. 복잡한 수식부터 간단한 변환까지,
          직관적인 인터페이스로 빠르고 정확한 결과를 제공합니다.
        </p>
        <p className="mt-2 text-lg font-semibold leading-8 text-gray-700 dark:text-gray-200">
          SeriesCalc는 여러분의 시간과 노력을 아끼기 위해 계속 노력합니다.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            더 알아보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;