'use strict';

let leviUrl = 'https://time-radish.glitch.me/posts'
let herokuUrl = 'http://secure-reddit.herokuapp.com/simple/posts';

function requestPosts(method, url, callback) {
	let request = new XMLHttpRequest();
	request.open(method, url);
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) {
			let posts = JSON.parse(request.response).posts;
			callback(posts, createTags);
		};
	};
	request.send();
};

function separatePosts(posts, callback) {
	for (let i = posts.length - 1; i > -1; i--) {
		callback(posts[i]);
	}
};

requestPosts('GET', leviUrl, separatePosts);

function createTags(post) {
	let newPost = document.createElement('div');
	let vote = document.createElement('div');
	let voteUp = document.createElement('a');
	let upImage = document.createElement('img');
	let score = document.createElement('p');
	let voteDown = document.createElement('a');
	let downImage = document.createElement('img');
	let section = document.createElement('section');

	newPost.className = 'post ' + post.id;
	vote.className = 'vote';
	voteUp.className = 'voteup';

	upImage.setAttribute('src', 'upvote.png');
	upImage.setAttribute('class', post.id);
	upImage.setAttribute('name', 'upvote');

	score.textContent = post.score;
	score.setAttribute('class', post.id);

	downImage.setAttribute('src', 'downvote.png');
	downImage.setAttribute('class', post.id);
	downImage.setAttribute('name', 'downvote');

	document.querySelector('main').appendChild(newPost);
	newPost.appendChild(vote);
	vote.appendChild(voteUp);
	voteUp.appendChild(upImage);
	vote.appendChild(score);
	vote.appendChild(voteDown);
	voteDown.appendChild(downImage);

	let sectionPost = document.createElement('section');
	let aTag1 = document.createElement('a');
	aTag1.setAttribute('href', post.url);
	aTag1.className = 'title';
	aTag1.textContent = post.title;
	let submitTime = document.createElement('p');
	submitTime.textContent = 'submitted ' +
		parseInt((Date.now()/1000/60/60/24) - (post.timestamp/1000/60/60/24)) + ' days ago by';
	
	let aTag2 = document.createElement('a');
	aTag2.setAttribute('href', '');
	aTag2.textContent = 'username';

	let aTag3 = document.createElement('a');
	aTag3.setAttribute('href', '');
	aTag3.textContent = 'xx comments';

	let aTag4 = document.createElement('a');
	aTag4.textContent = 'Modify';

	let aTag5 = document.createElement('a');
	aTag5.className = post.id;
	aTag5.textContent = 'Remove';

	newPost.appendChild(sectionPost);
	sectionPost.appendChild(aTag1);
	sectionPost.appendChild(submitTime);
	sectionPost.appendChild(aTag2);
	sectionPost.appendChild(aTag3);
	sectionPost.appendChild(aTag4);
	sectionPost.appendChild(aTag5);
}


document.querySelector('main').addEventListener('click', userActions)

function userActions(event) {
	if (event.target.localName === 'img' && event.target.name === 'upvote') {
		voteIncrement(event.target);
	} else if (event.target.localName === 'img' && event.target.name === 'downvote') {
		voteDecrement(event.target);
	} else if (event.target.innerText === 'Remove') {
		deletePost(event.target);
	};
};

function voteIncrement(target) {
	let leviUrl = 'https://time-radish.glitch.me/posts/'
	let request = new XMLHttpRequest();
	request.open('PUT', leviUrl + target.className + '/upvote');
	request.setRequestHeader('Accept', 'application/json');
	let body = JSON.stringify({
		"id": target.className,
		"score": 1
	});
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let scoreTag = document.querySelector('p[class="' + target.className + '"]');
			scoreTag.textContent = JSON.parse(request.response).score;
		};
	};
	request.send(body);
};

function voteDecrement(target) {
	let leviUrl = 'https://time-radish.glitch.me/posts/'
	let request = new XMLHttpRequest();
	request.open('PUT', leviUrl + target.className + '/downvote');
	request.setRequestHeader('Accept', 'application/json');
	let body = JSON.stringify({
		"id": target.className,
		"score": 1
	});
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let scoreTag = document.querySelector('p[class="' + target.className + '"]');
			scoreTag.textContent = JSON.parse(request.response).score;
		};
	};
	request.send(body);
};

function deletePost(target) {
	let leviUrl = 'https://time-radish.glitch.me/posts/'
	let request = new XMLHttpRequest();
	request.open('DELETE', leviUrl + target.className);
	request.setRequestHeader('Accept', 'application/json');
	let body = JSON.stringify({
		"id": target.className
	});
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let deleteTag = document.querySelector('div[class="post ' + target.className + '"]');
			deleteTag.setAttribute('style', 'animation-name: collapse; animation-duration: 1s')
			function removeOneTag() {
				deleteTag.remove();
			}
			setTimeout(removeOneTag, 1000);
		};
	};
	request.send(body);
};

