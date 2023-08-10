export default () => ({
  PORT: parseInt(process.env.PORT) || 3000,
  // eslint-disable-next-line prettier/prettier
  SECRET_KEY: process.env.SECRET_KEY || 's038-pwpppwpeok-dffMjfjriru44030423-edmmfvnvdmjrp4l4k',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
});
