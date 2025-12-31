// import { registerUser,  loginUser } from "./auth.service.js";

// export const register = async (req, res) => {
//   try {
//     const user = await registerUser(req.body);
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const token = await loginUser(req.body);
//     res.status(200).json(token);
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// };


import { registerUser, validateUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await validateUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in prod
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};


export const me = (req, res) => {
  res.json(req.user);
};