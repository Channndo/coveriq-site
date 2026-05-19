/** Consumer accounts (cover-iq.com): min 8 chars + letter + number + special */

const HAS_LETTER = /[a-zA-Z]/;
const HAS_NUMBER = /\d/;
const HAS_SPECIAL = /[^a-zA-Z0-9]/;

export function validateConsumerPassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!HAS_LETTER.test(password)) {
    return "Password must include at least one letter.";
  }
  if (!HAS_NUMBER.test(password)) {
    return "Password must include at least one number.";
  }
  if (!HAS_SPECIAL.test(password)) {
    return "Password must include at least one special character (e.g. ! @ # $).";
  }
  return null;
}

export const CONSUMER_PASSWORD_HINT =
  "At least 8 characters with a letter, a number, and a special character.";
