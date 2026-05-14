const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    console.log('DECODED JWT:', decoded);


    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
    next()
  } catch {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }
}