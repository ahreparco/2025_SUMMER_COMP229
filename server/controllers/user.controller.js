import User from "../models/userModel.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// CREATE: save and return the new user (including default role)
export const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role }); // role optional, defaults to 'User'
  try {
    await user.save();
    // hide sensitive fields before returning
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// LIST: include the role in the projection
export const list = async (req, res) => {
  try {
    let users = await User.find()
      .select("name email role updated created");   // <-- added `role`
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// The rest stays the same...
export const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);   // this will now include `role`
};

export const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);               // updated user with role
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);        // deleted user with role
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};