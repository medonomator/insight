import fs from "fs";
import { knex } from "../database/pgConnect";

(async () => {
    try {
        const data = await knex.raw(`SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${process.argv[2]}'`);
        const tableName = data.rows[0].table_name;
        let table = `let ${tableName} = { table: '${tableName}', columns: {`;

        data.rows.forEach((column) => {
            if (column.column_name) {
                table += `${column.column_name}: '${tableName}.${column.column_name}',`;
            }
        });

        table += `}}; module.exports = ${tableName}`;

        fs.writeFileSync("./tables/" + tableName + ".js", table);

        console.log(`Sync table --> ${process.argv[2]} <-- complete`)

        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();
