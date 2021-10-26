"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ClassSchema = new _mongoose.Schema({
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
  }
}, {
  timestamps: true
});

ClassSchema.statics.findById = async function (id, projection, options, callback) {
  return await this.findOne({
    id: id.toUpperCase()
  }, projection, options, callback);
};

ClassSchema.statics.findByIdAndRemove = async function (id, options, callback) {
  return await this.findOneAndRemove({
    id: id.toUpperCase()
  }, options, callback);
};

ClassSchema.statics.findByIdAndDelete = async function (id, options, callback) {
  return await this.findOneAndDelete({
    id: id.toUpperCase()
  }, options, callback);
};

ClassSchema.statics.findByIdAndUpdate = async function (id, update, options, callback) {
  return await this.findOneAndUpdate({
    id: id.toUpperCase()
  }, update, options, callback);
};

const Class = (0, _mongoose.model)("Class", ClassSchema);
var _default = Class;
exports.default = _default;