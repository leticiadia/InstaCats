const express = require("express");

const router = express.Router();

const CommentController = require("../controllers/CommentController");

router.post("/comment", CommentController.create);

module.exports = router;
