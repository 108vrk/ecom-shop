const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "This is the index api" });
});

module.exports = router;
