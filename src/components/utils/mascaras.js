export const formatarComMascara = (value, mask) => {
  if (!value) return '';
  let numericValue = value.replace(/[\D]/g, '');
  let maskedValue = '';
  let valueIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '#') {
      maskedValue += numericValue[valueIndex] || '';
      valueIndex++;
    } else {
      maskedValue += mask[i];
    }
    if (valueIndex >= numericValue.length) break;
  }
  return maskedValue;
};

export const formatarValor = (value) => {
  if (!value) return '';

  const numericValue = String(value).replace(/\D/g, '');
  if (!numericValue) return '';

  const valorBase = Number(numericValue) / 100;

  return valorBase
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const converterValorParaNumero = (value) => {
  if (value === null || value === undefined || value === '') return 0;

  const valorLimpo = String(value)
    .replace(/R\$/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();

  const numero = Number(valorLimpo);
  return Number.isNaN(numero) ? 0 : numero;
};

export const MASCARA_TELEFONE = '(##) #####-####';
export const MASCARA_CEP = '#####-###';