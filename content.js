/**
 * Created by goobar on 29.06.18.
 */

"use strict";

setTimeout(function () {
	$(".html5-main-video").click();
	// $(".ytp-size-button").click();
}, 1000);

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
			"from the extension");
		if (request.greeting == "hello") {
			sendResponse({farewell: "goodbye"});
		}

		$(".html5-main-video").click();
	});