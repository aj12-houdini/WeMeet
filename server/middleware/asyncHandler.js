// Express 4 does not pass errors thrown inside async route handlers to the
// error-handling middleware. This wrapper catches them and forwards them.
const asyncHandler = (handler) => (req, res, next) =>
{
  return Promise.resolve(handler(req, res, next)).catch(next);

}

module.exports = asyncHandler;
