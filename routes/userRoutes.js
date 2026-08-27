import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

console.log("USER ROUTES FILE LOADED")

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // ================= VALIDATION =================

if (!name?.trim()) {
  return res.status(400).json({
    message: "Full name is required.",
  });
}

if (!/^[A-Za-z ]+$/.test(name.trim())) {
  return res.status(400).json({
    message: "Full name should contain only alphabets.",
  });
}

if (name.trim().length < 3) {
  return res.status(400).json({
    message: "Full name must contain at least 3 characters.",
  });
}

if (!email?.trim()) {
  return res.status(400).json({
    message: "Email is required.",
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {
  return res.status(400).json({
    message: "Please enter a valid email address.",
  });
}

if (!password?.trim()) {
  return res.status(400).json({
    message: "Password is required.",
  });
}

if (password.length < 6) {
  return res.status(400).json({
    message: "Password must contain at least 6 characters.",
  });
}

    const existingUser = await User.findOne({
      $or: [
        { email: email.trim().toLowerCase() },
        { name: name.trim() }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this username or email already exists. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

const user = await User.create({
  name: name.trim(),
  email: email.trim().toLowerCase(),
  password: hashedPassword,
});

    res.status(201).json({
      message: "Registration Successful!",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again.",
      error: error.message,
    });
  }
});
/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // ================= VALIDATION =================

if (!email?.trim()) {
  return res.status(400).json({
    message: "Email is required.",
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {
  return res.status(400).json({
    message: "Please enter a valid email address.",
  });
}

if (!password?.trim()) {
  return res.status(400).json({
    message: "Password is required.",
  });
}

if (password.length < 6) {
  return res.status(400).json({
    message: "Password must contain at least 6 characters.",
  });
}

    console.log("Login Email:", email);
    console.log("Login Password:", password);

    const user = await User.findOne({
  email: email.trim().toLowerCase(),
});

if (!user) {
  return res.status(401).json({
    message: "Invalid Email or Password",
  });
}

const isPasswordCorrect = await bcrypt.compare(
  password.trim(),
  user.password
);

if (!isPasswordCorrect) {
  return res.status(401).json({
    message: "Invalid Email or Password",
  });
}

    console.log("Found User:", user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;