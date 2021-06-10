const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  userRegisterRoutes = require("./userRegisterRoutes"),
  errorRoutes = require("./errorRoutes");


router.use("/users", userRoutes);
router.use("/usersRegister", userRegisterRoutes);
router.use("/", errorRoutes);

module.exports = router;
