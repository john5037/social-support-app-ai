// src/__tests__/FormStep1.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormStep1 from '../components/forms/FormStep1';

describe('FormStep1', () => {
  const defaultProps = {
    data: {
      name: '',
      nationalId: '',
      dob: '',
      gender: 'Male',
      address: '',
      city: '',
      state: '',
      country: 'UAE',
      phone: '',
      email: ''
    },
    updateField: vi.fn(),
    texts: {
      name: 'Full Name',
      nationalId: 'National ID',
      dob: 'Date of Birth',
      gender: 'Gender',
      address: 'Address',
      city: 'City',
      state: 'State',
      country: 'Country',
      phone: 'Phone',
      email: 'Email',
      genderOptions: ['Male', 'Female', 'Other']
    },
    isRTL: false,
    errors: {}
  };

  it('renders all personal information fields', () => {
    render(<FormStep1 {...defaultProps} />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('National ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
  });

  it('calls updateField when input values change', () => {
    render(<FormStep1 {...defaultProps} />);
    
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    expect(defaultProps.updateField).toHaveBeenCalledWith('name', 'John Doe');
  });

  it('displays error messages', () => {
    const errors = {
      name: 'Name is required',
      email: 'Invalid email format'
    };
    
    render(<FormStep1 {...defaultProps} errors={errors} />);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});