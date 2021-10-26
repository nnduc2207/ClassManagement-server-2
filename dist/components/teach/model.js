"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _model = _interopRequireDefault(require("../class/model"));

var _model2 = _interopRequireDefault(require("../user/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TeachSchema = new _mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    uppercase: true,
    validate: {
      validator: async function (v) {
        const user = await _model2.default.findById(v);
        const check = user && !user.isStudent;
        return check;
      },
      message: props => `${props.value} is not a exist teacherId!`
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
  }
}, {
  timestamps: true
});
const Teach = (0, _mongoose.model)("Teach", TeachSchema);
var _default = Teach;
exports.default = _default;