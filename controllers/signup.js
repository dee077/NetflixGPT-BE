const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const the_movie_db_bearer_token = process.env.THEMOVIEDB_BEARER_TOKEN;
const open_ai_key = process.env.OPENAI_API_KEY;

const saltRounds = 10;

const validateSignUpData = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name.trim().length) {
    res.status(400).json({ message: "Please enter a name" });
    return false;
  }
  if (!isEmail(email)) {
    res.status(400).json({ message: "Please enter a vaild email" });
    return false;
  }
  if (!password.trim().length) {
    res.status(400).json({ message: "Please enter a password" });
    return false;
  }
  if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length should be 6 characters" });
    return false;
  }
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ message: "Email already exists" });
    return false;
  }
  return true;
};

module.exports = async (req, res) => {
  const { name, email, password, imageId, userType } = req.body;
  const isValid = await validateSignUpData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        imageId,
        userType,
      });
      const jwtToken = jwt.sign(
        {
          _id: user.id,
          name: user.name,
          email: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({
        message: "Account created successfully",
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          imageId: user.imageId,
          userType: user.userType,
        },
        jwtToken,
        the_movie_db_bearer_token,
        open_ai_key,
      });
    } catch (error) {
      console.log(`Error orrcured during signup: ${error}`);
      res.status(400).json({ message: error });
    }
  }
};
