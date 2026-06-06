import { computed, nextTick, isRef, isReadonly } from "vue";
import type { Ref, ComputedRef } from "vue";

type EmitFn = (event: "update:modelValue", value: string) => void;

interface MaskMoneyOptions {
  decimals?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  max?: number;
}

export function useMaskMoney(
  source: Ref<string> | ComputedRef<string>,
  emit?: EmitFn,
  options: MaskMoneyOptions = {},
) {
  const {
    decimals = 2,
    thousandSeparator = ".",
    decimalSeparator = ",",
    max,
  } = options;

  function format(raw: any): string {
    if (raw == null || raw === "") {
      return `0${decimalSeparator}${"0".repeat(decimals)}`;
    }

    let value = String(raw).trim();

    // já está no formato BR: 17.990,00
    const brMoneyRegex = new RegExp(
      `^\\d{1,3}(\\.\\d{3})*(\\${decimalSeparator}\\d{${decimals}})?$|^\\d+(\\${decimalSeparator}\\d{${decimals}})?$`
    );

    if (brMoneyRegex.test(value)) {
      const numeric = toNumber(value);
      return numeric.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    // valor vindo em formato "17990.00"
    if (value.includes(".") && !value.includes(decimalSeparator)) {
      const numeric = Number(value);
      if (!isNaN(numeric)) {
        return numeric.toLocaleString("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
    }

    // valor inteiro digitado: 17990
    const digits = value.replace(/\D/g, "");
    const numeric = Number(digits);

    if (!digits || isNaN(numeric)) {
      return `0${decimalSeparator}${"0".repeat(decimals)}`;
    }

    return numeric.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function toNumber(masked: any): number {
    if (!masked) return 0;

    let value = String(masked);

    // remove tudo que não for número ou vírgula/ponto
    value = value.replace(/[^\d,.-]/g, "");

    // se tiver vírgula → padrão BR
    if (value.includes(",")) {
      value = value
        .replace(/\./g, "") // remove milhar
        .replace(",", "."); // troca decimal
    }

    return parseFloat(value) || 0;
  }

  const masked = computed(() => format(source.value ?? ""));

  function onInput(eventOrValue: any) {
    let raw = eventOrValue?.target?.value ?? eventOrValue;
    raw = String(raw ?? "");

    let formatted = "";

    if (raw.includes(decimalSeparator)) {
      formatted = format(raw);
    } else {
      const digits = raw.replace(/\D/g, "");

      if (!digits) {
        formatted = `0${decimalSeparator}${"0".repeat(decimals)}`;
      } else {
        formatted = format(digits);
      }
    }

    if (emit) {
      emit("update:modelValue", formatted);
    } else if (isRef(source) && !isReadonly(source)) {
      (source as Ref<string>).value = formatted;
    }

    nextTick(() => {
      if (eventOrValue?.target) {
        const el = eventOrValue.target as HTMLInputElement;
        el.value = formatted;
        el.setSelectionRange(formatted.length, formatted.length);
      }
    });
  }

  return {
    masked,
    onInput,
    toNumber,
    format,
  };
}