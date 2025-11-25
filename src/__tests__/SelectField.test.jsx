// src/__tests__/SelectField.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from '../components/ui/SelectField';

describe('SelectField', () => {
  const defaultProps = {
    label: 'Test Select',
    id: 'test-select',
    value: '',
    onChange: vi.fn(),
    options: ['Option 1', 'Option 2', 'Option 3'],
    isRTL: false
  };

  it('renders all options', () => {
    render(<SelectField {...defaultProps} />);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    render(<SelectField {...defaultProps} />);
    
    const select = screen.getByLabelText('Test Select');
    fireEvent.change(select, { target: { value: 'Option 2' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('Option 2');
  });

  it('shows error state', () => {
    render(<SelectField {...defaultProps} error="Invalid selection" />);
    
    expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveClass('error');
  });
});