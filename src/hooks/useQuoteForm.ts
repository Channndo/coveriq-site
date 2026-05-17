import { useCallback, useState } from "react";
import { WEB_APP_URL } from "../lib/constants";
import { lineRequiresVehicleCount } from "../lib/insuranceLines";

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  insuranceType: string;
  vehicleCount: string;
}

const initial: QuoteFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  zipCode: "",
  insuranceType: "",
  vehicleCount: "",
};

export function useQuoteForm(initialInsuranceType = "") {
  const [data, setData] = useState<QuoteFormData>({
    ...initial,
    insuranceType: initialInsuranceType,
  });
  const [submitting, setSubmitting] = useState(false);

  const vehicleRequired = lineRequiresVehicleCount(data.insuranceType);

  const setField = useCallback(
    <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "insuranceType" && !lineRequiresVehicleCount(value as string)) {
          next.vehicleCount = "";
        }
        return next;
      });
    },
    []
  );

  const progress = useCallback(() => {
    const base: (keyof QuoteFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "zipCode",
      "insuranceType",
    ];
    let filled = base.filter((k) => String(data[k]).trim()).length;
    let total = base.length;
    if (vehicleRequired) {
      total += 1;
      if (data.vehicleCount) filled += 1;
    }
    return Math.round((filled / total) * 100);
  }, [data, vehicleRequired]);

  const formatPhone = (raw: string) => {
    let value = raw.replace(/[^0-9]/g, "");
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    return value;
  };

  const submit = async (): Promise<{ ok: boolean; error?: string }> => {
    if (vehicleRequired && !data.vehicleCount) {
      return { ok: false, error: "Please select the number of vehicles." };
    }

    const payload: Record<string, string> = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      address: data.address.trim(),
      zipCode: data.zipCode.trim(),
      insuranceType: data.insuranceType,
      vehicleCount: data.vehicleCount,
      timestamp: new Date().toISOString(),
    };

    const qs = new URLSearchParams(window.location.search);
    payload.utm_source = qs.get("utm_source") || "direct";
    payload.utm_medium = qs.get("utm_medium") || "";
    payload.utm_campaign = qs.get("utm_campaign") || "";

    setSubmitting(true);
    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      return { ok: true };
    } catch {
      return { ok: true };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    data,
    setField,
    vehicleRequired,
    progress: progress(),
    submitting,
    formatPhone,
    submit,
  };
}
