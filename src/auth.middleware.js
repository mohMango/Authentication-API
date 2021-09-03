import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "very secret ket");
    req.email = data?.email;
    next();
  } catch (error) {
    res.status(401).send({ message: "not authorized" });
    throw new Error(error);
  }
};
