export function formatPhone(raw: string): string {
  let value = raw.replace(/[^0-9]/g, "");
  if (value.length >= 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  } else if (value.length >= 3) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  }
  return value;
}

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}
