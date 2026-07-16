import type { EmailStepFields, OtpStepFields } from "../types/forgot-password";

// Base URL for API requests
const apiUrl = import.meta.env.VITE_API_URL;

// send otp for email
export async function sendOtpAction(fields: EmailStepFields) {
  const response = await fetch(`${apiUrl}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();

  // if response is not ok throw error
  if (!response.ok) {
    const errorMessage = payload?.error || "Something went wrong";
    throw new Error(errorMessage);
  }

  return payload;
}

// verify Otp which sent from email
export async function verifyOtpAction(fields: OtpStepFields) {
  const response = await fetch(`${apiUrl}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify({
      resetCode: fields.otp,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();

  // if response is not ok throw error
  if (!response.ok) {
    const errorMessage = payload?.error || "Something went wrong";
    throw new Error(errorMessage);
  }

  return payload;
}

// reset new password
export async function resetPasswordAction(fields: {
  email: string;
  newPassword: string;
}) {
  const response = await fetch(`${apiUrl}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();

  // if response is not ok throw error
  if (!response.ok) {
    const errorMessage = payload?.error || "Something went wrong";
    throw new Error(errorMessage);
  }

  return payload;
}
