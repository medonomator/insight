// import logger from '../helpers/logger'

// const USERS = 'users';
// const NOTES = 'notes';


// const sql = `CREATE TABLE IF NOT EXISTS ${NOTES}
//       (id INT AUTO_INCREMENT PRIMARY KEY,
//       header VARCHAR(255),
//       description VARCHAR(255),
//       body TEXT,
//       created_at timestamp default current_timestamp,
//       userId INT)
//     `;

// mySqlInstance = await conMsql.query(sql);

// conMsql.query("CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8");

// const sql = `CREATE TABLE IF NOT EXISTS ${USERS} 
//   (id INT AUTO_INCREMENT PRIMARY KEY,
//   email VARCHAR(255),
//   password VARCHAR(255),
//   name VARCHAR(255),
//   address VARCHAR(255),
//   avatarUrl VARCHAR(255),
//   city VARCHAR(255),
//   interests TEXT,
//   about TEXT,
//   age INT,
//   sex BOOLEAN,
//   birthDate DATE,
//   role VARCHAR(50) DEFAULT 'user',
//   status VARCHAR(50) DEFAULT 'newbie')
// `;

// conMsql.query(sql, function (err, result) {
//   if (err) {
//     logger.error('Error create table');
//   }
//   console.log(`Table >>> ${USERS} <<< created`);
// })


// setInterval(() => {
//   const randomEmail = faker.internet.email()
//   const randomName = faker.name.findName()
//   const randomAge = Math.round(Math.random() * 100);


//   const sql = `INSERT INTO users (email, password, name, age) VALUES ('${randomEmail}', '1234', '${randomName}', ${Number(randomAge)})`

//   conMsql.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);

//       logger.info('New user registered');
//     }

//     console.log(result);

//   })
// }, 10)

// setInterval(() => {
//   const randomEmail = faker.internet.email()
//   const randomName = faker.name.findName()
//   const randomAge = Math.round(Math.random() * 100);


//   const sql = `INSERT INTO notes (header, description, body, userId) 
//     VALUES ('Example Header', 'example description', 'example body', ${Number(randomAge)})`

//   conMsql.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);

//       logger.info('New user registered');
//     }

//     console.log(result);

//   })
// }, 10)


// const sql = `SELECT * FROM notes INNER JOIN users ON notes.userId = users.age`
// const sql = `SELECT body FROM notes`

// conMsql.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//   }

//   console.log(result.length);
//   // console.log(result);

//   // result.map(item => {
//   //   console.log(item.id);

//   // })

// });