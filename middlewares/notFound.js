exports.notFound = (req, res, next) => {
  return next({ status: 404, message: "Page not found!" });
};
