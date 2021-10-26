"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStudy = createStudy;
exports.deleteStudy = deleteStudy;
exports.getStudiesByClass = getStudiesByClass;
exports.getStudiesByUser = getStudiesByUser;
exports.getStudy = getStudy;

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getStudy({
  studentId,
  classId
}) {
  try {
    const study = await _model.default.findOne({
      studentId,
      classId
    });
    return study;
  } catch (error) {
    throw error;
  }
}

async function getStudiesByUser(studentId) {
  try {
    const studies = await _model.default.find({
      studentId
    });
    return studies;
  } catch (error) {
    throw error;
  }
}

async function getStudiesByClass(classId) {
  try {
    const studies = await _model.default.find({
      classId
    });
    return studies;
  } catch (error) {
    throw error;
  }
}

async function createStudy({
  studentId,
  classId
}) {
  try {
    const study = await _model.default.create({
      studentId,
      classId
    });
    return study;
  } catch (error) {
    throw error;
  }
}

async function deleteStudy({
  studentId,
  classId
}) {
  try {
    await _model.default.findOneAndRemove({
      studentId,
      classId
    });
    return true;
  } catch (error) {
    throw error;
  }
}