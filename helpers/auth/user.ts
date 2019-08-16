import * as Hapi from 'hapi';

export default async function staticTokenStrategy(request: Hapi.Request, token: string, h: Hapi.ResponseToolkit) {
  console.log('=============================');
  console.log('logging', 'WORK');
  console.log('=============================');
  // const user = await db.user.findOne({ token });
  const user = []
  if (!user) {
    return { isValid: false, credentials: {} };
  }
  return { isValid: true, credentials: user };
}
