const express = require('express');

const adminController = require("../controllers/home.controller");

const router = express.Router();

router.get("", adminController.index)
router.get("/users", adminController.user)
router.post("/users/add", adminController.addUser)
router.post("/users/edit", adminController.editUser)
router.get("/users/delete/:id", adminController.deleteUser)
router.get("/posts", adminController.posts)
router.post("/posts/edit", adminController.editPost)
router.get("/posts/delete/:id", adminController.deletePost)

module.exports = router;