export const swaggerOptions = {
  info: {
    title: 'Insight API',
    version: '1.0.0',
    description: 'API for Insight project',
  },
  documentationPath: '/swagger/docs',
};

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

export const TOKEN_SIGN_KEY = process.env.TOKEN_SIGN_KEY || 'NeverShareYourSecret';
export const REFRESH_TOKEN_SIGN_KEY = process.env.REFRESH_TOKEN_SIGN_KEY || 'NeverShareYourSecret';
