// src/__tests__/validation.test.js
import { validateStep } from "../utils/validation";

describe("validateStep", () => {
  it("validates step 1 required fields", () => {
    const data = { name: "", nationalId: "123", dob: "2000-01-01", email: "x@x.com", phone: "+971501234567" };
    const res = validateStep(data, 1, false);
    expect(res.isValid).toBe(false);
    expect(res.message).toBeTruthy();
  });

  it("passes when fields are present", () => {
    const data = {
      name: "John",
      nationalId: "123",
      dob: "2000-01-01",
      gender: "Male",
      address: "a",
      city: "c",
      state: "s",
      country: "UAE",
      phone: "+971501234567",
      email: "x@x.com",
    };
    const res = validateStep(data, 1, false);
    expect(res.isValid).toBe(true);
  });
});