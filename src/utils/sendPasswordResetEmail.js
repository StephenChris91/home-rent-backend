function sendPasswordResetEmail(email) {
  // Simulate sending a password reset email
  console.log(`Password reset email sent to ${email}`);

  if (!email.includes("@")) {
    console.error("Invalid email address");
    return;
  }
}
