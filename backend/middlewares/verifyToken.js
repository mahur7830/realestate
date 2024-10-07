const jwt = require("jsonwebtoken")


const verifyToken = async (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);

    if (!req.headers.authorization) {
        return res.status(403).json({ msg: 'Not authorized. No token' });
    }

    if (req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.error("Token error:", err);
                return res.status(403).json({ msg: 'Wrong or expired token' });
            } else {
                req.user = data; // data = {id: user._id}
                return next();
            }
        });
    } else {
        return res.status(403).json({ msg: 'Not authorized. Invalid token format' });
    }
};



module.exports = verifyToken