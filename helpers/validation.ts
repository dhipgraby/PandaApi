import { createHash } from "crypto";

export const isValidUsername = (username: string): boolean => {
    const regex = /^[A-Za-z0-9]{5,50}$/;
    return regex.test(username);
};

export const isValidPassword = (password: string): boolean => {
    const regex = /^[A-Za-z0-9]{8,12}$/;
    return regex.test(password);
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const hashPassword = (password: string): string => {
    return createHash("sha256").update(password).digest("hex");
  };

export const emailError = "Invalid email address";

export const nameError = "Invalid username. Username should be 5-50 characters long and contain only alphanumeric characters (no dots, commas, or underscores)."

export const passwordError = "Invalid password. Password should be 8-12 characters long and contain only alphanumeric characters (no dots, commas, or underscores)."