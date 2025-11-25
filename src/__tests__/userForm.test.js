import { renderHook, act } from '@testing-library/react';
import { useForm } from '../hooks/useForm';
import { storage } from '../utils/storage';

// Mock the storage module
vi.mock('../utils/storage', () => ({
  storage: {
    save: vi.fn(),
    load: vi.fn(),
    remove: vi.fn()
  }
}));

describe('useForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default form data', () => {
    const { result } = renderHook(() => useForm());
    
    expect(result.current.formData).toEqual({
      name: "",
      nationalId: "",
      dob: "",
      gender: "Male",
      address: "",
      city: "",
      state: "",
      country: "UAE",
      phone: "",
      email: "",
      maritalStatus: "Single",
      dependents: 0,
      employmentStatus: "Employed",
      monthlyIncome: 0,
      housingStatus: "Owned",
      financialSituation: "",
      employmentCircumstances: "",
      reasonForApplying: "",
    });
  });

  it('should update field values', () => {
    const { result } = renderHook(() => useForm());
    
    act(() => {
      result.current.updateField('name', 'John Doe');
    });
    
    expect(result.current.formData.name).toBe('John Doe');
  });

  it('should load data from storage', () => {
    const savedData = { name: 'Saved Name', email: 'saved@test.com' };
    storage.load.mockReturnValue(savedData);
    
    const { result } = renderHook(() => useForm());
    
    act(() => {
      result.current.loadData(savedData);
    });
    
    expect(result.current.formData.name).toBe('Saved Name');
    expect(result.current.formData.email).toBe('saved@test.com');
  });

  it('should reset form to initial state', () => {
    const { result } = renderHook(() => useForm());
    
    // First update a field
    act(() => {
      result.current.updateField('name', 'John Doe');
    });
    
    // Then reset
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.formData.name).toBe("");
  });
});