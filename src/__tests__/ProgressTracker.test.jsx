// src/__tests__/ProgressTracker.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressTracker from '../components/ui/ProgressTracker';

describe('ProgressTracker', () => {
  const steps = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Financial Info' },
    { id: 3, title: 'Review' }
  ];

  it('renders all steps with correct labels', () => {
    render(<ProgressTracker currentStep={1} steps={steps} isRTL={false} />);
    
    expect(screen.getByText('1. Personal Info')).toBeInTheDocument();
    expect(screen.getByText('2. Financial Info')).toBeInTheDocument();
    expect(screen.getByText('3. Review')).toBeInTheDocument();
  });

  it('has correct ARIA attributes for accessibility', () => {
    render(<ProgressTracker currentStep={2} steps={steps} isRTL={false} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAttribute('aria-valuemin', '1');
    expect(progressbar).toHaveAttribute('aria-valuemax', '3');
  });

  it('renders RTL version correctly', () => {
    render(<ProgressTracker currentStep={1} steps={steps} isRTL={true} />);
    
    const tracker = screen.getByRole('progressbar');
    expect(tracker).toHaveClass('rtl');
  });
});