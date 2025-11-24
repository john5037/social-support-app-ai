import React from "react";
import { COLOR_PRIMARY, COLOR_ACCENT } from "../../utils/constants";

const ProgressTracker = ({ currentStep, steps, isRTL }) => (
  <div
    className={`progress-tracker ${isRTL ? "rtl" : "ltr"}`}
    role="progressbar"
    aria-valuenow={currentStep}
    aria-valuemin="1"
    aria-valuemax={steps.length}
  >
    {steps.map((step, index) => (
      <div
        key={step.id}
        className={`progress-step ${
          index < steps.length - 1 ? "has-connector" : ""
        }`}
      >
        <div
          className={`progress-line ${step.id <= currentStep ? "active" : ""}`}
        >
          {step.id < currentStep && <div className="progress-line-fill" />}
          {step.id === currentStep && (
            <div
              className="progress-line-current"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          )}
        </div>
        <div
          className={`progress-label ${
            step.id === currentStep ? "active" : ""
          }`}
        >
          {step.id}. {step.title}
        </div>
      </div>
    ))}
  </div>
);

export default ProgressTracker;
