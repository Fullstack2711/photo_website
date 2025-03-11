const pool = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;
    const test = await pool.query(
      `SELECT * FROM users WHERE username = $1 LIMIT 1`,
      [username]
    );
    if (test.rows.length > 0) {
      return res.status(401).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10)
    const randomSalt = await bcrypt.hash(password, salt)

    const result = await pool.query(
      `insert into users(firstname, lastname, username, password) values ($1, $2, $3, $4) returning *`,
      [firstname, lastname, username, randomSalt]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      `SELECT id, firstname, lastname, username, password FROM users WHERE username = $1  `,
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    const user = result.rows[0]
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        userid: user.id,
        username: user.username
      },
      "Eshmat Toshmatov kayfusha",
      { expiresIn: "10m" })
    

  res.status(200).json({ user: result.rows[0] , token: token});
} catch (error) {
  console.log(error);
  res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
}
};


