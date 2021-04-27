const express = require("express");
const router = express.Router();
const posenet = require("./../../posenet");
const fs = require("fs");

router.post("/", (req, res) => {
  const { fragmentId } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No file uploaded.");
  } else if (Object.keys(req.files).length > 1) {
    return res.status(400).send("Server cannot process multiple files.");
  } else if (fragmentId === undefined) {
    return res.status(400).send("No fragment id provided.");
  }
  let fileKey = Object.keys(req.files)[0];
  let file = req.files[fileKey];
  let path = `./analyzer-uploads/images/${fragmentId}-${file.name}`;

  file.mv(path);

  posenet.processImage(path).then((r) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log(`IMAGE-ANALYZER File ${file.name} analyzed and removed`);
    });
    return res.send({
      success: true,
      result: r,
    });
  });
});

module.exports = router;
