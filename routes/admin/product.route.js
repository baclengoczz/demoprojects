const express = require('express');
const multer = require('multer');
// const storageMulter = require("../../helper/storemulter");

const router = express.Router();
const upload = multer();



const uploadCloud= require("../../middlewares/admin/upload.Cloudmiddleware");
const controller = require("../../controllers/admin/product.controller")

const validate = require("../../validates/admin/validate.product");

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', controller.create);
router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);
router.get('/undelete', controller.undelete);
router.patch('/undelete/:id', controller.undeleteItem);
router.delete('/deleteReal/:id', controller.deleteItemReal);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch);
router.get("/detail/:id", controller.detail);













module.exports = router;