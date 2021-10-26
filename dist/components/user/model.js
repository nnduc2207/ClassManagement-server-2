"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    uppercase: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isStudent: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

UserSchema.statics.findById = async function (id, projection, options, callback) {
  return await this.findOne({
    id: id.toUpperCase()
  }, projection, options, callback);
};

UserSchema.statics.findByIdAndRemove = async function (id, options, callback) {
  return await this.findOneAndRemove({
    id: id.toUpperCase()
  }, options, callback);
};

UserSchema.statics.findByIdAndDelete = async function (id, options, callback) {
  return await this.findOneAndDelete({
    id: id.toUpperCase()
  }, options, callback);
};

UserSchema.statics.findByIdAndUpdate = async function (id, update, options, callback) {
  return await this.findOneAndUpdate({
    id: id.toUpperCase()
  }, update, options, callback);
};

const User = (0, _mongoose.model)("User", UserSchema);
var _default = User;
exports.default = _default;