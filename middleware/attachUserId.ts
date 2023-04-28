//middleware/attachUserId
import "../types/CustomSession";
import { Request, Response, NextFunction } from "express";

export async function attachUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Retrieve the user ID from the session. Replace this line with the actual logic you use to get the user ID.
    const userId = req.session.userId;
    if (!userId) {
        res.status(401).send({ message: "Not logged in" });
    } else {
        next()
    }
}
