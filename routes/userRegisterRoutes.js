const router = require("express").Router(),
  userRegisterController = require("../controllers/userRegisterController");

router.get("/", userRegisterController.index, userRegisterController.indexView);
router.get("/usersRegister/new", userRegisterController.new);
router.get("/usersRegister/:id", userRegisterController.show, userRegisterController.showView);
router.get("/usersRegister/:id/edit", userRegisterController.edit);
router.put("/usersRegister/:id/update", userRegisterController.update, userRegisterController.redirectView);
router.delete("/usersRegister/:id/delete", userRegisterController.delete, userRegisterController.redirectView);

module.exports = router;
