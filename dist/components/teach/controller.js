"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTeach = createTeach;
exports.deleteTeach = deleteTeach;
exports.getTeach = getTeach;
exports.getTeachesByClass = getTeachesByClass;
exports.getTeachesByUser = getTeachesByUser;

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getTeach({
  teacherId,
  classId
}) {
  try {
    const teach = await _model.default.findOne({
      teacherId,
      classId
    });
    return teach;
  } catch (error) {
    throw error;
  }
}

async function getTeachesByUser(teacherId) {
  try {
    const teaches = await _model.default.find({
      teacherId
    });
    return teaches;
  } catch (error) {
    throw error;
  }
}

async function getTeachesByClass(classId) {
  try {
    const teaches = await _model.default.find({
      classId
    });
    return teaches;
  } catch (error) {
    throw error;
  }
}

async function createTeach({
  teacherId,
  classId
}) {
  try {
    const teach = await _model.default.create({
      teacherId,
      classId
    });
    return teach;
  } catch (error) {
    throw error;
  }
}

async function deleteTeach({
  teacherId,
  classId
}) {
  try {
    await _model.default.findOneAndRemove({
      teacherId,
      classId
    });
    return true;
  } catch (error) {
    throw error;
  }
}