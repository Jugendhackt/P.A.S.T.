setTimeout(function() {
	location.reload()
}, 5000);
const LEFT = 0;
const RIGHT = 1;
const categoryNames = ["money", "satisfaction", "health", "environment"];
categorys = {
	money: 50,
	satisfaction: 50,
	health: 50,
	environment: 50
};

activeCard = {};
setTimeout(function() {
	leftText = document.getElementById('left_text');
	rightText = document.getElementById('right_text');
	cardText = document.getElementById('card_text');
	cardImg = document.getElementById('card_img');
	setActiveCard("card1");
}, 100);

function leftBtnClick() {
	btnClick(LEFT);
}

function rightBtnClick() {
	if (activeCard.answers[RIGHT] !== undefined) {
		btnClick(RIGHT);
	} else {
		btnClick(LEFT);
	}
}

function btnClick(site) {
	const answer = activeCard.answers[site];	
	for (var i = 0; i < categoryNames.length; i++) {
		const categoryName = categoryNames[i];
		if (answer.changes[categoryName] !== undefined) {
			categorys[categoryName] += answer.changes[categoryName];
		}
	}
	if (answer.next_cards !== null) {
		var rand = Math.round(Math.random() * 100);
		var cardIndex = 0;
		while (answer.next_cards[cardIndex].probability < rand) {
			rand -= answer.next_cards[cardIndex].probability;
			cardIndex++;
		}
		setActiveCard(answer.next_cards[cardIndex].name);
	} else {
		var cardIndex;
		do {
			cardIndex = Math.round(Math.random() * (card_names.length - 1))
			console.log(cardIndex);
		} while (!checkConditions(cards[card_names[cardIndex]].conditions));
		setActiveCard(card_names[cardIndex]);
	}
}

function setActiveCard(name) {
	activeCard = cards[name];
	showCard();
	if (activeCard.answers[RIGHT] !== undefined) {
		leftText.innerText = activeCard.answers[LEFT].text;
		rightText.innerText = activeCard.answers[RIGHT].text;
	} else {
		leftText.innerText = "";
		rightText.innerText = "";
	}
}

function showCard() {
	cardText.innerText = activeCard.text;
	cardImg.src = activeCard.img;
}

function checkConditions(conditions) {
	if (conditions === null) {
		return false;
	}
	for (var i = 0; i < conditions.length; i++) {
		const condition = conditions[i];
		if (categorys[condition.category] < condition.min ||
			categorys[condition.category] > condition.max) {
			return false;
		}
	}
	return true;
}
