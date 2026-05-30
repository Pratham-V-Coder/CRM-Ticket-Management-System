const handleError = (error, res) => {
  const status = error.status || 500;

  res.status(status).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default handleError;
