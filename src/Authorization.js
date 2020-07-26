import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || token === null) {
    return res.json({ Error: "User not Authenticated" });
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.json({ Error: "Invalid token" });
  }
  req.user = verified;
  next();
};
