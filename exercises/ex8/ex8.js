$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list");

	let clickStream = ASQ.react.of();
	
	// let timerStream = ASQ.react.of();

	// setInterval(() => {
	// 	timerStream.push("time out");
	// }, 500);

	$btn.click(function(evt){
		// TODO
		clickStream.push(evt);
	});

	// TODO: setup sampled sequence, populate $list
	
	// ASQ.react.all(clickStream, timerStream)
	// 	.val(() => {
	// 		$list.append("clicked");
	// 	})
	const throttle= (sq) => {
		let events = [];

		let throttledSq = ASQ.react.of();

		sq.val(evt => events.push(evt));

		setInterval(() => {
			if (events.length > 0) {
				events = [];
				throttledSq.push("clicked");
			}
		}, 500);

		return throttledSq;
	}

	throttle(clickStream)
		.val((evt) => {
			$list.append(`<div>${evt}</div>`)
		});
});
