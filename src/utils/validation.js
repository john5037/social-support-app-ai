export const validateStep = (currentData, currentStep, isRTL) => {
  const requiredFields = {
    1: [
      "name",
      "nationalId",
      "dob",
      "gender",
      "address",
      "city",
      "state",
      "country",
      "phone",
      "email",
    ],
    2: [
      "maritalStatus",
      "dependents",
      "employmentStatus",
      "monthlyIncome",
      "housingStatus",
    ],
    3: ["financialSituation", "employmentCircumstances", "reasonForApplying"],
  };

  const fields = requiredFields[currentStep] || [];
  const invalidFields = fields.filter((field) => {
    const value = currentData[field];
    return (
      !value ||
      String(value).trim() === "" ||
      (typeof value === "number" && value < 0) ||
      (field === "email" && value && !isValidEmail(value)) ||
      (field === "phone" && value && !isValidPhone(value))
    );
  });

  return {
    isValid: invalidFields.length === 0,
    message:
      invalidFields.length > 0
        ? isRTL
          ? "الرجاء ملء جميع الحقول المطلوبة في هذه الخطوة."
          : "Please fill in all required fields in this step."
        : null,
  };
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};
