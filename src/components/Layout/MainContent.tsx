import type { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 flex items-center justify-center">
      <div className="w-full py-6 px-4 sm:px-6 lg:px-8 pt-16 md:pt-6">
        {children}
      </div>
    </main>
  );
}
