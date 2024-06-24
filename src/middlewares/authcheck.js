const jwt = require("jsonwebtoken");

exports.adminAuthAndRoleCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = { id: decodedToken.id, role: decodedToken.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

exports.userAuthAndRoleCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if (decodedToken.role !== "user") {
    //   return res.status(403).json({ message: "Access denied" });
    // }
    req.authuser = { id: decodedToken.id, role: decodedToken.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
