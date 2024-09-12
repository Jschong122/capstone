import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  if (req.method === "POST") {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized , no token provided" });
    }
    jwt.verify(token, process.env.NEXTAUTH_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  }
};

export { verifyToken };
