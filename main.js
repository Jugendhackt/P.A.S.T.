/*setTimeout(function() {
	location.reload()
}, 5000);*/
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
	if (!!answer.next_cards) {
		var probabilitySum = 0;
		for (var i = 0; i < answer.next_cards.length; i++) {
			probabilitySum += answer.next_cards[i].probability;
		}
		var rand = Math.round(Math.random() * probabilitySum);
		var cardIndex = 0;
		while (answer.next_cards[cardIndex].probability < rand) {
			rand -= answer.next_cards[cardIndex].probability;
			cardIndex++;
		}
		setActiveCard(answer.next_cards[cardIndex].name);
	} else {
		var possibleCards = [];
		for (var i = 0; i < card_names.length; i++) {
			if (checkConditions(cards[card_names[i]].conditions)) {
				console.log(cardIndex);
				possibleCards.push(cards[card_names[i]]);
			}
		}
		if (!possibleCards.length) {
			alert("X_X");
		}
		setActiveCard(possibleCards[Math.round(Math.random() * (possibleCards.length - 1))]);
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
	if (!conditions) {
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
