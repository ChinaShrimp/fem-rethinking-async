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

function getFile(file) {
	// what do we do here?
	let response = null;
	let onCompleted = null;

	// 异步开始执行任务
	fakeAjax(file, text => {
		response = text;

		// 如果在结果返回来之前已经设置回调，则调用回调
		if (onCompleted) onCompleted(text);
	});

	const thunk = cb => {
		onCompleted = cb;

		// 如果在调用时已经有结果，则直接返回结果
		if (response) {
			cb(response);
		}
	}

	return thunk;
}

// request all files at once in "parallel"
// ???
const getFile1 = getFile('file1');
const getFile2 = getFile('file2');
const getFile3 = getFile('file3');

getFile1(res1 => {
	output(res1);

	getFile2(res2 => {
		output(res2);

		getFile3(res3 => {
			output(res3);
		});
	});
});
