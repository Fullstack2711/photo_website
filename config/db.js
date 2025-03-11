const { Pool } = require("pg");
// require("dotenv").config();

const pool = new Pool({
  connectionString: "postgresql://zafar:gJpZD38I94C5Sw56LTBxJbTbKQ8MhT21@dpg-cv4k0qqj1k6c738odk2g-a.oregon-postgres.render.com/navruz_72ks",
  ssl: {
    rejectUnauthorized: false,  
  },
});

module.exports = pool;
