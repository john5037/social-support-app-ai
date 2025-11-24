// Theme Colors
export const COLOR_PRIMARY = "indigo-800";
export const COLOR_ACCENT = "amber-500";

// Gemini API Configuration

export const GEMINI_API_URL =
  import.meta.env.VITE_GEMINI_API_URL ||
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
export const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";'';

// I18N Data
export const i18n = {
  en: {
    appTitle: "Social Support Application",
    appSubtitle: "Secure and quick application for financial assistance.",
    next: "Next",
    previous: "Previous",
    submit: "Submit Application",
    helpMeWrite: "Help Me Write",
    loading: "Loading...",
    saving: "Saving Progress...",
    error: "An error occurred.",
    success: "Success!",
    fieldRequired: "This field is required.",
    welcome: "Welcome! We're here to help you through the process.",
    submissionSuccess: "Your application has been successfully submitted.",
    submissionError: "Failed to submit application. Please try again.",
    saveSuccess: "Progress saved successfully.",
    saveError: "Failed to save progress.",
    aiError: "AI service failed. Please try again later.",

    steps: [
      { id: 1, title: "Personal Information" },
      { id: 2, title: "Family & Financial Info" },
      { id: 3, title: "Situation Descriptions" },
    ],

    name: "Full Name",
    nationalId: "National ID",
    dob: "Date of Birth",
    gender: "Gender",
    address: "Address Line 1",
    city: "City",
    state: "State/Region",
    country: "Country",
    phone: "Phone Number",
    email: "Email Address",
    genderOptions: ["Male", "Female", "Other"],

    maritalStatus: "Marital Status",
    dependents: "Dependents (Count)",
    employmentStatus: "Employment Status",
    monthlyIncome: "Monthly Income (AED)",
    housingStatus: "Housing Status",
    maritalOptions: ["Single", "Married", "Divorced", "Widowed"],
    employmentOptions: [
      "Employed",
      "Unemployed",
      "Self-Employed",
      "Retired",
      "Student",
    ],
    housingOptions: ["Owned", "Rented", "With Family", "Other"],

    financialSituation: "Current Financial Situation (Required for AI)",
    employmentCircumstances: "Employment Circumstances (Required for AI)",
    reasonForApplying: "Reason for Applying (Required for AI)",

    aiModalTitle: (field) => `AI Suggestion for ${field}`,
    aiModalSubtitle:
      "Review the suggested text below. You can accept it, or modify it before accepting.",
    accept: "Accept Suggestion",
    edit: "Edit Text",
    discard: "Discard",
  },
  ar: {
    appTitle: "بوابة الدعم الاجتماعي",
    appSubtitle: "تقديم طلب دعم مالي بسرعة وأمان.",
    next: "التالي",
    previous: "السابق",
    submit: "تقديم الطلب",
    helpMeWrite: "ساعدني في الكتابة",
    loading: "جار التحميل...",
    saving: "جار حفظ التقدم...",
    error: "حدث خطأ ما.",
    success: "نجاح!",
    fieldRequired: "هذا الحقل مطلوب.",
    welcome: "مرحباً! نحن هنا لمساعدتك في إكمال العملية.",
    submissionSuccess: "تم تقديم طلبك بنجاح.",
    submissionError: "فشل في تقديم الطلب. يرجى المحاولة مرة أخرى.",
    saveSuccess: "تم حفظ التقدم بنجاح.",
    saveError: "فشل في حفظ التقدم.",
    aiError: "فشلت خدمة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقاً.",

    steps: [
      { id: 1, title: "المعلومات الشخصية" },
      { id: 2, title: "المعلومات الأسرية والمالية" },
      { id: 3, title: "وصف الحالة" },
    ],

    name: "الاسم الكامل",
    nationalId: "الرقم القومي",
    dob: "تاريخ الميلاد",
    gender: "النوع",
    address: "العنوان سطر 1",
    city: "المدينة",
    state: "الإمارة/المنطقة",
    country: "الدولة",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    genderOptions: ["ذكر", "أنثى", "أخرى"],

    maritalStatus: "الحالة الاجتماعية",
    dependents: "عدد المعالين",
    employmentStatus: "حالة التوظيف",
    monthlyIncome: "الدخل الشهري (د.إ)",
    housingStatus: "حالة السكن",
    maritalOptions: ["أعزب", "متزوج", "مطلق", "أرمل"],
    employmentOptions: ["موظف", "عاطِل عن العمل", "عمل حر", "متقاعد", "طالب"],
    housingOptions: ["مملوك", "مستأجر", "مع العائلة", "أخرى"],

    financialSituation: "الوضع المالي الحالي (مطلوب للمساعدة)",
    employmentCircumstances: "ظروف التوظيف (مطلوب للمساعدة)",
    reasonForApplying: "سبب تقديم الطلب (مطلوب للمساعدة)",

    aiModalTitle: (field) => `اقتراح الذكاء الاصطناعي لـ ${field}`,
    aiModalSubtitle:
      "راجع النص المقترح أدناه. يمكنك قبوله، أو تعديله قبل القبول.",
    accept: "قبول الاقتراح",
    edit: "تعديل النص",
    discard: "إلغاء",
  },
};

// Initial Form Data
export const initialFormData = {
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
};
