import './style.css';
import { initTheme } from './js/theme.js';

//Инициализация переменных
let x = '';
let y = '';
let sign = '';
let result = false;
//Инициализация массивов
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['-', '+', 'x', '/', '%'];
//Инициализация элемента вывода
const output = document.querySelector('.calculator-screen p');

//Функция форматирования числа
function formatNumber(num) {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(number)) return '0';
  return parseFloat(number.toFixed(8)).toString();
}

//Функция вычисления
function calculate(a, b, op) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (op) {
    case '+':
      return numA + numB;
    case '-':
      return numA - numB;
    case 'x':
      return numA * numB;
    case '/':
      if (numB === 0 || (numB > -0.0000000001 && numB < 0.0000000001)) return null;
      return numA / numB;
    case '%':
      return (numA * numB) / 100;
    default:
      return numA;
  }
}

//Функция очистки всех переменных
function clearAll() {
  x = '';
  y = '';
  sign = '';
  result = false;
  output.textContent = '0';
}

//Функция обновления элемента вывода
function updateDisplay(value) {
  output.textContent = value;
}

//Функция обработки цифр
function handleDigit(key) {
  const current = sign === '' ? x : y;
  if (key === '.' && current.includes('.')) return;

  if (result) {
    if (sign === '') {
      x = key;
    } else {
      y = key;
    }
    result = false;
  } else {
    if (sign === '') {
      x += key;
    } else {
      y += key;
    }
  }
  updateDisplay(sign === '' ? x : y);
}

//Функция обработки изменения знака
function handleSignToggle() {
  if (sign === '' && x !== '') {
    x = (-parseFloat(x)).toString();
    updateDisplay(x);
  } else if (y !== '') {
    y = (-parseFloat(y)).toString();
    updateDisplay(y);
  }
  result = false;
}

//Функция обработки операторов
function handleOperator(key) {
  if (result) {
    result = false;
    y = '';
  } else if (x !== '' && y !== '' && sign !== '') {
    const calcResult = calculate(x, y, sign);
    if (calcResult === null) {
      updateDisplay('Ошибка');
      clearAll();
      return;
    }
    x = formatNumber(calcResult);
    y = '';
  }
  sign = key;
  result = false;
  updateDisplay(sign);
}

//Функция обработки равенства
function handleEquals() {
  if (x === '') return;
  if (y === '') y = x;
  if (sign === '') {
    updateDisplay(x);
    return;
  }

  const calcResult = calculate(x, y, sign);
  if (calcResult === null) {
    updateDisplay('Ошибка');
    x = '';
    y = '';
    sign = '';
    result = false;
    return;
  }

  x = formatNumber(calcResult);
  result = true;
  updateDisplay(x);
  y = '';
  sign = '';
}

//Обработка клика на кнопку очистки
document.querySelector('.ac').onclick = clearAll;
//Обработка клика на кнопки цифр, операторов, знака равенства
document.querySelector('.buttons').onclick = (event) => {
  if (!event.target.classList.contains('btn') || event.target.classList.contains('ac')) return;

  const key = event.target.textContent.trim();

  if (digits.includes(key)) {
    handleDigit(key);
  } else if (key === '+/-') {
    handleSignToggle();
  } else if (operators.includes(key)) {
    handleOperator(key);
  } else if (key === '=') {
    handleEquals();
  }
};

//Инициализация темы
initTheme();
