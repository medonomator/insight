/**
 * documentation for hapi-swagger
 * @type {Object}
 */

const noAuth = 'Без авторизации';
const userAuth = 'Авторизация по токену пользователя';

export const users = {
  registerUser: {
    description: 'Регистрация пользователя',
    notes: 'Без авторизации',
    tags: ['api', 'user'],
  },
  loginUser: {
    description: 'Вход в систему пользователя (получение токена и всей информации о пользователе)',
    notes: 'Без авторизации',
    tags: ['api', 'user'],
  },
};

export const docsAphorisms = {
  createAphorism: {
    description: 'Создать афоризм',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  getAphorisms: {
    description: 'Получить афоризмы',
    notes: noAuth,
    tags: ['api', 'user'],
  },
  updateAphorism: {
    description: 'Обновить данные афоризма',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  deleteAphorism: {
    description: 'Удалить афоризм',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};

export const docsTasks = {
  synchronizationAuthor: {
    description: 'Сихронизация новых авторов',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  dynamicTask: {
    description: 'Динамическая задача',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};
