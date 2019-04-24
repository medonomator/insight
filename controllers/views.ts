export const getTemplateMainPage = (req, h) => {
  if (req.url.pathname) {
    const mainPage = req.url.pathname.slice(1);
  }

  // ищет в базе  mainPage
  // если находит то отдает такой шаблон из view/{mainPage}
  // если нет view/{mainPages} то создает { стандартный шаблон }
  // так-же нужно сделать механизм чистки -> проверку mainPages <-> view/{mainPage}
  // и далее уже нужно подключить визуальный редактор кода для админки

  // или возможно вообще все это не нужно, можно сделать проще для себя...

  return {
    users: ['подходящий шаблон']
  }
}