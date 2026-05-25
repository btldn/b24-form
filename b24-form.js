(function () {

  /* ================================================================
     CONFIG — меняй здесь под каждый проект
     ================================================================ */
  var CONFIG = {

    // Цвета
    colors: {
      bg:             '#06044a',              // фон страницы и секции
      accent:         '#1a8fff',              // рамки, кнопка «Далее»
      accentHover:    '#1166cc',
      btnSubmit:      '#ff6600',              // кнопка «Отправить»
      btnSubmitHover: '#cc5200',
      inputBg:        'rgba(26,143,255,0.2)', // фон инпутов и карточки
      text:           '#f8faff',
      textMuted:      'rgba(248,250,255,0.4)',
      labelColor:     '#ffffff',
      required:       '#ff4444',
      successBg:      '#092370',
      focusBorder:    '#ff6600',
    },

    // Типографика
    font: {
      family:        "'Montserrat', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
      sizeLabel:     '18px',
      sizeInput:     '18px',
      sizeBtn:       '18px',
    },

    // Форма
    form: {
      borderRadius: '24px',  // скругление карточки
      inputRadius:  '10px',
      btnRadius:    '8px',
      maxWidth:     '950px',
      inputHeight:  '44px',
      sidePadding:  '48px',
    },

    // Сетка по шагам
    // cols: строка grid-template-columns, null = flex-column (одна колонка)
    grid: {
      steps: {
        1: '1fr',
        2: null,
        3: null,
      },
      colGap: { 1: '36px', 2: '24px', 3: '0' },
      rowGap: '24px',
    },

    // Плейсхолдеры (ключ — часть текста лейбла)
    placeholders: {
      'Название организации': 'ООО "Название"',
      'Имя':        'Иван',
      'Фамилия':    'Иванов',
      'Отчество':   'Иванович',
      'Должность':  'Руководитель отдела',
      'ИНН':        '00 00 00000 0',
      'Email':      'example@mail.ru',
      'E-mail':     'example@mail.ru',
      'Телефон':    '+7 (999) 000-00-00',
      'Адрес':      'ул. Примерная, д. 1',
      'Ссылка':     'https://example.ru',
      'Комментарий':'Ваш комментарий',
    },

    // Ширины полей на шаге 2 (grid-column)
    step2Spans: {
      'Название организации': '1 / -1',
      'ИНН':       'span 3',
      'Адрес':     'span 3',
      'Фамилия':   'span 2',
      'Имя':       'span 2',
      'Отчество':  'span 2',
      'Должность': 'span 3',
      'Телефон':   'span 3',
      'Email':     'span 3',
      'E-mail':    'span 3',
      'Ссылка':    'span 3',
    },

    // Логотип — SVG/HTML строка, '' = не вставлять
    logoHtml: '',

    // Класс блока формы для вставки логотипа (например 'block-66-90-form-new-default')
    formBlockClass: '',

    // ID секции-обёртки (например '#b97'), '' = не использовать
    sectionId: '',
  };
  /* ================================================================
     КОНЕЦ CONFIG
     ================================================================ */


  // ── Скрыть форму до загрузки стилей (FOUC) ──────────────────────
  var fouc = document.createElement('style');
  fouc.id = '__b24-fouc-hide';
  fouc.textContent =
    'html,body,main{background:' + CONFIG.colors.bg + '!important}' +
    '.b24-form-wrapper{opacity:0!important}' +
    '.g-landing-alert,.body.landing-page-transition::after{display:none!important}';
  document.head.appendChild(fouc);

  // ── Подключить Google Font ────────────────────────────────────────
  if (CONFIG.font.googleFontUrl) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.font.googleFontUrl;
    document.head.appendChild(link);
  }

  // ── Инжектировать базовые CSS ────────────────────────────────────
  var C = CONFIG.colors, F = CONFIG.font, FM = CONFIG.form;
  var css = document.createElement('style');
  css.textContent = [

    /* Шрифт */
    'body,h1,h2,h3,h4,h5,h6,p,span,a,div,input,textarea,select,button,label{font-family:' + F.family + '!important}',

    /* Фон */
    'html{background:' + C.bg + '!important}',
    'main{min-height:100vh!important}',
    '.landing-block{background:' + C.bg + '!important}',

    /* Карточка формы (запасной вариант, основное — через JS в waitForForm) */
    '.b24-form-wrapper{backdrop-filter:blur(6px)!important;background:' + C.inputBg + '!important;border:1px solid ' + C.accent + '!important;border-radius:' + FM.borderRadius + '!important;max-width:' + FM.maxWidth + '!important;overflow:hidden!important}',

    /* Заголовок */
    '.b24-form-header-title{padding-top:48px!important;font-weight:700!important;font-size:36px!important;line-height:122%!important;text-align:center!important;color:' + C.text + '!important;margin:0 auto 12px!important}',
    '.b24-form-header-description{max-width:600px!important;text-align:center!important;font-size:16px!important;line-height:150%!important;color:' + C.textMuted + '!important;margin:0 auto!important}',

    /* Инпуты */
    '.b24-form-control{border:1px solid ' + C.accent + '!important;background-color:' + C.inputBg + '!important}',
    'input:focus,textarea:focus,select:focus{border-color:' + C.focusBorder + '!important}',
    '*:focus,*:focus-visible{outline:none!important}',

    /* Лейблы */
    '.b24-form-control-label{color:' + C.labelColor + '!important;font-size:' + F.sizeLabel + '!important}',
    '.b24-form-control-required{color:' + C.required + '!important}',
    '.b24-form-control::placeholder{color:' + C.textMuted + '!important}',

    /* Кнопки */
    '.b24-form-btn{border:1px solid ' + C.accent + '!important;border-radius:' + FM.btnRadius + ';background-color:' + C.inputBg + '!important;font-weight:500;font-size:' + F.sizeBtn + ';color:' + C.text + ';min-height:' + FM.inputHeight + '}',
    '.b24-form-btn-container .b24-form-btn[type="submit"]{background:' + C.btnSubmit + '!important;border-color:' + C.btnSubmit + '!important;margin-bottom:32px!important}',
    '.b24-form-btn-container .b24-form-btn[type="submit"]:hover{background:' + C.btnSubmitHover + '!important;border-color:' + C.btnSubmitHover + '!important}',
    '.b24-form-btn-container .b24-form-btn:not(.b24-form-btn-white):not([type="submit"]){background:#1a8fff!important;border-color:#1a8fff!important;color:' + C.text + '!important;font-weight:600!important}',
    '.b24-form-btn-container .b24-form-btn:not(.b24-form-btn-white):not([type="submit"]):hover{background:' + C.accentHover + '!important;border-color:' + C.accentHover + '!important}',

    /* Успех */
    '.b24-form-success{background:' + C.successBg + '!important}',
    '.b24-form-success .b24-form-state-text,.b24-form-success .b24-form-state-text *{color:' + C.text + '!important}',

    /* Радио / чекбоксы */
    'label.b24-form-control{border-radius:' + FM.inputRadius + '!important;padding:0 16px!important;min-height:' + FM.inputHeight + '!important;display:inline-flex!important;align-items:center!important;gap:8px!important;cursor:pointer!important}',

    /* Согласие */
    '.b24-form-field-agreement .b24-form-control-string,.b24-form-field-agreement label{color:rgba(248,250,255,0.85)!important;font-size:13px!important}',
    '.b24-form-field-agreement a{color:#5bb8ff!important}',

    /* Прочее */
    '.b24-form-sign,.b24-form-progress-bar-container{display:none!important}',
    '.b24-form-btn-block{padding:0}',
    '.b24-form-btn-container{gap:24px}',
    '.b24-form-dark,.b24-form-state-container,.b24-form-state,.b24-form-content{background:transparent!important}',

    /* Адаптив */
    '@media(max-width:768px){.b24-form-header-title{font-size:24px!important}.b24-form-padding-side.b24-form-padding-side{padding-top:24px!important;padding-bottom:24px!important}}',
    '@media(max-width:640px){.b24-form-padding-side.b24-form-padding-side{padding-left:20px!important;padding-right:20px!important}}',
    '@media(max-width:600px){.b24-form-fields{grid-template-columns:1fr!important}input,textarea,select{max-width:100%!important;font-size:14px!important}label.b24-form-control{font-size:14px!important}.b24-form-btn{font-size:16px!important}}',

  ].join('\n');
  document.head.appendChild(css);


  // ── Основная логика ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // Логотип
    if (CONFIG.logoHtml && CONFIG.formBlockClass) {
      var formBlock = document.querySelector('.' + CONFIG.formBlockClass);
      if (formBlock && !document.getElementById('__b24-logo')) {
        var logoDiv = document.createElement('div');
        logoDiv.id = '__b24-logo';
        logoDiv.style.cssText = 'text-align:center;padding:45px 80px 0;background:' + CONFIG.colors.bg + ';';
        logoDiv.innerHTML = CONFIG.logoHtml;
        formBlock.parentNode.insertBefore(logoDiv, formBlock);
      }
    }

    waitForForm();
  });

  function waitForForm() {
    var firstField = document.querySelector('.b24-form-field');
    if (!firstField) return setTimeout(waitForForm, 100);

    // Фон секции
    if (CONFIG.sectionId) {
      var section = document.querySelector(CONFIG.sectionId + ' section.landing-block');
      if (section) {
        section.style.setProperty('background', CONFIG.colors.bg, 'important');
        section.style.setProperty('min-height', '100vh', 'important');
      }
    }

    // Padding контейнера
    var formContainer = document.querySelector('.landing-node-form-container');
    if (formContainer) {
      formContainer.style.setProperty('padding-left', '0', 'important');
      formContainer.style.setProperty('padding-right', '0', 'important');
    }

    // Фон карточки — через JS, чтобы перебить Bitrix !important
    var formWrapper = document.querySelector('.b24-form-wrapper');
    if (formWrapper) {
      formWrapper.style.setProperty('background', CONFIG.colors.inputBg, 'important');
      formWrapper.style.setProperty('backdrop-filter', 'blur(6px)', 'important');
      formWrapper.style.setProperty('border', '1px solid ' + CONFIG.colors.accent, 'important');
      formWrapper.style.setProperty('border-radius', CONFIG.form.borderRadius, 'important');
      formWrapper.style.setProperty('max-width', CONFIG.form.maxWidth, 'important');
      formWrapper.style.setProperty('overflow', 'hidden', 'important');
    }

    var fieldsWrapper = firstField.parentElement;
    var currentStep = 1;

    // ── Вспомогалки ─────────────────────────────────────────────────
    function getLabelText(label) {
      return Array.from(label.childNodes)
        .filter(function (n) { return n.nodeType === Node.TEXT_NODE; })
        .map(function (n) { return n.textContent.trim(); })
        .join('');
    }

    function matchKey(text) {
      return Object.keys(CONFIG.placeholders).find(function (k) { return text.includes(k); });
    }

    function digitsToInn(d) {
      if (!d) return '';
      var r = d.slice(0, 2);
      if (d.length > 2) r += ' ' + d.slice(2, 4);
      if (d.length > 4) r += ' ' + d.slice(4, 9);
      if (d.length > 9) r += ' ' + d.slice(9, 10);
      return r;
    }

    function digitsToPhone(d) {
      if (!d) return '';
      var r = '+7 (' + d.slice(0, 3);
      if (d.length >= 4) r += ') ' + d.slice(3, 6);
      if (d.length >= 7) r += '-' + d.slice(6, 8);
      if (d.length >= 9) r += '-' + d.slice(8, 10);
      return r;
    }

    // ── Сетка ───────────────────────────────────────────────────────
    function applyGrid() {
      var G = CONFIG.grid;
      var cols = G.steps[currentStep];

      if (!cols) {
        fieldsWrapper.style.cssText = 'display:flex;flex-direction:column;gap:' + G.rowGap + ';margin-bottom:24px;';
        return;
      }
      var mobile = window.innerWidth < 800;
      var colGap = G.colGap[currentStep] || '24px';
      fieldsWrapper.style.cssText =
        'display:grid;grid-template-columns:' + (mobile ? '1fr' : cols) +
        ';gap:' + G.rowGap + ' ' + colGap + ';margin-bottom:24px;';

      fieldsWrapper.querySelectorAll('.b24-form-control').forEach(function (inp) {
        inp.style.setProperty('max-width', '100%', 'important');
      });
      fieldsWrapper.querySelectorAll('[data-grid-span]').forEach(function (item) {
        if (mobile) item.style.removeProperty('grid-column');
        else item.style.setProperty('grid-column', item.getAttribute('data-grid-span'), 'important');
      });
      var btn = fieldsWrapper.querySelector('.b24-form-btn-container');
      if (btn) btn.style.setProperty('grid-column', '1 / -1', 'important');
    }

    // ── Обработка полей ─────────────────────────────────────────────
    function processFields() {
      var stepTitle = (
        document.querySelector('.b24-form-progress-bar-title')?.textContent?.trim() || ''
      ).toLowerCase();
      currentStep = stepTitle.includes('заказчик') ? 2
        : stepTitle.includes('проект') ? 3 : 1;
      fieldsWrapper.setAttribute('data-step', currentStep);

      var mobile = window.innerWidth < 800;

      // Пересинхронизация уже обработанных полей при смене шага
      fieldsWrapper.querySelectorAll('.b24-form-control-label[data-styled]').forEach(function (label) {
        var group = label.closest('.b24-form-control-group');
        var container = label.closest('.b24-form-control-container');
        var text = getLabelText(label);
        var key = matchKey(text);
        var gridSpan = currentStep === 2
          ? (key ? CONFIG.step2Spans[key] : null)
          : (key === 'Комментарий' ? '1 / -1' : null);
        var gridItem = group || container;
        if (!gridItem) return;
        while (gridItem.parentElement && gridItem.parentElement !== fieldsWrapper)
          gridItem = gridItem.parentElement;
        if (gridSpan) gridItem.setAttribute('data-grid-span', gridSpan);
        else {
          gridItem.removeAttribute('data-grid-span');
          gridItem.style.removeProperty('grid-column');
        }
      });

      // Первичная обработка новых полей
      fieldsWrapper.querySelectorAll('.b24-form-control-label:not([data-styled])').forEach(function (label) {
        var group = label.closest('.b24-form-control-group');
        var input, container;

        if (group) {
          if (group.querySelector('input[type="radio"],input[type="checkbox"]')) {
            label.setAttribute('data-styled', '1');
            applyLabelStyles(label, mobile, false);
            return;
          }
          var entryEl = label.parentElement;
          while (entryEl && entryEl !== group) {
            input = entryEl.querySelector('.b24-form-control');
            if (input) break;
            entryEl = entryEl.parentElement;
          }
          if (!input) { label.setAttribute('data-styled', '1'); return; }
          label.setAttribute('data-styled', '1');
          input.parentElement.insertBefore(label, input);
          input.parentElement.style.setProperty('flex-wrap', 'wrap', 'important');
          input.parentElement.style.setProperty('align-items', 'center', 'important');
          input.style.setProperty('flex', '1 1 0', 'important');
          input.style.setProperty('min-width', '0', 'important');
        } else {
          container = label.closest('.b24-form-control-container');
          input = container?.querySelector('.b24-form-control');
          if (!input) return;
          label.setAttribute('data-styled', '1');
          container.parentElement.insertBefore(label, container);
        }

        var text = getLabelText(label);
        var key = matchKey(text);
        input.placeholder = key ? CONFIG.placeholders[key] : text;
        applyLabelStyles(label, mobile, !!group);
        applyInputStyles(input, mobile);

        // Grid span
        var gridSpan = currentStep === 2
          ? (key ? CONFIG.step2Spans[key] : null)
          : (key === 'Комментарий' ? '1 / -1' : null);
        if (gridSpan) {
          var gridItem = group || container;
          while (gridItem.parentElement && gridItem.parentElement !== fieldsWrapper)
            gridItem = gridItem.parentElement;
          gridItem.setAttribute('data-grid-span', gridSpan);
          gridItem.style.setProperty('grid-column', gridSpan, 'important');
        }

        // Маски
        if (key === 'ИНН') {
          input.setAttribute('inputmode', 'numeric');
          input.addEventListener('input', function () {
            this.value = digitsToInn(this.value.replace(/\D/g, '').slice(0, 10));
          });
          input.addEventListener('keydown', function (e) {
            if (e.key !== 'Backspace') return;
            e.preventDefault();
            this.value = digitsToInn(this.value.replace(/\D/g, '').slice(0, -1));
          });
        }
        if (key === 'Телефон') {
          input.setAttribute('inputmode', 'tel');
          input.addEventListener('input', function () {
            var d = this.value.replace(/\D/g, '').replace(/^[78]/, '').slice(0, 10);
            this.value = digitsToPhone(d);
          });
          input.addEventListener('keydown', function (e) {
            if (e.key !== 'Backspace') return;
            e.preventDefault();
            var d = this.value.replace(/\D/g, '').replace(/^[78]/, '').slice(0, -1);
            this.value = digitsToPhone(d);
          });
        }
      });

      applyGrid();
    }

    function applyLabelStyles(label, mobile, inGroup) {
      [
        ['position', 'static'], ['transform', 'none'], ['top', 'auto'],
        ['right', 'auto'], ['left', 'auto'], ['pointer-events', 'auto'],
        ['white-space', 'normal'], ['overflow', 'visible'], ['display', 'block'],
        ['opacity', '1'], ['visibility', 'visible'], ['margin-bottom', '6px'],
        ['font-weight', '500'], ['font-size', mobile ? '16px' : CONFIG.font.sizeLabel],
        ['line-height', '156%'], ['color', CONFIG.colors.labelColor],
      ].forEach(function (p) { label.style.setProperty(p[0], p[1], 'important'); });
      if (inGroup) label.style.setProperty('flex', '0 0 100%', 'important');
    }

    function applyInputStyles(input, mobile) {
      if (['radio', 'checkbox', 'file'].includes(input.type)) return;
      [
        ['height', CONFIG.form.inputHeight], ['max-width', '100%'], ['padding', '0 16px'],
        ['border-radius', CONFIG.form.inputRadius], ['color', CONFIG.colors.text],
        ['font-size', mobile ? '14px' : CONFIG.font.sizeInput], ['line-height', '28px'],
      ].forEach(function (p) { input.style.setProperty(p[0], p[1], 'important'); });
      if (input.tagName === 'TEXTAREA') {
        input.style.setProperty('height', 'auto', 'important');
        input.style.setProperty('min-height', '120px', 'important');
        input.style.setProperty('padding', '4px 16px', 'important');
        input.style.setProperty('line-height', '1.5', 'important');
      }
    }

    // ── Запуск ──────────────────────────────────────────────────────
    processFields();
    window.addEventListener('resize', applyGrid);

    // Убрать FOUC
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var s = document.getElementById('__b24-fouc-hide');
        if (s) setTimeout(function () { s.remove(); }, 300);
      });
    });

    // Следим за изменениями DOM (смена шагов формы)
    var observer = document.querySelector('.b24-form-wrapper');
    new MutationObserver(function () {
      var f = document.querySelector('.b24-form-field');
      if (f) fieldsWrapper = f.parentElement;
      processFields();
    }).observe(observer || fieldsWrapper, { childList: true, subtree: true });
  }

})();
