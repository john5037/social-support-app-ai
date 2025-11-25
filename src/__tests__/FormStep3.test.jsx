// src/__tests__/FormStep3.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormStep3 from '../components/forms/FormStep3';

describe('FormStep3', () => {
  const defaultProps = {
    data: {
      financialSituation: 'Current financial situation',
      employmentCircumstances: 'Employment circumstances',
      reasonForApplying: 'Reason for applying'
    },
    updateField: vi.fn(),
    texts: {
      financialSituation: 'Financial Situation',
      employmentCircumstances: 'Employment Circumstances',
      reasonForApplying: 'Reason for Applying',
      steps: [{}, {}, { title: 'Situation Descriptions' }]
    },
    isRTL: false,
    onHelpMeWrite: vi.fn(),
    isAISuggesting: false,
    errors: {}
  };

  it('renders all situation description fields with AI assistance', () => {
    render(<FormStep3 {...defaultProps} />);
    
    expect(screen.getByLabelText('Financial Situation')).toBeInTheDocument();
    expect(screen.getByLabelText('Employment Circumstances')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason for Applying')).toBeInTheDocument();
    
    // Should have AI assist buttons
    const helpButtons = screen.getAllByText('Help Me Write');
    expect(helpButtons).toHaveLength(3);
  });

  it('calls onHelpMeWrite when AI button is clicked', () => {
    render(<FormStep3 {...defaultProps} />);
    
    const firstHelpButton = screen.getAllByText('Help Me Write')[0];
    fireEvent.click(firstHelpButton);
    
    expect(defaultProps.onHelpMeWrite).toHaveBeenCalledWith('financialSituation');
  });

  it('disables fields during AI suggestion generation', () => {
    render(<FormStep3 {...defaultProps} isAISuggesting={true} />);
    
    const textareas = screen.getAllByRole('textbox');
    textareas.forEach(textarea => {
      expect(textarea).toBeDisabled();
    });
    
    const helpButtons = screen.getAllByText('Help Me Write');
    helpButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('shows RTL AI buttons', () => {
    render(<FormStep3 {...defaultProps} isRTL={true} />);
    
    expect(screen.getAllByText('ساعدني في الكتابة')[0]).toBeInTheDocument();
  });
});