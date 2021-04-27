const express = require("express");
const router = express.Router();
const posenet = require("./../../posenet");
const fs = require("fs");

const validPost = req => {
  const { fragmentId } = req.body;
  return {
    valid: !(!req.files || Object.keys(req.files).length === 0
    || Object.keys(req.files).length > 1 || fragmentId === undefined),
    fragmentId
  }
}

const uploadFile = (req, fragmentId) => {
  let fileKey = Object.keys(req.files)[0];
  let file = req.files[fileKey];
  let path = `./analyzer-uploads/images/${fragmentId}-${file.name}`;
  file.mv(path);
  return path;
}

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log(`IMAGE-ANALYZER File ${path.split("/").slice(-1).pop()} analyzed and removed`);
  });
}

router.post("/single/", (req, res) => {
  const {valid, fragmentId} = validPost(req)
  if(!valid){
    return res.status(400).send("Non valid post received.");
  }
  const path = uploadFile(req, fragmentId);
  posenet.processImageSinglePose(path).then((r) => {
    removeFile(path);
    return res.send({
      success: true,
      result: r,
    });
  });
});

router.post("/multiple/", (req, res) => {
  const {valid, fragmentId} = validPost(req)
  if(!valid){
    return res.status(400).send("Non valid post received.");
  }
  const path = uploadFile(req, fragmentId);
  posenet.processImageMultiplePoses(path).then((r) => {
    removeFile(path);
    return res.send({
      success: true,
      result: r,
    });
  });
});

module.exports = router;
