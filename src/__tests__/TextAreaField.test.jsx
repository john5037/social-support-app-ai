// src/__tests__/TextAreaField.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextAreaField from '../components/ui/TextAreaField';

describe('TextAreaField', () => {
  const defaultProps = {
    label: 'Test Textarea',
    id: 'test-textarea',
    value: '',
    onChange: vi.fn(),
    isRTL: false
  };

  it('renders AI assist button when isAIAssisted is true', () => {
    const onHelpMeWrite = vi.fn();
    
    render(
      <TextAreaField 
        {...defaultProps} 
        isAIAssisted={true} 
        onHelpMeWrite={onHelpMeWrite} 
      />
    );
    
    const aiButton = screen.getByText('Help Me Write');
    expect(aiButton).toBeInTheDocument();
    
    fireEvent.click(aiButton);
    expect(onHelpMeWrite).toHaveBeenCalled();
  });

  it('disables AI button when disabled prop is true', () => {
    render(
      <TextAreaField 
        {...defaultProps} 
        isAIAssisted={true} 
        onHelpMeWrite={vi.fn()}
        disabled={true}
      />
    );
    
    const aiButton = screen.getByText('Help Me Write');
    expect(aiButton).toBeDisabled();
  });

  it('renders RTL version correctly', () => {
    render(
      <TextAreaField 
        {...defaultProps} 
        isRTL={true}
        isAIAssisted={true}
        onHelpMeWrite={vi.fn()}
      />
    );
    
    expect(screen.getByText('ساعدني في الكتابة')).toBeInTheDocument();
  });
});