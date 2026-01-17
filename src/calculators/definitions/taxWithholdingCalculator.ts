import type { CalculatorConfig } from '../types';

export const calculateExtraWithholdingsRequiredPerPayPeriod = (
  estimatedTaxBurden: number,
  currentWithholdingsThisYear: number,
  payPeriodsPerYear: number,
  currentPayPeriodsThisCalendarYear: number,
  currentWithholdingPerPeriod: number
): number => {
  const remainingWithholdingNeeded = estimatedTaxBurden - currentWithholdingsThisYear;
  const remainingPayPeriods = payPeriodsPerYear - currentPayPeriodsThisCalendarYear;
  const requiredWithholdingPerRemainingPeriod = remainingWithholdingNeeded / remainingPayPeriods;
  const extraWithholdingPerPeriod = requiredWithholdingPerRemainingPeriod - currentWithholdingPerPeriod;
  return extraWithholdingPerPeriod;
};

export const taxWithholdingCalculator: CalculatorConfig = {
  id: 'tax-withholding',
  name: 'Tax Withholding Calculator',
  description: '',
  inputs: [
    {
      name: 'estimatedTaxBurden',
      label: 'Estimated Taxes Owed',
      type: 'number',
      defaultValue: '',
      prefix: '$',
      step: 0.01,
      min: 0,
      placeholder: '50000.00',
      validation: (v) => {
        if (v === '' || v === null || v === undefined) return 'Required field';
        if (Number(v) < 0) return 'Cannot be negative';
        return true;
      },
      helpText: 'Your total estimated tax liability for the year',
    },
    {
      name: 'currentWithholdingsThisYear',
      label: 'Current Withholdings This Year',
      type: 'number',
      defaultValue: '',
      prefix: '$',
      step: 0.01,
      min: 0,
      placeholder: '15000.00',
      validation: (v) => {
        if (v === '' || v === null || v === undefined) return 'Required field';
        if (Number(v) < 0) return 'Cannot be negative';
        return true;
      },
      helpText: 'Total amount already withheld year-to-date',
    },
    {
      name: 'payPeriodsPerYear',
      label: 'Pay Periods Per Year',
      type: 'select',
      options: [
        { value: 12, label: 'Monthly (12)' },
        { value: 24, label: 'Semi-Monthly (24)' },
        { value: 26, label: 'Bi-Weekly (26)' },
        { value: 52, label: 'Weekly (52)' },
      ],
      defaultValue: 26,
    },
    {
      name: 'currentPayPeriodsThisCalendarYear',
      label: 'Current Pay Periods This Year',
      type: 'number',
      defaultValue: '',
      step: 1,
      min: 0,
      placeholder: '3',
      validation: (v) => {
        if (v === '' || v === null || v === undefined) return 'Required field';
        if (Number(v) < 0) return 'Cannot be negative';
        return true;
      },
      helpText: 'Number of pay periods that have already occurred this year',
    },
    {
      name: 'currentWithholdingPerPeriod',
      label: 'Current Withholding Per Period',
      type: 'number',
      defaultValue: '',
      prefix: '$',
      step: 0.01,
      min: 0,
      placeholder: '500.00',
      validation: (v) => {
        if (v === '' || v === null || v === undefined) return 'Required field';
        if (Number(v) < 0) return 'Cannot be negative';
        return true;
      },
      helpText: 'Amount currently being withheld each pay period',
    },
  ],
  calculate: (values) => {
    // Convert to numbers
    const estimatedTaxBurden = Number(values.estimatedTaxBurden);
    const currentWithholdingsThisYear = Number(values.currentWithholdingsThisYear);
    const payPeriodsPerYear = Number(values.payPeriodsPerYear);
    const currentPayPeriodsThisCalendarYear = Number(values.currentPayPeriodsThisCalendarYear);
    const currentWithholdingPerPeriod = Number(values.currentWithholdingPerPeriod);

    // Validation for edge cases
    const remainingPayPeriods = payPeriodsPerYear - currentPayPeriodsThisCalendarYear;

    if (remainingPayPeriods <= 0) {
      throw new Error('No remaining pay periods in the year');
    }

    if (currentPayPeriodsThisCalendarYear > payPeriodsPerYear) {
      throw new Error('Current pay periods cannot exceed total pay periods per year');
    }

    const result = calculateExtraWithholdingsRequiredPerPayPeriod(
      estimatedTaxBurden,
      currentWithholdingsThisYear,
      payPeriodsPerYear,
      currentPayPeriodsThisCalendarYear,
      currentWithholdingPerPeriod
    );

    return {
      type: 'single',
      value: result,
      label: 'Extra Withholding Per Period',
    };
  },
};
