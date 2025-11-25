import { useReducer, useCallback } from "react";
import { initialFormData } from "../utils/constants";
import { storage } from "../utils/storage";

// Reducer function for managing form state - uses the reducer pattern for predictable state updates
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      // Update a specific field while preserving other state - immutable update
      return { ...state, [action.field]: action.value };
    case "LOAD_DATA":
      // Merge loaded data with initial form data (loaded data takes precedence)
      return { ...initialFormData, ...action.payload };
    case "RESET":
      // Return to initial empty state
      return initialFormData;
    default:
      // Always return state for unknown actions
      return state;
  }
};

// Main custom hook - encapsulates form state management logic
export const useForm = () => {
  // useReducer provides more predictable state updates than useState for complex state
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  // useCallback prevents unnecessary re-renders by memoizing functions
  const updateField = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []); // Empty dependency array means this function never changes

  const loadData = useCallback((data) => {
    dispatch({ type: "LOAD_DATA", payload: data });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Persistence functions - abstract storage implementation details
  const saveProgress = useCallback((data) => {
    return storage.save("social_support_application", data);
  }, []);

  const loadProgress = useCallback(() => {
    return storage.load("social_support_application");
  }, []);

  // Return public API of the hook
  return {
    formData,          // Current form state
    updateField,       // Function to update individual fields
    loadData,          // Function to bulk load data
    resetForm,         // Function to reset form to initial state
    saveProgress,      // Function to save to storage
    loadProgress,      // Function to load from storage
  };
};