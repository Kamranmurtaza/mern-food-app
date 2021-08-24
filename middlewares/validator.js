const validate = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
    } else next();
  };
};

module.exports = { validate };
