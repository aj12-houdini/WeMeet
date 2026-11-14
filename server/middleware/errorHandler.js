const { ApiError } = require("../errors/ApiError");

// Turns errors thrown by the controllers into responses.
// ApiError (and its subclasses) become { message } with their status code,
// the same shape the controllers used to build by hand.
// Any other error goes on to Express's default handler (status 500),
// which is what happened before this middleware existed.
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  next(err);
}

module.exports = errorHandler;
