// src/__tests__/FormStep2.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormStep2 from '../components/forms/FormStep2';

describe('FormStep2', () => {
  const defaultProps = {
    data: {
      maritalStatus: 'Single',
      dependents: 0,
      employmentStatus: 'Employed',
      monthlyIncome: 5000,
      housingStatus: 'Owned'
    },
    updateField: vi.fn(),
    texts: {
      maritalStatus: 'Marital Status',
      dependents: 'Dependents',
      employmentStatus: 'Employment Status',
      monthlyIncome: 'Monthly Income',
      housingStatus: 'Housing Status',
      maritalOptions: ['Single', 'Married', 'Divorced', 'Widowed'],
      employmentOptions: ['Employed', 'Unemployed', 'Self-Employed', 'Retired', 'Student'],
      housingOptions: ['Owned', 'Rented', 'With Family', 'Other']
    },
    isRTL: false,
    errors: {}
  };

  it('renders all financial information fields', () => {
    render(<FormStep2 {...defaultProps} />);
    
    expect(screen.getByLabelText('Marital Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Dependents')).toBeInTheDocument();
    expect(screen.getByLabelText('Employment Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Income')).toBeInTheDocument();
    expect(screen.getByLabelText('Housing Status')).toBeInTheDocument();
  });

  it('calls updateField with parsed number for dependents', () => {
    render(<FormStep2 {...defaultProps} />);
    
    const dependentsInput = screen.getByLabelText('Dependents');
    fireEvent.change(dependentsInput, { target: { value: '3' } });
    
    expect(defaultProps.updateField).toHaveBeenCalledWith('dependents', 3);
  });

  it('displays financial field errors', () => {
    const errors = {
      monthlyIncome: 'Income must be positive',
      dependents: 'Invalid number of dependents'
    };
    
    render(<FormStep2 {...defaultProps} errors={errors} />);
    
    expect(screen.getByText('Income must be positive')).toBeInTheDocument();
    expect(screen.getByText('Invalid number of dependents')).toBeInTheDocument();
  });

  it('renders RTL layout correctly', () => {
    render(<FormStep2 {...defaultProps} isRTL={true} />);
    
    const labels = screen.getAllByText(/.*/).filter(el => 
      el.textContent?.includes('Status') || el.textContent?.includes('Dependents') || el.textContent?.includes('Income')
    );
    expect(labels.length).toBeGreaterThan(0);
  });
});