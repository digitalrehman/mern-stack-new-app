import jwt from "jsonwebtoken";

export let authMiddleware = (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server error"
        })
    }
}