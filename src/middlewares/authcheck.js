const jwt = require("jsonwebtoken");

exports.adminAuthAndRoleCheck = (req, res, next) => {
  const authHeader = req.cookies.token || req.headers.authorization;
  if (
    !authHeader ||
    (!authHeader.startsWith("Bearer ") && !req.cookies.token)
  ) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = req.cookies.token || authHeader.split(" ")[1];
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
  const authHeader = req.cookies.token || req.headers.authorization;
  if (
    !authHeader ||
    (!authHeader.startsWith("Bearer ") && !req.cookies.token)
  ) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = req.cookies.token || authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.authuser = { id: decodedToken.id, role: decodedToken.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
