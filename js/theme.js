const defaultTheme = {
  '--calc-bg': '#796e6e',
  '--calc-border': '#000000',
  '--calc-text': '#ffffff',
  '--btn-bg': '#333333',
  '--btn-grey': '#a6a6a6',
  '--btn-orange': '#ff9501',
  '--shadow': '#000000',
};

const themeInputs = {
  'calc-bg': '--calc-bg',
  'calc-text': '--calc-text',
  'btn-bg': '--btn-bg',
  'btn-grey': '--btn-grey',
  'btn-orange': '--btn-orange',
};

//Загрузка сохранённой темы
function loadTheme() {
  const savedTheme = localStorage.getItem('calculatorTheme');
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
      const inputId = Object.keys(themeInputs).find((id) => themeInputs[id] === key);
      if (inputId) {
        const input = document.getElementById(inputId);
        if (input) input.value = theme[key];
      }
    });
  }
}

//Сохранение темы
function saveTheme() {
  const theme = {};
  Object.keys(themeInputs).forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      theme[themeInputs[inputId]] = input.value;
    }
  });
  localStorage.setItem('calculatorTheme', JSON.stringify(theme));
}

//Применение темы
function applyTheme(inputId, cssVar) {
  const input = document.getElementById(inputId);
  if (input) {
    input.addEventListener('input', (e) => {
      document.documentElement.style.setProperty(cssVar, e.target.value);
      saveTheme();
    });
  }
}

//Сброс темы
function resetTheme() {
  Object.keys(defaultTheme).forEach((key) => {
    const value = defaultTheme[key];
    document.documentElement.style.setProperty(key, value);
    const inputId = Object.keys(themeInputs).find((id) => themeInputs[id] === key);
    if (inputId) {
      const input = document.getElementById(inputId);
      if (input) {
        // Убеждаемся, что значение в правильном формате для color input
        input.value = value;
      }
    }
  });
  localStorage.removeItem('calculatorTheme');
}

//Переключение панели темы
function initThemePanel() {
  const themeToggle = document.getElementById('theme-toggle');
  const themePanel = document.getElementById('theme-panel');

  function toggleThemePanel() {
    if (themePanel.style.display === 'none' || themePanel.style.display === '') {
      themePanel.style.display = 'block';
    } else {
      themePanel.style.display = 'none';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleThemePanel);
  }

  //Если кликаем в сторону от темы, то закрываем ее
  document.addEventListener('click', (event) => {
    if (
      themePanel &&
      themePanel.style.display === 'block' &&
      !themePanel.contains(event.target) &&
      !themeToggle.contains(event.target)
    ) {
      themePanel.style.display = 'none';
    }
  });
}

//Инициализация управления темой
function initTheme() {
  
  Object.keys(themeInputs).forEach((inputId) => {
    applyTheme(inputId, themeInputs[inputId]);
  });

  const resetButton = document.getElementById('reset-theme');
  if (resetButton) {
    resetButton.addEventListener('click', resetTheme);
  }
  initThemePanel();
  loadTheme();
}

export { initTheme };
