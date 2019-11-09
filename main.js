setTimeout(function() {
	location.reload()
}, 5000);

activeCard = {};
setTimeout(function() {
	leftText = document.getElementById('left_text');
	rightText = document.getElementById('right_text');
	cardText = document.getElementById('card_text');
	cardImg = document.getElementById('card_img');
	setActiveCard("card1");
}, 100);

function leftBtnClick() {
	console.log(1);
}

function rightBtnClick() {
	console.log(2);
}

function setActiveCard(name) {
	activeCard = cards[name];
	showCard();
	if (activeCard.answers[1] !== undefined) {
		leftText.innerText = activeCard.answers[0].text;
		rightText.innerText = activeCard.answers[1].text;
	} else {
		leftText.innerText = "";
		rightText.innerText = "";
	}
}

function showCard() {
	cardText.innerText = activeCard.text;
	cardImg.src = activeCard.img;
}

