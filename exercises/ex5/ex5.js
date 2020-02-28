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
	return ASQ(done => {
		fakeAjax(file, done);
	});
}

// request an array of files at once in "parallel"
// ???
// let sq1 = getFile('file1');
// let sq2 = getFile('file2');
// let sq3 = getFile('file3');

// sq1
// 	.val(output)
// 	.seq(sq2) // asq可以直接返回sequence，而不用() => sq2
// 	.val(output)
// 	.seq(sq3)
// 	.val(output)
// 	.val(() => output("Complete!"));

// sequence可以直接chain，避免复杂的临时变量定义
getFile('file1')
	.val(output)
	.seq(getFile('file2')) // asq可以直接返回sequence，而不用() => sq2
	.val(output)
	.seq(getFile('file3'))
	.val(output)
	.val(() => output("Complete!"));