export const jwtConfig = {
  jwt_secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d',
};
