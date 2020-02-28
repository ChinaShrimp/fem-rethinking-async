$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list");

	let clickCh = ASQ.csp.chan();
	let clickedEvent = null;

	$btn.click(evt => {
		if (!clickedEvent) {
			clickedEvent = ASQ.csp.putAsync(clickCh, evt);
			clickedEvent.then(() => {
				clickedEvent = null;
			});
		}	
	});

	// Hint: ASQ().runner( .. )

	// TODO: setup sampling go-routine and
	// channel, populate $list
	ASQ().runner(
		ASQ.csp.go(function* (ch) {
			while (true) {
				yield ASQ.csp.take(ASQ.csp.timeout(500));

				yield ASQ.csp.take(clickCh);
	
				yield ASQ.csp.put(ch, "Clicked");
			}
		}),
		ASQ.csp.go(function* (ch) {
			while (true) {
				let msg = yield ASQ.csp.take(ch);

				$list.append($(`<div>${msg}</div>`));
			}
		}),
	);
});
