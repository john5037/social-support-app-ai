import React from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

const FormStep1 = ({ data, updateField, texts, isRTL, errors = {} }) => (
  <div className="form-step grid-cols-1 md:grid-cols-2">
    <InputField
      id="name"
      label={texts.name}
      value={data.name}
      onChange={(v) => updateField("name", v)}
      isRTL={isRTL}
      error={errors.name}
    />
    <InputField
      id="nationalId"
      label={texts.nationalId}
      value={data.nationalId}
      onChange={(v) => updateField("nationalId", v)}
      isRTL={isRTL}
      error={errors.nationalId}
    />
    <InputField
      id="dob"
      label={texts.dob}
      type="date"
      value={data.dob}
      onChange={(v) => updateField("dob", v)}
      isRTL={isRTL}
      error={errors.dob}
    />
    <SelectField
      id="gender"
      label={texts.gender}
      value={data.gender}
      onChange={(v) => updateField("gender", v)}
      options={texts.genderOptions}
      isRTL={isRTL}
      error={errors.gender}
    />
    <InputField
      id="address"
      label={texts.address}
      value={data.address}
      onChange={(v) => updateField("address", v)}
      isRTL={isRTL}
      error={errors.address}
    />
    <InputField
      id="city"
      label={texts.city}
      value={data.city}
      onChange={(v) => updateField("city", v)}
      isRTL={isRTL}
      error={errors.city}
    />
    <InputField
      id="state"
      label={texts.state}
      value={data.state}
      onChange={(v) => updateField("state", v)}
      isRTL={isRTL}
      error={errors.state}
    />
    <InputField
      id="country"
      label={texts.country}
      value={data.country}
      onChange={(v) => updateField("country", v)}
      isRTL={isRTL}
      error={errors.country}
    />
    <InputField
      id="phone"
      label={texts.phone}
      type="tel"
      value={data.phone}
      onChange={(v) => updateField("phone", v)}
      isRTL={isRTL}
      error={errors.phone}
    />
    <InputField
      id="email"
      label={texts.email}
      type="email"
      value={data.email}
      onChange={(v) => updateField("email", v)}
      isRTL={isRTL}
      error={errors.email}
    />
  </div>
);

export default FormStep1;
