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
  
    let numericValue = value.replace(/\D/g, '');
  
    numericValue = (Number(numericValue) / 100)
      .toFixed(2)
      .replace('.', ',');
  
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  

  export const MASCARA_TELEFONE = '(##) #####-####';
  export const MASCARA_CEP = '#####-###';