import React from "react";
import TextAreaField from "../ui/TextAreaField";

const FormStep3 = ({
  data,
  updateField,
  texts,
  isRTL,
  onHelpMeWrite,
  isAISuggesting,
  errors = {},
}) => {
  return (
    <div className="form-step grid-cols-1">
      <TextAreaField
        id="financialSituation"
        label={texts.financialSituation}
        value={data.financialSituation}
        onChange={(v) => updateField("financialSituation", v)}
        isRTL={isRTL}
        onHelpMeWrite={() => onHelpMeWrite("financialSituation")}
        isAIAssisted
        disabled={isAISuggesting}
        error={errors.financialSituation}
      />
      <TextAreaField
        id="employmentCircumstances"
        label={texts.employmentCircumstances}
        value={data.employmentCircumstances}
        onChange={(v) => updateField("employmentCircumstances", v)}
        isRTL={isRTL}
        onHelpMeWrite={() => onHelpMeWrite("employmentCircumstances")}
        isAIAssisted
        disabled={isAISuggesting}
        error={errors.employmentCircumstances}
      />
      <TextAreaField
        id="reasonForApplying"
        label={texts.reasonForApplying}
        value={data.reasonForApplying}
        onChange={(v) => updateField("reasonForApplying", v)}
        isRTL={isRTL}
        onHelpMeWrite={() => onHelpMeWrite("reasonForApplying")}
        isAIAssisted
        disabled={isAISuggesting}
        error={errors.reasonForApplying}
      />{" "}
    </div>
  );
};

export default FormStep3;
