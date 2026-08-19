const jwt = require('jsonwebtoken');

function authJwt(req, res, next) {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error :", error);
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authJwt;
