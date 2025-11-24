import { useReducer, useCallback } from "react";
import { initialFormData } from "../utils/constants";
import { storage } from "../utils/storage";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOAD_DATA":
      return { ...initialFormData, ...action.payload };
    case "RESET":
      return initialFormData;
    default:
      return state;
  }
};

export const useForm = () => {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const updateField = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);

  const loadData = useCallback((data) => {
    dispatch({ type: "LOAD_DATA", payload: data });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const saveProgress = useCallback((data) => {
    return storage.save("social_support_application", data);
  }, []);

  const loadProgress = useCallback(() => {
    return storage.load("social_support_application");
  }, []);

  return {
    formData,
    updateField,
    loadData,
    resetForm,
    saveProgress,
    loadProgress,
  };
};
