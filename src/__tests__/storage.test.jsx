// src/__tests__/storage.test.js
import { storage } from '../utils/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('storage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('saves data to localStorage', () => {
    const testData = { name: 'John', age: 30 };
    
    const result = storage.save('test-key', testData);
    
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(testData));
  });

  it('loads data from localStorage', () => {
    const testData = { name: 'John', age: 30 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));
    
    const result = storage.load('test-key');
    
    expect(result).toEqual(testData);
    expect(localStorage.getItem).toHaveBeenCalledWith('test-key');
  });

  it('returns null when loading non-existent key', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const result = storage.load('non-existent-key');
    
    expect(result).toBeNull();
  });

  it('removes data from localStorage', () => {
    storage.remove('test-key');
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('test-key');
  });
});