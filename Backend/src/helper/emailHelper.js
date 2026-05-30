import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "hope.kunze75@ethereal.email",
    pass: "xynVPhcbJtpR9R84wV",
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await transporter.sendMail(info);
      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result)); // ✅ Fixed: info → result
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error); // ✅ Added: missing reject on error
    }
  });
};

const emailProcessor = ({ email, pin, type }) => {
  let info = ""; // ✅ Fixed: const → let, moved outside switch so all cases can access it
  switch (type) {
    case "request-new-password":
      info = {
        from: '"Fred Foo" <foo@example.com>',
        to: email,
        subject: "Password reset pin",
        text:
          "Here is your password reset pin " +
          pin +
          " This pin will expire in 1 day",
        html: `<b>Hello</b>,
        <p>Here is your pin: <b>${pin}</b></p>
        <p>This pin will expire in 1 day.</p>`,
      };
      send(info); // ✅ Already correct
      break;

    case "update-password-success":
      info = {
        // ✅ Fixed: const info → just info (uses outer let)
        from: '"Fred Foo" <foo@example.com>',
        to: email,
        subject: "Password Updated",
        text: "Your new password has been updated",
        html: `<b>Hello</b>
        <p>Your password has been updated</p>`,
      };
      send(info); // ✅ Added: missing send(info) call
      break;

    default:
      break;
  } // ✅ Fixed: missing closing bracket for switch
}; // ✅ Fixed: missing closing bracket for emailProcessor

export { emailProcessor }; // ✅ Fixed: module.exports → export, removed pin (not a function)
