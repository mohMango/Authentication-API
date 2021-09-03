import jwt from "jsonwebtoken";
import { User } from "./auth.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });

    console.log(user);

    if (Object.keys(user).length === 0)
      return res.status(404).json({ message: "User not found" });

    if (password !== user.password)
      return res.status(404).json({ message: "password incorrect" });

    const token = jwt.sign({ email: email }, "very secret ket");

    await User.addToken(user, token);

    res.status(200).json({ data: user, token });
  } catch (error) {
    res.status(500).json({ error: "login error" });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });

    if (Object.keys(user).length !== 0)
      return res.status(400).json({ message: "user already exists" });

    const token = jwt.sign({ email: email }, "very secret ket");
    const newUser = await User.add({
      email: email,
      password: password,
    });
    await User.addToken({ email: email }, token);

    res.status(200).json({ data: newUser, token });
  } catch (error) {
    res.status(500).json({ error: "register error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    await User.logout({ email: req.email }, token);

    res.status(200).json({ data: "logout" });
  } catch (error) {
    res.status(500).json({ error: "logout error" });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    await User.update({ password: newPassword, email: req.email });
    await User.deleteAllSession({ email: req.email });

    const token = jwt.sign({ email: req.email }, "very secret ket");

    await User.addToken({ email: req.email }, token);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: "update error" });
  }
};
