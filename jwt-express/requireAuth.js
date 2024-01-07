const jwt = require('jsonwebtoken');
require('dotenv').config()

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SIGNATURE)
    req.user = decodedToken;
    next()
  } catch (error) {
    // console.log("invali tokens " + error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
module.exports = requireAuth






