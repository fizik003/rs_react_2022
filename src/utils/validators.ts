export const validators = {
  isEmpty(value: number | string | boolean | undefined) {
    if (!value) return true;
  },

  minLength(value: string, minSymbols: number) {
    return value.length < minSymbols;
  },

  maxLength(value: string, maxSymbols: number) {
    return value.length > maxSymbols;
  },

  checkOld(value: number, maxDate: number) {
    return value > maxDate;
  },
};
