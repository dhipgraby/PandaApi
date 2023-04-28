import "../../types/CustomSession";
import { Request, Response } from "express";
import { userStorage } from "../../models/UserStorage";
import { hashPassword } from "../../helpers/validation";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { identifier, password } = req.body;

    const user = await userStorage.getUserByIdentifier(identifier);

    console.log(user);

    if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
    }

    const passwordMatches = hashPassword(password) === user.password;

    if (!passwordMatches) {
        res.status(401).send({ message: "Invalid credentials" });
        return;
    }

    req.session.userId = user.id;

    res.status(200).send({ message: "User logged in successfully", user });
};

export const getLoggedInUser = async (req: Request, res: Response): Promise<void> => {
    if (!req.session.userId) {
        res.status(401).send({ message: "Not logged in" });
        return;
    }

    const user = await userStorage.getUserById(req.session.userId);

    if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
    }

    res.status(200).send({ user });
};
