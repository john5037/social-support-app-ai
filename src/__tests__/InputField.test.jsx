// src/__tests__/InputField.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../components/ui/InputField';

describe('InputField', () => {
  const defaultProps = {
    label: 'Test Input',
    id: 'test-input',
    value: '',
    onChange: vi.fn(),
    isRTL: false
  };

  it('renders with label and required asterisk', () => {
    render(<InputField {...defaultProps} required={true} />);
    
    expect(screen.getByLabelText(/Test Input/)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles text input changes', () => {
    render(<InputField {...defaultProps} />);
    
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('New Value');
  });

  it('handles number input changes', () => {
    render(<InputField {...defaultProps} type="number" />);
    
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: '42' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(42);
  });

  it('shows error message when error prop is provided', () => {
    render(<InputField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('renders with RTL alignment when isRTL is true', () => {
    render(<InputField {...defaultProps} isRTL={true} />);
    
    const label = screen.getByText('Test Input');
    expect(label).toHaveClass('text-end');
  });
});