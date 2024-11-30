import { unauthorized } from "../constants/httpStatus.js";
import authMid from "./auth.mid.js";

const adminMid = (req, res, next) => {
    if(!req.user.isAdmin) {
        res.status(unauthorized)
            .send("Bạn không có quyền truy cập ! (Admin Only !).");
    }

    return next();
}

export default [authMid, adminMid];