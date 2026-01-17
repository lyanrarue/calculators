import { useState } from 'react';
import { calculatorRegistry } from './calculators/registry';
import { Sidebar } from './components/Layout/Sidebar';
import { MobileMenuButton } from './components/Layout/MobileMenuButton';
import { MainContent } from './components/Layout/MainContent';
import { CalculatorForm } from './components/Calculator/CalculatorForm';
import { useMobileMenu } from './hooks/useMobileMenu';

function App() {
  const [activeCalculatorId, setActiveCalculatorId] = useState(
    calculatorRegistry[0]?.id || ''
  );
  const { isOpen, toggle, close } = useMobileMenu();

  const activeCalculator = calculatorRegistry.find(
    (calc) => calc.id === activeCalculatorId
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        calculators={calculatorRegistry}
        activeCalculatorId={activeCalculatorId}
        onSelectCalculator={setActiveCalculatorId}
        isOpen={isOpen}
        onClose={close}
      />

      {/* Main Content Area */}
      <MainContent>
        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={toggle} />

        {/* Calculator Form */}
        {activeCalculator ? (
          <CalculatorForm config={activeCalculator} />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No calculator selected</p>
          </div>
        )}
      </MainContent>
    </div>
  );
}

export default App;
