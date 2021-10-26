"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _model = _interopRequireDefault(require("../class/model"));

var _model2 = _interopRequireDefault(require("../user/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StudySchema = new _mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    uppercase: true,
    validate: {
      validator: async function (v) {
        const user = await _model2.default.findById(v);
        const check = user && user.isStudent;
        return check;
      },
      message: props => `${props.value} is not a exist studentId!`
    }
  },
  classId: {
    type: String,
    required: true,
    uppercase: true,
    validate: {
      validator: async function (v) {
        const _class = await _model.default.findById(v);

        return !!_class;
      },
      message: props => `${props.value} is not a exist classId!`
    }
  },
  Score: [{
    name: {
      type: String,
      required: true
    },
    factor: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});
const Study = (0, _mongoose.model)("Study", StudySchema);
var _default = Study;
exports.default = _default;