/*setTimeout(function() {
	location.reload()
}, 5000);*/
const LEFT = 0;
const RIGHT = 1;
const categoryNames = ["money", "satisfaction", "health", "environment", "desaster"];	// all existing categories (hidden & important)
const importantCategories = ["money", "satisfaction", "health", "environment"];			// all important categories (get shown and checked for lose)
categories = {
	money: 50,
	satisfaction: 50,
	health: 50,
	environment: 50,
	desaster: 0
};																						// object for all categories + init values 

activeCard = {};																		// currently selected card
round = 0;																				// number of rounds already played
setTimeout(function() {																	// init-function
	leftText = document.getElementById('left_text');									// 4 x get HTML-element ref
	rightText = document.getElementById('right_text');
	cardText = document.getElementById('card_text');
	cardImg = document.getElementById('card_img');
	setActiveCard("card1");																// set first selected card
	checkWinLose();																		// init displayed categories
}, 100);

function leftBtnClick() {																// called if left option is clicked
	btnClick(LEFT);
}

function rightBtnClick() { 																// called if right option is clicked
	if (activeCard.answers[RIGHT] !== undefined) {										// if only one answer action is defined use it for both
		btnClick(RIGHT);
	} else {
		btnClick(LEFT);
	}
}

function btnClick(site) {																// called if one of the two options is clicked
	const answer = activeCard.answers[site];	
	for (var i = 0; i < categoryNames.length; i++) {									// apply changes to all categories
		const categoryName = categoryNames[i];
		if (answer.changes[categoryName] !== undefined) {								// check if there is a change for this category
			categories[categoryName] += answer.changes[categoryName];
		}
		if (categories[categoryName] > 100) {											// limit to max value of 100
			categories[categoryName] = 100;
		}
	}
	if (!!answer.next_cards) {															// check if there are next cards defined
		var probabilitySum = 0;
		for (var i = 0; i < answer.next_cards.length; i++) {							// calculate sum of set "probability points"
			probabilitySum += answer.next_cards[i].probability;
		}
		var rand = Math.round(Math.random() * probabilitySum);							// see note 1 (EOF)
		var cardIndex = 0;
		while (answer.next_cards[cardIndex].probability < rand) {
			rand -= answer.next_cards[cardIndex].probability;
			cardIndex++;
		}
		setActiveCard(answer.next_cards[cardIndex].name);
	} else {																			// randomly select one card
		var possibleCards = [];
		for (var i = 0; i < card_names.length; i++) {									// check all cards, if there conditions are meet
			if (checkConditions(cards[card_names[i]].conditions)) {
				console.log(card_names[i]);
				possibleCards.push(card_names[i]);
			}
		}
		if (!possibleCards.length) {													// check for no possible cards
			alert("X_X");
		}
		setActiveCard(
			possibleCards[Math.round(Math.random() * (possibleCards.length - 1))]		// select one of the possible cards
		);	
	}
	checkWinLose();
	round++;
}

function setActiveCard(name) {															// updates the page to show the new card
	console.log(name);
	cardText.innerText = activeCard.text;												// update text
	cardImg.src = activeCard.img;														// update image
	if (activeCard.answers[RIGHT] !== undefined) {										// check if 2 answers exist
		leftText.innerText = activeCard.answers[LEFT].text;								// update text
		rightText.innerText = activeCard.answers[RIGHT].text;							// update text
	} else {																			// set empty answers
		leftText.innerText = "";
		rightText.innerText = "";
	}
}

function checkConditions(conditions) {													// check conditions of one card to determine if it can be selected next
	if (!conditions) {																	// no defined conditions means that this card can't be selected by random
		return false;
	}
	for (var i = 0; i < conditions.length; i++) {										// check all conditions
		const condition = conditions[i];
		if (categories[condition.category] < condition.min ||							// test if category x is in the defined range
			categories[condition.category] > condition.max) {
			return false;
		}
	}
	return true;
}

function checkWinLose() {
	for (var i = 0; i < importantCategories.length; i++) {								// check all important categories
		const categoryValue = categories[importantCategories[i]];
		if (categoryValue <= 0) {														// if one important category is smaller or equal to 0 the player lost
			alert("You killed the earth! D:");
		}
		document.getElementById("category_" + importantCategories[i])					// update background-color of category-indicator
			.style.backgroundColor =
				"rgb(" +
				(224 - categoryValue * 1.92) +
				"," +
				(32 + categoryValue * 1.92) +
				", 32)";
		if (round == 50) {																// end game after 50 rounds
			alert("The end");
		}
	}
}


/**************************************************************************************
* 1. the order of the entries in next_cards is static. this can be used to calculate  *
*    the randomly selected card easily. For this the number of "probability points"   *
*    is compared to the random value and is subtracted from the random value if the   *
*    random number is bigger else the current entry is selected. You can think of it  *
*    as windows on a number scale from 0 to the sum of points. If you substract the   *
*    number of points from  the first window you get the start of the second window.  *
*    This way you can find the "window" and with that the entry that got selected by  *
*    random.                                                                          *
*    0       2                       8     rand                            SUM(17)    *
*    +-------+-----------------------+------|------------------------------------+    *
*    |option1|       option2         |                  option3                  |    *
*    +-------+-----------------------+-------------------------------------------+    *
*                                                                                     *
**************************************************************************************/
