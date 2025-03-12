const pool = require("../config/db");
const jwt = require("jsonwebtoken");


exports.getPhotos = async (req, res) => {
  try {

    const { userId } = req.query;
    const result = await pool.query(
      `SELECT p.id, p.filepath, CONCAT(u.firstname, ' ', u.lastname) AS fullname, 
       COUNT(l.photoid) AS likeCount, 
       EXISTS (SELECT 1 FROM likes WHERE userId = $1 AND photoid = p.id) AS isLiked  
       FROM images p  
       LEFT JOIN likes l ON l.photoid = p.id  
       INNER JOIN users u ON p.userId = u.id  
       GROUP BY p.id, u.id;`,
      [userId]
    );
    const photos = result.rows.map((photo) => {
      return { ...photo, url: `http://localhost:4001/${photo.filepath}`};
    });
    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
};
exports.myPhotos = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query("SELECT * FROM images WHERE userId = $1", [userId]);

    const photos = result.rows.map((photo) => {
      return { ...photo, url: `http://localhost:4001/${photo.filepath}`};
    });

    return res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM images WHERE id = $1", [id]);
    res.json({ message: "Muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
};
exports.addPhoto = async (req, res) => {
  try {
    const filepath = req.file.path;
    console.log(filepath);

    // console.log(url, req.user.userid);

    const result = await pool.query(
      "INSERT INTO images (filepath, userId) VALUES ($1, $2) RETURNING *",
      [filepath, req.user.userid]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Girigitton kodida nomaqbul hatolik mavjud");
  }
};

