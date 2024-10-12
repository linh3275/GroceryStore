import pkg from "jsonwebtoken";
import { unauthorized } from "../constants/httpStatus.js";

const { verify } = pkg;

export default (req, res, next) => {
    const token = req.headers.access_token;

    if (!token) return res.status(unauthorized).send();

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        res.status(unauthorized).send();
    }

    return next();
}