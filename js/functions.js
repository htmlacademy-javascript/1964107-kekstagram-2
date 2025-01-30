/*Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция
нам пригодится для валидации формы. Примеры использования функции: */


const compareStroke = (line, symbol) => line.length <= symbol.length;

compareStroke();

/*Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.*/
const isPalindrom = (stroke) => {
  stroke = stroke.replaceAll(' ','');
  stroke = stroke.toLowerCase();
  let result = '';
  for (let i = stroke.length - 1; i >= 0 ; i--) {
    result += stroke[i];
  }
  return stroke === result;
};

isPalindrom('123');

/*Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN: */

const removeNumber = (string) => {
  let result = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1 ; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false){
      result += string[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return Number(result);
};

removeNumber('futyn');
