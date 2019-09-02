import * as Hapi from 'hapi';

export default async function staticTokenStrategy(request: Hapi.Request, token: string, h: Hapi.ResponseToolkit) {
  // const user = await db.user.findOne({ token });
  console.log('=============================');
  console.log('logging', 'here need validation');
  console.log('=============================');
  const user = [];
  return { isValid: false, credentials: {} };
  if (!user) {
    return { isValid: false, credentials: {} };
  }
  return { isValid: true, credentials: user };
}
