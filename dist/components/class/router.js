"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async function (req, res) {
  try {
    const classes = await (0, _controller.getClasses)();
    return res.json(classes);
  } catch (error) {
    return res.status(404).json(error);
  }
});
router.post("/", async (req, res) => {
  const {
    id,
    name
  } = req.body;

  try {
    const result = await (0, _controller.createClass)({
      id,
      name
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json(error);
  }
});
router.get("/:id", async function (req, res) {
  try {
    const {
      id
    } = req.params;

    const _class = await (0, _controller.getClass)(id);

    return res.json(_class);
  } catch (error) {
    return res.status(404).json(error);
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const {
      id
    } = req.params;
    await (0, _controller.deleteClass)(id);
    return res.send(true);
  } catch (error) {
    return res.status(404).json(error);
  }
});
var _default = router;
exports.default = _default;