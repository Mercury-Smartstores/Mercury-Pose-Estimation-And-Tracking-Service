const { createCanvas, Image } = require("canvas");
const posenet = require("@tensorflow-models/posenet");
const tf = require("@tensorflow/tfjs-node");


const getModel = async () => posenet.load({
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: 640, height: 480 },
  multiplier: 0.75,
});


const getInputFromImagePath = (imagePath) => {
  const img = new Image();
  img.src = imagePath;
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return tf.browser.fromPixels(canvas);
};

const processImageSinglePose = async (imagePath) => {
  const net = await getModel();
  const input = getInputFromImagePath(imagePath);
  const pose = await net.estimateSinglePose(input, {
    flipHorizontal: false,
  });
  return pose["keypoints"];
};

const processImageMultiplePoses = async (imagePath) => {
  const net = await getModel();
  const input = getInputFromImagePath(imagePath);
  const pose = await net.estimateMultiplePoses(input, {
    flipHorizontal: false,
  });
  console.log(pose);
  return pose["keypoints"];
};

module.exports = { processImageSinglePose, processImageMultiplePoses};
