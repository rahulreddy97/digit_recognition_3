const tf = require('@tensorflow/tfjs-node');

let model;

(async () => {
	model = await tf.loadLayersModel('file://models/CNN_V1/model.json');
	console.log('\nV1(CNN Without Data Augmentation) Model Loaded');
})();

const predict = async (req, res, next) => {
	let predictions;
	// Converting object to array
	const image = Object.values(req.body.data);
	// Resizing the image
	let data = [];
	for (let i = 0; i < image.length; i += 4) {
		data.push(image[i]);
	}

	// Preventing TensorFlow from memory leak
	const pred = await tf.tidy(() => {
		// Convert the canvas pixels to tensor
		let img = tf.tensor(data);
		img = img.reshape([1, 28, 28, 1]);
		img = tf.cast(img, 'float32');

		// Make and format the predications
		const output = model.predict(img);
		// Save predictions on the component
		predictions = Array.from(output.dataSync());
	});

	// Send Response
	res.json(predictions);
	next();
};

module.exports = predict;
