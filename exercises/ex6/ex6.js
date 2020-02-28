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
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ['file1', 'file2', 'file3']
// 	.map(getFile)
// 	.reduce((acc, curr) => acc.seq(curr).val(output), ASQ())
// 	.val(() => output("Complete!"));

// seq()可以接受多个函数，创建seq array
ASQ()
	.seq(
		...['file1', 'file2', 'file3']
			.map(getFile)
			.map(sq => () => sq.val(output))
	)
	.val(() => output("Complete!"));
