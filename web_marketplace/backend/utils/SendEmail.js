const sendEmail = async (username, email, otp) => {
  // Dummy send email function to prevent server crashes
  console.log(`[Email Service] Mock email sent to ${email} for user ${username}. OTP: ${otp}`);
  return true;
};

module.exports = sendEmail;
