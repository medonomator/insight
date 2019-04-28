import * as mysql from 'mysql2/promise';

export async function mySqlConnection() {
  let mySqlInstance;
  const conMsql = await mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "mydb"
  });

  // const resultQuerty = await conMsql.query('SELECT age FROM users WHERE age BETWEEN 20 AND 25');

  // console.log(resultQuerty);


  return mySqlInstance;
}

export default mySqlConnection;


// class Singleton {
//   private static instance: Singleton;

//   private constructor() { }

//   static getInstance() {
//     if (!Singleton.instance) {
//       Singleton.instance = new Singleton();
//     }
//     return Singleton.instance;
//   }
// }

// let e = new Singleton(); // Error: constructor of 'Singleton' is private.
// let v = Singleton.getInstance();


