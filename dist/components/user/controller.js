"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.authenticateToken = authenticateToken;
exports.createUser = createUser;
exports.deleteClass = deleteClass;
exports.deleteUser = deleteUser;
exports.getMyClasses = getMyClasses;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.login = login;
exports.updateUser = updateUser;

var bcrypt = _interopRequireWildcard(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = _interopRequireDefault(require("./model"));

var _controller = require("../study/controller");

var _controller2 = require("../teach/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function getUsers(isStudent = true) {
  try {
    const user = await _model.default.find({
      isStudent
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(id) {
  try {
    const user = await _model.default.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser({
  id,
  name,
  email,
  password,
  isStudent
}) {
  try {
    if (!(id && name && email && password && isStudent != undefined)) {
      throw "Missing data";
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await _model.default.create({
      id,
      name,
      email,
      password: hash,
      isStudent
    });
    return user;
  } catch (error) {
    var _error$keyPattern, _error$keyPattern2;

    if ((_error$keyPattern = error.keyPattern) !== null && _error$keyPattern !== void 0 && _error$keyPattern.email) {
      throw "Email has been used";
    }

    if ((_error$keyPattern2 = error.keyPattern) !== null && _error$keyPattern2 !== void 0 && _error$keyPattern2.id) {
      throw "ID has been used";
    }

    throw error;
  }
}

async function updateUser({
  id,
  name,
  email
}) {
  try {
    const user = await _model.default.findById(id);

    if (!user) {
      throw new Error(id + " is not an exist UserId");
    }

    const updatedData = {
      name,
      email
    };
    const attributes = ["name", "email"];
    attributes.forEach(a => {
      if (updatedData[a]) {
        user[a] = updatedData[a];
      }
    });
    user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await _model.default.findById(id);

    if (!user) {
      throw `${id} is not an exist UserId`;
    }

    if (user.isStudent) {
      const studies = await (0, _controller.getStudiesByUser)(id);
      const deleteStudiesProcess = studies.forEach(async study => {
        return await study.remove();
      });
      deleteStudiesProcess && (await Promise.all(deleteStudiesProcess));
    } else {
      const teaches = await (0, _controller2.getTeachesByUser)(id);
      const deleteTeachesProcess = teaches.forEach(async teach => {
        return await teach.remove();
      });
      deleteTeachesProcess && (await Promise.all(deleteTeachesProcess));
    }

    await user.remove();
  } catch (error) {
    throw error;
  }
}

async function getMyClasses(id) {
  try {
    const user = await _model.default.findById(id);

    if (user.isStudent) {
      const studies = await (0, _controller.getStudiesByUser)(id);
      return studies;
    } else {
      const teaches = await (0, _controller2.getTeachesByUser)(id);
      return teaches;
    }
  } catch (error) {
    throw error;
  }
}

async function addClass({
  studentId = undefined,
  teacherId = undefined,
  classId
}) {
  try {
    if (studentId) {
      await (0, _controller.createStudy)({
        studentId,
        classId
      });
    } else {
      await (0, _controller2.createTeach)({
        teacherId,
        classId
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
}

async function deleteClass({
  studentId = undefined,
  teacherId = undefined,
  classId
}) {
  try {
    if (studentId) {
      await (0, _controller.deleteStudy)({
        studentId,
        classId
      });
    } else {
      await (0, _controller2.deleteTeach)({
        teacherId,
        classId
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
}

async function login({
  email,
  password
}) {
  try {
    const user = await _model.default.findOne({
      email
    });

    if (!user) {
      throw "Account hasn't been created";
    }

    const checkPass = bcrypt.compareSync(password, user.password);

    if (!checkPass) {
      throw "Password wrong";
    }

    const token = _jsonwebtoken.default.sign({ ...user._doc
    }, process && process.env && process.env.ACCESS_TOKEN_SECRET || "hcmusclassmanager", {
      expiresIn: '1h'
    });

    return {
      user,
      token
    };
  } catch (error) {
    throw error;
  }
}

async function authenticateToken(token) {
  try {
    let user = _jsonwebtoken.default.verify(token, process && process.env && process.env.ACCESS_TOKEN_SECRET || "hcmusclassmanager");

    user = await _model.default.findOne({
      id: user.id,
      password: user.password
    });

    if (!user) {
      throw "Failed Authentication";
    }

    return user;
  } catch (error) {
    throw error;
  }
}