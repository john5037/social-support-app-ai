// src/__tests__/Toast.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toast from '../components/ui/Toast';

describe('Toast', () => {
  const onClose = vi.fn();

  it('does not render when message is empty', () => {
    const { container } = render(<Toast message="" onClose={onClose} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders success toast with correct icon', () => {
    render(<Toast type="success" message="Success message" onClose={onClose} />);
    
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('toast-success');
  });

  it('renders error toast with correct icon', () => {
    render(<Toast type="error" message="Error message" onClose={onClose} />);
    
    expect(screen.getByText('✕')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('toast-error');
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast message="Test message" onClose={onClose} />);
    
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders RTL close button', () => {
    render(<Toast message="Test message" onClose={onClose} isRTL={true} />);
    
    expect(screen.getByLabelText('إغلاق')).toBeInTheDocument();
  });
});