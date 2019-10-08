import * as Hapi from 'hapi';

export default function staticTokenStrategy(
  request: Hapi.Request,
  token: string,
  h: Hapi.ResponseToolkit
) {
  const auth = process.env.TOKEN || 'e0ef8e04-e8c4-11e8-9972-cfc025f1d606';
  if (token === auth) {
    return { isValid: true, credentials: {} };
  }
  return { isValid: false, credentials: {} };
}
