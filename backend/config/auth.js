const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

const APP_SECRET = process.env.APP_SECRET || 'secret'
const APP_REFRESH_SECRET = process.env.APP_REFRESH_SECRET || 'refreshSecret'

exports.issueToken = async({ name, email, username, id }) => {
  let token = await jwt.sign({ name, email, username, id }, APP_SECRET );
  let refreshToken = await jwt.sign({ name, email, username, id }, APP_REFRESH_SECRET, {
    expiresIn: "2d"
  });
  return {
    token,
    refreshToken
  }
}

exports.getAuthUser = async(req, requiresAuth = false) => {
  const header = req.headers['authorization'];
  if (header) {
    const token = jwt.verify(header, APP_SECRET);
    console.log("TOKEN_DECODED", token);
    let authUser = await User.findById(token.id);
    if(!authUser) {
      throw new Error("Invalid token, User authentication failed");
    }
    if (requiresAuth) {
      return authUser;
    }
    return null;
  }
}

exports.getRefreshTokenUser = async (req) => {
  const header = req.headers['refresh_token'];
  if (header) {
    const token = jwt.verify(header, APP_REFRESH_SECRET);
    console.log("TOKEN_DECODED", token);
    let authUser = await User.findById(token.id);
    if(!authUser) {
      throw new AuthenticationError("Invalid refresh token, User authentication failed");
    }
    return authUser;
  }
}