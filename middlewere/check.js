const jwt = require('jsonwebtoken')

exports.checkToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token berilmadi" });
    }
    try {
        const check = jwt.verify(token, "Eshmat Toshmatov kayfusha");
        req.user = check;
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};