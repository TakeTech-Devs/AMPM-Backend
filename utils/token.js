const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const isProduction = process.env.NODE_ENV === "production";

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: isProduction,                    // Required for cross-site cookies
        sameSite: isProduction ? "None" : "Lax"  // Allow frontend on different domain
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};
module.exports = sendToken;
