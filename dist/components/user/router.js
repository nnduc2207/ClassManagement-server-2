"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // LOGIN


router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const {
      user,
      token
    } = await (0, _controller.login)({
      email,
      password
    });
    return res.json({
      user,
      token
    });
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.post("/authenticate", async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw "Failed authentication";
    }

    const user = await (0, _controller.authenticateToken)(token);
    return res.json({
      user
    });
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
}); // UPDATE CLASS

router.get("/getclasses", async (req, res) => {
  const {
    id
  } = req.body;

  try {
    const classes = await (0, _controller.getMyClasses)(id);
    return res.json(classes);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.post("/addclass", async (req, res) => {
  const {
    studentId,
    teacherId,
    classId
  } = req.body;

  try {
    await (0, _controller.addClass)({
      studentId,
      teacherId,
      classId
    });
    return res.send(true);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.delete("/deleteclass", async (req, res) => {
  const {
    studentId,
    teacherId,
    classId
  } = req.body;

  try {
    await (0, _controller.deleteClass)({
      studentId,
      teacherId,
      classId
    });
    return res.send(true);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
}); // USER DATA

router.get("/students", async (req, res) => {
  try {
    const students = await _model.default.find({
      isStudent: true
    });
    return res.json(students);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await _model.default.find({
      isStudent: false
    });
    return res.json(teachers);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.post("/", async (req, res) => {
  const {
    id,
    name,
    email,
    password,
    isStudent
  } = req.body;

  try {
    const result = await (0, _controller.createUser)({
      id,
      name,
      email,
      password,
      isStudent
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await _model.default.findById(id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
router.patch("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    email
  } = req.body;

  try {
    const user = await (0, _controller.updateUser)({
      id,
      name,
      email
    });
    return res.json(user);
  } catch (error) {
    return res.status(404).send();
  }
});
router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  try {
    await (0, _controller.deleteUser)(id);
    return res.send(true);
  } catch (error) {
    return res.status(404).json({
      error: error.toString()
    });
  }
});
var _default = router;
exports.default = _default;