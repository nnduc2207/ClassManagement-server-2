"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClass = createClass;
exports.deleteClass = deleteClass;
exports.getClass = getClass;
exports.getClasses = getClasses;

var _model = _interopRequireDefault(require("./model"));

var _controller = require("../study/controller");

var _controller2 = require("../teach/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getClasses() {
  try {
    const classes = await _model.default.find({});
    return classes;
  } catch (error) {
    throw error;
  }
}

async function getClass(id) {
  try {
    const _class = await _model.default.findById(id);

    return _class;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createClass({
  id,
  name
}) {
  try {
    console.log(id, name);
    const newClass = await _model.default.create({
      id,
      name
    });
    return newClass;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteClass(id) {
  try {
    const studies = await (0, _controller.getStudiesByClass)(id);

    if (studies.length != 0) {
      const deleteStudiesProcess = studies.forEach(async study => {
        return await study.remove();
      });
      await Promise.all(deleteStudiesProcess);
    }

    const teaches = await (0, _controller2.getTeachesByClass)(id);

    if (teaches.length != 0) {
      const deleteTeachesProcess = teaches.forEach(async teach => {
        return await teach.remove();
      });
      await Promise.all(deleteTeachesProcess);
    }

    await _model.default.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}