import * as Hapi from 'hapi';
import * as db from '../database/schemas';

(async () => {
  const opa = await db.usersSchema.find({}, { name: 'Dima' });
  console.log(opa);
})();

export const userRegister = (req, h: Hapi.ResponseToolkit) => {
  console.log(req.payload);

  // const newUSer = db.usersSchema({
  //   email: "new@email.com",
  //   password: '12345',
  //   name: "Dima"
  // })

  // newUSer.save(res => {
  //   console.log(res, 'super save');
  // })

  return {
    users: 'Register Success',
  };
};
