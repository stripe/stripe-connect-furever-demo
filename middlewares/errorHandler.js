module.exports = (err, req, res, next) => {
  req.error = err;

  res.status(500);

  res.json({ error: err.message, stack: err.stack });
};
