const todoRouter = require("./todo");
const express = require("express");
const router = express.Router();
router.use("/todo", todoRouter);
module.exports = { router };
