export const errorHandler = async (err, req, res, next) => {
  return res.sendStatus(400).send({
    message: err.message,
    status: err.status || 400
  });
};
