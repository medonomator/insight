/**
 * documentation for hapi-swagger
 * @type {Object}
 */
const noAuth = 'Without authorization';
const userAuth = 'Authorization by user token';

export const users = {
  registerUser: {
    description: 'Register user',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  loginUser: {
    description: 'Enter on system user (Get all information about user)',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  subscribeEmail: {
    description: 'Email subscription',
    notes: noAuth,
    tags: ['api', 'user'],
  },
};

export const docsAphorisms = {
  createAphorism: {
    description: 'Create Aphorism',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  getAphorisms: {
    description: 'Get Aphorisms',
    notes: noAuth,
    tags: ['api', 'user'],
  },
  updateAphorism: {
    description: 'Update aphorism',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  deleteAphorism: {
    description: 'Delete aphorism',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};

export const docsMaterials = {
  createMaterials: {
    description: 'Create Materials',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  getMaterials: {
    description: 'Get Materials',
    notes: noAuth,
    tags: ['api', 'user'],
  },
  updateMaterials: {
    description: 'Update Materials',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  deleteMaterials: {
    description: 'Delete Materials',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};

export const docsTasks = {
  synchronizationData: {
    description: 'Synchronization data for authors and categorires',
    notes: userAuth,
    tags: ['api', 'user'],
  },
  dynamicTask: {
    description: 'Dynamic task',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};

export const docsStatic = {
  staticUpload: {
    description: 'Upload file to static/temp',
    notes: userAuth,
    tags: ['api', 'user'],
  },
};
