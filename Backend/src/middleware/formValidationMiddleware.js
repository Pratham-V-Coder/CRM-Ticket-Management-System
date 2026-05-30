import Joi from "joi";

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
});

const pin = Joi.number().min(100000).max(999999).required();
const newPassword = Joi.string().alphanum().min(3).max(30).required();
const shortStr = Joi.string().min(2).max(50).required();
const longStr = Joi.string().min(2).max(500);
const dt = Joi.date();

// ============ USER VALIDATION ============

const resetPassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const updatePassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const createNewTicketValidation = (req, res, next) => {
  const schema = Joi.object({
    subject: shortStr,
    sender: Joi.string().min(2).max(50),
    message: longStr,
    issueDate: dt,
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const replyTicketMessageValidation = (req, res, next) => {
  const schema = Joi.object({
    subject: Joi.string().min(2).max(50),
    sender: Joi.string().min(2).max(50),
    message: longStr,
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

// ============ ADMIN VALIDATION ============

const adminRegisterValidation = (req, res, next) => {
  const schema = Joi.object({
    name: shortStr,
    email,
    password: Joi.string().min(6).max(30).required(),
    company: shortStr,
    address: Joi.string().min(2).max(100).required(),
    phone: Joi.number().required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const adminLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email,
    password: Joi.string().min(6).max(30).required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

export {
  resetPassReqValidation,
  updatePassReqValidation,
  createNewTicketValidation,
  replyTicketMessageValidation,
  adminRegisterValidation,
  adminLoginValidation,
};
