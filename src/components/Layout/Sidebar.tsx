import clsx from 'clsx';
import type { CalculatorConfig } from '../../calculators/types';

interface SidebarProps {
  calculators: CalculatorConfig[];
  activeCalculatorId: string;
  onSelectCalculator: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  calculators,
  activeCalculatorId,
  onSelectCalculator,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const handleSelectCalculator = (id: string) => {
    onSelectCalculator(id);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed md:static inset-y-0 z-50',
          'right-0 md:left-0 md:right-auto',
          'w-100 bg-white/95 md:bg-white backdrop-blur-md md:backdrop-blur-none',
          'md:border-r border-l md:border-l-0 border-gray-200 shadow-2xl md:shadow-none',
          'transform transition-transform duration-300 ease-in-out md:transform-none',
          'flex flex-col',
          {
            'translate-x-0': isOpen,
            'translate-x-full md:translate-x-0': !isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Financial Calculators
            </h1>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {calculators.map((calculator) => (
              <li key={calculator.id}>
                <button
                  onClick={() => handleSelectCalculator(calculator.id)}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    {
                      'bg-blue-50 text-blue-700 font-medium':
                        activeCalculatorId === calculator.id,
                      'text-gray-700 hover:bg-gray-100':
                        activeCalculatorId !== calculator.id,
                    }
                  )}
                >
                  <div className="flex items-center">
                    {calculator.icon && (
                      <span className="mr-3 text-lg">{calculator.icon}</span>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {calculator.name}
                      </div>
                      {calculator.description && (
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {calculator.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
