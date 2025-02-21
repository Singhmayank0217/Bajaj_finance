const express = require("express");
const { getBfhl, postBfhl } = require("../controllers/bfhlController");

const router = express.Router();

router.get("/", getBfhl);
router.post("/", postBfhl);

module.exports = router;