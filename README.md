# Mercury Pose Estimation & Tracking Service🏃

A REST server which processes image requests with [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet),
 and it replies with keypoints detected. You can also use the server to open a video streaming channel
 to provide tracking online estimations using [YOLO](https://arxiv.org/abs/1506.02640) along with the
 [DeepSORT](https://arxiv.org/abs/1703.07402) algorithm. 

### 🔧 Installation

We recommend using the command-line utility npm to install the dependencies listed in 
the package.json file. You can install the dependencies running:

``
npm install
``

The server starts listening by default in port defined by the environment variable PORT. 
If no environment variable is set up then the server starts listening on port 3000. 
You can change this parameter in the file [bin/www.js](bin/www.js). 

### 📦 Deploying

We use the [**Express**](https://expressjs.com/) framework for the development of the 
REST server in Node.js. To start the services you can run:

``
npm start
``

The server will start listening for requests and all services will be ready.
It will also set up TensorFlow. 

### 📄 License

This repository is licensed under the [MIT License](LICENSE).

### ♦️ About Mercury

This repository contains the code for a package from the Mercury infrastructure.
If you want to know more about Mercury check out the [Mercury Organization](https://github.com/Mercury-Smartstores).