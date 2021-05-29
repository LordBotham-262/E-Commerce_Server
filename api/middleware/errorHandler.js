module.exports = (statusCode, error,req, res, next) => {
    if (req.userData.role[0] === "buyer") {
      return res.status(401).json({
        message: "You do not have proper Authentication.",
      });
    } else {
      next();
    }
  };