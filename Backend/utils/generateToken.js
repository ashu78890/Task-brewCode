import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error("Jwt secret is missing!");
    throw new Error("JWT secret is undefined");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
