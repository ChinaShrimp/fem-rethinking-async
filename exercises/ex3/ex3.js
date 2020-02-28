function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	return new Promise(resolve => {
		fakeAjax(file, text => {
			resolve(text);
		});
	});
}

// request all files at once in "parallel"
// ???
let promise1 = getFile('file1');
let promise2 = getFile('file2');
let promise3 = getFile('file3');

// promise1
// 	.then(text => {
// 		output(text);

// 		return promise2;
// 	}).then(text => {
// 		output(text);

// 		return promise3;
// 	}).then(text => {
// 		output(text);

// 		output("Complete");
// 	});

promise1.then(output)
	.then(() => promise2)
	.then(output)
	.then(() => promise3)
	.then(output)
	.then(() => output("Complete!"));