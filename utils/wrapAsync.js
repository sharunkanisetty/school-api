// utils/wrapAsync.js
module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);  // Catch async errors and pass to the error handler
    };
  };
  