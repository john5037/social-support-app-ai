import React, { useState, useEffect, useCallback, useRef } from "react";
import { Loader2, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProgressTracker from "./components/ui/ProgressTracker";
import Toast from "./components/ui/Toast";
import AIModal from "./components/ui/AIModal";
import FormStep1 from "./components/forms/FormStep1";
import FormStep2 from "./components/forms/FormStep2";
import FormStep3 from "./components/forms/FormStep3";

// Hooks
import { useForm } from "./hooks/useForm";

// Utils
import { i18n, initialFormData } from "./utils/constants";
import { validateStep } from "./utils/validation";
import { generateAISuggestion } from "./utils/api";
import { storage } from "./utils/storage";

// Styles
import "./assets/index.css";
import "./assets/components.css";
import "./assets/forms.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [isRTL, setIsRTL] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiTargetField, setAiTargetField] = useState("");
  const [errors, setErrors] = useState({});

  const { formData, updateField, loadData, resetForm, saveProgress } =
    useForm();
  // ref to store the last focused element before opening the AI modal
  const lastFocusedRef = useRef(null);

  const texts = isRTL ? i18n.ar : i18n.en;
  const allSteps = texts.steps;

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = storage.load("social_support_application");
    if (savedData) {
      loadData(savedData);
      setToast({ message: texts.saveSuccess, type: "success" });
    } else {
      setToast({ message: texts.welcome, type: "info" });
    }
  }, [loadData, texts]);

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveProgress(formData);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [formData, saveProgress]);

  const toggleLanguage = () => {
    setIsRTL((prev) => !prev);
  };

  const handleNext = () => {
    const validation = validateStep(formData, step, isRTL);
    if (validation.isValid) {
      setErrors({});
      setStep((prev) => Math.min(prev + 1, allSteps.length + 1));
    } else {
      setToast({ message: validation.message, type: "error" });
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateStep(formData, 3, isRTL);

    if (validation.isValid) {
      setIsSubmitting(true);
      try {
        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Save submission to localStorage
        const submissions = storage.load("social_support_submissions") || [];
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
        });
        storage.save("social_support_submissions", submissions);

        // Clear the current draft
        storage.remove("social_support_application");

        setToast({ message: texts.submissionSuccess, type: "success" });
        setStep(allSteps.length + 1);
      } catch (error) {
        console.error("Submission Error:", error);
        setToast({ message: texts.submissionError, type: "error" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setToast({ message: validation.message, type: "error" });
    }
  };

  const handleHelpMeWrite = (field) => {
    const currentText = formData[field];
    if (!currentText.trim()) {
      setToast({
        message: isRTL
          ? "الرجاء إدخال بعض المعلومات الأولية أولاً لتوجيه الذكاء الاصطناعي."
          : "Please enter some initial information first to guide the AI.",
        type: "info",
      });
      return;
    }

    // remember the element that had focus so we can return focus to it after closing modal
    try {
      lastFocusedRef.current = document.activeElement;
    } catch {
      lastFocusedRef.current = null;
    }

    setIsAISuggesting(true);
    setAiTargetField(field);
    setAiSuggestion("");
    setShowAIModal(true);

    generateAISuggestion(field, currentText, isRTL, texts)
      .then((generatedText) => {
        setAiSuggestion(generatedText.trim());
      })
      .catch((error) => {
        console.error("AI API Error:", error);
        setToast({ message: texts.aiError, type: "error" });
        setAiSuggestion(
          isRTL
            ? "تعذر إنشاء اقتراح. يرجى المحاولة يدوياً."
            : "Could not generate suggestion. Please attempt manually."
        );
      })
      .finally(() => {
        setIsAISuggesting(false);
      });
  };

  const handleAIAccept = (finalText) => {
    updateField(aiTargetField, finalText);
    setShowAIModal(false);
    setAiSuggestion("");
    setAiTargetField("");
    // return focus to the previously focused element, if any
    try {
      lastFocusedRef.current?.focus?.();
    } catch {
      // ignore focus errors
    }
  };

  const handleAIDiscard = () => {
    setShowAIModal(false);
    setAiSuggestion("");
    setAiTargetField("");
    // return focus to the previously focused element, if any
    try {
      lastFocusedRef.current?.focus?.();
    } catch {
      // ignore focus errors
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormStep1
            data={formData}
            updateField={updateField}
            texts={texts}
            isRTL={isRTL}
            errors={errors}
          />
        );
      case 2:
        return (
          <FormStep2
            data={formData}
            updateField={updateField}
            texts={texts}
            isRTL={isRTL}
            errors={errors}
          />
        );
      case 3:
        return (
          <FormStep3
            data={formData}
            updateField={updateField}
            texts={texts}
            isRTL={isRTL}
            onHelpMeWrite={handleHelpMeWrite}
            isAISuggesting={isAISuggesting}
            errors={errors}
          />
        );
      case 4:
        return (
          <div className="success-screen">
            <CheckCircle className="success-icon" />
            <h2 className="success-title">{texts.submissionSuccess}</h2>
            <p className="success-message">
              {isRTL
                ? "نشكرك على تقديم طلبك. سيتم مراجعته من قبل فريق الدعم لدينا. يمكنك الآن إغلاق هذه الصفحة."
                : "Thank you for submitting your application. It will be reviewed by our support team. You may now close this page."}
            </p>
            <button
              onClick={() => {
                resetForm();
                setStep(1);
              }}
              className="new-application-button"
            >
              {isRTL ? "بدء طلب جديد" : "Start a New Application"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const containerDir = isRTL ? "rtl" : "ltr";

  return (
    <div dir={containerDir} className="app-container">
      <Header texts={texts} isRTL={isRTL} onToggleLanguage={toggleLanguage} />



      <main className="app-main-content" role="main">
        <div className="form-wrapper"> {/* New wrapper for centering/card effect */}
        {step <= allSteps.length && (
          <ProgressTracker currentStep={step} steps={allSteps} isRTL={isRTL} />
        )}

        <div className="content-area">{renderStepContent()}</div>

        {step <= allSteps.length && (
          <div className={`navigation-container ${isRTL ? "rtl" : "ltr"}`}>
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="nav-button previous"
                disabled={isSubmitting}
                aria-label={texts.previous}
              >
                {isRTL ? (
                  <ChevronRight className="nav-icon previous" />
                ) : (
                  <ChevronLeft className="nav-icon previous" />
                )}
                {texts.previous}
              </button>
            )}
            <div
              className={
                step === 1
                  ? isRTL
                    ? "w-full flex justify-start"
                    : "w-full flex justify-end"
                  : ""
              }
            >
              {step < allSteps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="nav-button next"
                  disabled={isSubmitting}
                  aria-label={texts.next}
                >
                  {texts.next}
                  {isRTL ? (
                    <ChevronLeft className="nav-icon next" />
                  ) : (
                    <ChevronRight className="nav-icon next" />
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="nav-button submit"
                  disabled={isSubmitting}
                  aria-label={texts.submit}
                >
                  {isSubmitting && <Loader2 className="nav-icon loading" />}
                  {texts.submit}
                </button>
              )}
            </div>
          </div>
        )}
         </div>
      </main>

      <Footer step={step} allSteps={allSteps} />
     
      <Toast
        {...toast}
        isRTL={isRTL}
        onClose={() => setToast({ message: "", type: "info" })}
      />   
      {(showAIModal || isAISuggesting) && (
        <AIModal
          suggestion={aiSuggestion}
          targetField={aiTargetField}
          onAccept={handleAIAccept}
          onDiscard={handleAIDiscard}
          isRTL={isRTL}
          texts={texts}
          isGenerating={isAISuggesting}
        />
      )}
    </div>
  );
};

export default App;
