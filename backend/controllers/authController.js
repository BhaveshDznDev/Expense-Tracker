import { pool } from "../libs/database.js";
import { comparePassword, createJWT, hashPassword } from "../libs/index.js";

const AUTH_PROVIDER = ["google", "github"];

export const signupUser = async (req, res) => {
  try {
    const { firstName, email, password, provider } = req.body;

    //validate fileds
    if (!(firstName || email)) {
      return res.status(404).json({
        status: "failed",
        message: "Provide Required Fields!",
      });
    }

    if (!AUTH_PROVIDER.includes(provider)) {
      if (!password) {
        return res.status(404).json({
          status: "failed",
          message: "Password is required",
        });
      }

      if (password?.length < 8) {
        return res.status(404).json({
          status: "failed",
          message: "Password must be at least 8 characters long.",
        });
      }
    }

    const userExist = await pool.query({
      text: `SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)`,
      values: [email],
    });

    if (userExist.rows[0].exists) {
      return res.status(409).json({
        status: "failed",
        message: "Email Address already exists. Try Sign in.",
      });
    }

    const hashedPassword = AUTH_PROVIDER.includes(provider)
      ? null
      : await hashPassword(password);

    const user = await pool.query({
      text: `INSERT INTO tbluser(email, password, firstname, provider) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [email, hashedPassword, firstName, provider],
    });

    user.rows[0].password = undefined;

    res.status(201).json({
      status: "success",
      message: "User account created successfully",
      user: user.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { email, password, provider, name } = req.body;

    if (!email) {
      return res.status(404).json({
        status: "failed",
        message: "Email is required",
      });
    }

    const result = await pool.query({
      text: `SELECT * FROM tbluser WHERE email = $1`,
      values: [email],
    });

    let user = null;

    user = result?.rows[0];
    console.log(user, req.body);
    if (!user) {
      if (AUTH_PROVIDER.includes(provider)) {
        const newUser = await pool.query({
          text: `INSERT INTO tbluser(email, password, firstname, provider) VALUES ($1, $2, $3, $4) RETURNING *`,
          values: [email, null, name, provider],
        });

        user = newUser.rows[0];
      } else
        return res
          .status(404)
          .json({ status: "failed", message: "Invalid email or password." });
    }

    if (
      !user?.password &&
      !AUTH_PROVIDER.includes(user?.provider || provider)
    ) {
      return res.status(404).json({
        status: "failed",
        message: "Password is required",
      });
    }

    if (user?.password && !AUTH_PROVIDER.includes(user?.provider)) {
      // compare password
      const isMatch = await comparePassword(password, user?.password);

      if (!isMatch) {
        return res.status(404).json({
          status: "failed",
          message: "Invalid email or password",
        });
      }
    }

    const token = createJWT(user.id);

    user.password = undefined;

    res
      .status(200)
      .json({ status: "success", message: "Login successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};
