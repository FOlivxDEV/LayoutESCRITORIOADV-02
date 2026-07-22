const prohibited = [/resultado garantido/i, /causa ganha/i, /o melhor escrit[oó]rio/i, /consulta gr[aá]tis/i, /n[úu]mero um/i];
export function auditAdvertising(text: string) { return prohibited.filter((pattern) => pattern.test(text)).map(String); }
export function hasExcessiveUrls(text: string) { return (text.match(/https?:\/\/|www\./gi) ?? []).length > 3; }
