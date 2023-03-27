const mariadb = require("mariabd");

const pool = mariadb.createPool({
  host: "localhost",
  user: "dom",
  password: "1ArrowQuill",
  database: "smsCB"
})


async function main() {
  try {
    let conn = await poll.getConnection();
    let qry = await conn.query("SHOW TABLES");
    console.log(qry);
  }catch(err)
}
