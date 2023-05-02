const request = (req, res, next) => {
  console.log("Got a request ");
  next();
};

module.exports = request;
