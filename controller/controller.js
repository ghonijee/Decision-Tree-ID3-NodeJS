const db         = require('../config/database');
const id3 = require('../app/id3');

// kontroller masing-masing route
exports.index = (req, res) => {
	let sample = req.body;
	console.log(sample)
  var data = [
    { "outlook": "sunny", "temperature": "hot", "humidity": "high", "windy": false, "play": false },
    { "outlook": "sunny", "temperature": "hot", "humidity": "high", "windy": true, "play": false },
    { "outlook": "cloudy", "temperature": "hot", "humidity": "high", "windy": false, "play": true },
    { "outlook": "rainy", "temperature": "mild", "humidity": "high", "windy": false, "play": true },
    { "outlook": "rainy", "temperature": "cool", "humidity": "normal", "windy": false, "play": true },
    { "outlook": "rainy", "temperature": "cool", "humidity": "normal", "windy": true, "play": true },
    { "outlook": "cloudy", "temperature": "cool", "humidity": "normal", "windy": true, "play": true },
    { "outlook": "sunny", "temperature": "mild", "humidity": "high", "windy": false, "play": false },
    { "outlook": "sunny", "temperature": "cool", "humidity": "normal", "windy": false, "play": true },
    { "outlook": "rainy", "temperature": "mild", "humidity": "normal", "windy": false, "play": true },
    { "outlook": "sunny", "temperature": "mild", "humidity": "normal", "windy": true, "play": true },
    { "outlook": "cloudy", "temperature": "mild", "humidity": "high", "windy": true, "play": true },
    { "outlook": "cloudy", "temperature": "hot", "humidity": "normal", "windy": false, "play": true },
    { "outlook": "rainy", "temperature": "mild", "humidity": "high", "windy": true, "play": false }
  ];
  var target = "play";
	var features = ['outlook', 'temperature', 'humidity', "windy"];
	var test = {
		'outlook': 'rainy',
		'temperature': 'hot',
		'humidity': 'high',
		'windy': true
	};
	
	const Decision = new id3(data, target, features);
	const result = Decision.testData(test);
	res.json(result);
}
