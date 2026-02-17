const jwt = require("jsonwebtoken");
const { JWT_secret } = require("./config");

function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                message: "Token missing"
            });
        }

        const token = authHeader.split(" ")[1]; // remove "Bearer "

        const decoded = jwt.verify(token, JWT_secret);

        req.userId = decoded.userId; // VERY IMPORTANT
        next();

    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = { authenticate };
