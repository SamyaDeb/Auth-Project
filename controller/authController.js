import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import transporter from "../config/nodemiller.js";
import userId from "../middleware/userAuth.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedpassword,
    });

    await user.save();

    //after saving the user we need to create the token and pass it to the cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: true,         // ✅ must be true for HTTPS
      sameSite: "none",     // ✅ must be "none" for cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Sending welcome email
    try {
      const mail = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to Auth",
        text: `Welcome to Auth website. Your account has been created with email id : ${email}`,
      };

      await transporter.sendMail(mail);
    } catch (error) {
      res.json(error.message);
    }

    return res.json({ success: true, message: "New user created...😊" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: true,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: true,         // ✅ must be true for HTTPS
      sameSite: "none",     // ✅ must be "none" for cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendverifyOtp = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from middleware, not body

    const user = await User.findById(userId); // ✅ use findById

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mail);

    return res.json({
      success: true,
      message: "Verification OTP sent on Email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body; // ✅ only destructure otp now
  const userId = req.userId; // ✅ from middleware

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//check if user is authenticated or not...
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Generate OTP and save it to user
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // ✅ Send OTP mail
    const mail = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP within 15 minutes.`,
    };

    await transporter.sendMail(mail);

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {

  const { email, otp, newPassword } = req.body;

  if(!email || !otp || !newPassword){
    return res.json({ success: false, message: "Emai, OTP, Password are required" });
  }

  try {

    const user = await User.findOne({email})

    if(!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({ success: false, message: "Invalid Otp" });
    }

    if(user.resetOtpExpireAt < Date.now()){
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hasedpassword = await bcrypt.hash(newPassword,10);

    user.password = hasedpassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success:true, message:"Password has beedn reset successfully"})

    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
