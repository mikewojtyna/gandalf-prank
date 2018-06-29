// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
	var newURL = "https://www.youtube.com/watch?v=G1IbRujko-A";
	chrome.tabs.create({url: newURL});

	function connect() {
		var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
		var stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {

			console.log('Connected: ' + frame);

			stompClient.subscribe('/topic/greetings', function (greeting) {
				console.log("Got message: " + greeting);

				chrome.tabs.query({active: true, currentWindow: true},
					function (tabs) {
						chrome.tabs.sendMessage(tabs[0].id,
							{greeting: JSON.parse(greeting.body).content},
							function (response) {
								console.log(response.farewell);
							});
					});

			});


			/*			stompClient.subscribe('http://localhost:8080/topic/greetings',
			 function (greeting) {

			 console.log("Got message: " + greeting);

			 chrome.tabs.query({active: true, currentWindow: true},
			 function (tabs) {
			 chrome.tabs.sendMessage(tabs[0].id,
			 {greeting: JSON.parse(greeting.body).content},
			 function (response) {
			 console.log(response.farewell);
			 });
			 });

			 });*/
		});
	};
	connect();

	chrome.storage.sync.set({color: '#3aa757'}, function () {
		console.log('The color is green.');
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'developer.chrome.com'},
			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
