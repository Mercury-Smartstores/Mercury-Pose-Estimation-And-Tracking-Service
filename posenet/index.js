const { createCanvas, Image } = require('canvas')
const posenet = require('@tensorflow-models/posenet');
const tf = require('@tensorflow/tfjs-node');

const processImage = async (imagePath)  =>{
    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
    });
    const img = new Image();
    img.src = imagePath;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);

    const pose = await net.estimateSinglePose(input, {
        flipHorizontal: false
    });

    return pose['keypoints'];
}

module.exports = {processImage}