async function errorHandler(err, req, res, next) {
  let code = err.code || 500;
  let message = "Internal server error";

  if (err.name === "AccommodationNotFound") {
    code = 404;
    message = { message: ["Accommodation not found"] };
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    const errMap = err.errors.map((el) => {
      return el.message;
    });
    message = { message: errMap };
  } else if (err.name === "FileIsBig") {
    code = 400;
    message = { message: ["Image filesize should be less than 255kb"] };
  } else if (err.name === "WrongTypeFile") {
    code = 400;
    message = { message: ["Image type file should be .jpg, .jpeg or .png"] };
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = { message: [`Email is already registered`] };
  }

  res.status(code).json(message);
}

module.exports = { errorHandler };