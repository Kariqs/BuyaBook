const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller");
const imageUploadMiddleware = require("../middlewares/uploadImage");

router.get("/addnewbook", adminController.getNewBook);
router.post("/addnewbook", imageUploadMiddleware, adminController.addNewBook);

module.exports = router;
