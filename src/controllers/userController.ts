import { Request, Response } from "express";
import { User, NewUser } from "../../types/User";
import { userStorage } from "../../models/UserStorage";
import {
  isValidUsername,
  isValidPassword,
  isValidEmail,
  emailError,
  nameError,
  passwordError,
  hashPassword
} from "../../helpers/validation";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, wallet, password, balance } = req.body;

  if (!isValidUsername(username)) {
    res.status(400).send({ message: nameError });
    return;
  }

  if (!isValidPassword(password)) {
    res.status(400).send({ message: passwordError });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).send({ message: emailError });
    return;
  }

  if (
    await userStorage.getUserByUsername(username) ||
    await userStorage.getUserByWallet(wallet) ||
    await userStorage.getUserByEmail(email)
  ) {
    res.status(400).send({ message: "Username, email, or wallet already exists" });
    return;
  }

  const newUser: NewUser = {
    username,
    email,
    wallet,
    registrationDate: new Date(),
    password: hashPassword(password), // password hashing
    balance
  };

  const createdUser = await userStorage.createUser(newUser as User);

  res.status(201).send({ message: "User registered successfully", user: createdUser });
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await userStorage.getUserById(userId);
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  res.status(200).send({ user });
};
