function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url + " " + randomDelay);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

var responses = {};

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		if (!(file in responses)) {
			responses[file] = text;	
		}

		// 确保有序的一种方式，定义一个顺序数组，依次扫描，不满足即退出
		const fileOrder = ['file1', 'file2', 'file3'];

		for (let i = 0; i < fileOrder.length; i++) {
			let filename = fileOrder[i];

			if (!(filename in responses)) return;

			if (typeof (responses[filename]) === "string") {
				output(responses[filename]);
				responses[filename] = false;
			}
		}

		// if (responses['file1']) {
		// 	if (responses['file1'] !== "finished") {
		// 		output(responses['file1']);
		// 		responses['file1'] = "finished";
		// 	}

		// 	if (responses['file2']) {
		// 		if (responses['file2'] !== "finished") {
		// 			output(responses['file2']);
		// 			responses['file2'] = "finished";
		// 		}

		// 		if (responses['file3'] && responses['file3'] !== "finished") {
		// 			output(responses['file3']);
		// 		}
		// 	}
		// }

		// if (responses['file1'] === "finished" &&
		// 	responses['file2'] === "finished" &&
		// 	responses['file3'] === "finished") {
		// 	output("completed");
		// }
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
