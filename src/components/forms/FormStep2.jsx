import React from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

const FormStep2 = ({ data, updateField, texts, isRTL, errors = {} }) => (
  <div className="form-step grid-cols-1 md:grid-cols-2">
    <SelectField
      id="maritalStatus"
      label={texts.maritalStatus}
      value={data.maritalStatus}
      onChange={(v) => updateField("maritalStatus", v)}
      options={texts.maritalOptions}
      isRTL={isRTL}
      error={errors.maritalStatus}
    />
    <InputField
      id="dependents"
      label={texts.dependents}
      type="number"
      value={data.dependents}
      onChange={(v) => updateField("dependents", v)}
      isRTL={isRTL}
      min="0"
      error={errors.dependents}
    />
    <SelectField
      id="employmentStatus"
      label={texts.employmentStatus}
      value={data.employmentStatus}
      onChange={(v) => updateField("employmentStatus", v)}
      options={texts.employmentOptions}
      isRTL={isRTL}
      error={errors.employmentStatus}
    />
    <InputField
      id="monthlyIncome"
      label={texts.monthlyIncome}
      type="number"
      value={data.monthlyIncome}
      onChange={(v) => updateField("monthlyIncome", v)}
      isRTL={isRTL}
      min="0"
      error={errors.monthlyIncome}
    />
    <SelectField
      id="housingStatus"
      label={texts.housingStatus}
      value={data.housingStatus}
      onChange={(v) => updateField("housingStatus", v)}
      options={texts.housingOptions}
      isRTL={isRTL}
      error={errors.housingStatus}
    />
  </div>
);

export default FormStep2;
