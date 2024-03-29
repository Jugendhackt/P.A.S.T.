/*setTimeout(function() {
	location.reload()
}, 5000);*/

let cardNames = [];

const LEFT = 0;
const RIGHT = 1;
const importantCategories = ["money", "satisfaction", "health", "environment"];			// all important categories (get shown and checked for lose)
const hiddenCategories = ["desaster"];
const categoryNames = [].concat(importantCategories).concat(hiddenCategories);			// all existing categories (hidden & important)
const categories = {
	money: 50,
	satisfaction: 50,
	health: 50,
	environment: 50,
	desaster: 0
};																						// object for all categories + init values 
let activeCard = {};																	// currently selected card
let round = 0;																			// number of rounds already played

let leftText;
let rightText;
let cardText;
let cardImg;

setTimeout(function() {																	// init-function
	leftText = document.getElementById('left_text');									// 4 x get HTML-element ref
	rightText = document.getElementById('right_text');
	cardText = document.getElementById('card_text');
	cardImg = document.getElementById('card_img');
	cardNames = Object.keys(cards);
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
	for (let i = 0; i < categoryNames.length; i++) {									// apply changes to all categories
		const categoryName = categoryNames[i];
		if (answer.changes[categoryName] !== undefined) {								// check if there is a change for this category
			categories[categoryName] += answer.changes[categoryName];
		}
		if (categories[categoryName] > 100) {											// limit to max value of 100
			categories[categoryName] = 100;
		}
	}
	if (!!answer.next_cards) {															// check if there are next cards defined
		let probabilitySum = 0;
		for (let i = 0; i < answer.next_cards.length; i++) {							// calculate sum of set "probability points"
			probabilitySum += calculateProbability(answer.next_cards[i].probability);
		}
		let rand = Math.round(Math.random() * probabilitySum);							// see note 1 (EOF)
		let cardIndex = 0;
		while (calculateProbability(answer.next_cards[cardIndex].probability) < rand) {
			rand -= calculateProbability(answer.next_cards[cardIndex].probability);
			cardIndex++;
		}
		setActiveCard(answer.next_cards[cardIndex].name);
	} else {																			// randomly select one card
		let possibleCards = [];
		let probabilitySum = 0;
		for (let i = 0; i < cardNames.length; i++) {									// check all cards, if there conditions are meet
			if (checkConditions(cards[cardNames[i]].conditions)) {
				possibleCards.push(cardNames[i]);
				probabilitySum += calculateProbability(cards[cardNames[i]].probability);
			}
		}
		if (!possibleCards.length) {													// check for no possible cards
			alert("X_X");
		}
		let rand = Math.round(Math.random() * probabilitySum);							// note 1; won't work as good here
		let cardIndex = 0;
		while (calculateProbability(cards[possibleCards[cardIndex]].probability) < rand) {
			rand -= calculateProbability(cards[possibleCards[cardIndex]].probability);
			cardIndex++;
		}
		setActiveCard(possibleCards[cardIndex]);										// select one of the possible cards
	}
	checkWinLose();
	round++;
}

function setActiveCard(name) {															// updates the page to show the new card
   	activeCard = cards[name];
	cardText.innerText = activeCard.text;												// update text
	cardImg.src = activeCard.img;														// update image
	if (activeCard.answers[RIGHT] !== undefined) {										// check if 2 answers exist if not then this is a event
		leftText.innerText = activeCard.answers[LEFT].text;								// update text
		rightText.innerText = activeCard.answers[RIGHT].text;							// update text
	} else {																			// set empty answers for event
		leftText.innerText = "";
		rightText.innerText = "";
	}
}

function checkConditions(conditions) {													// check conditions of one card to determine if it can be selected next
	if (!conditions) {																	// no defined conditions means that this card can't be selected by random
		return false;
	}
	for (let i = 0; i < conditions.length; i++) {										// check all conditions
		const condition = conditions[i];
		if (categories[condition.category] < condition.min ||							// test if category x is in the defined range
			categories[condition.category] > condition.max) {
			return false;
		}
	}
	return true;
}

function checkWinLose() {
	for (let i = 0; i < importantCategories.length; i++) {								// check all important categories
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

function calculateProbability(term) {													// calculates the probability
	if (typeof term === "number") {
		return term;
	}
	for (let i = 0; i < categoryNames.length; i++) {									// replaces every category name with it's current value
		if (typeof categories[categoryNames[i]] === "number") {
			term = term.replace(
				new RegExp(categoryNames[i], "g"),
				categories[categoryNames[i]] >= 0 ? categories[categoryNames[i]] : 0
			);
		}
	}
	/*DON'T DO THIS!!!!*/return Math.floor(eval(term));									// calculates the value of the term (VERY DANGEROUS!!!!!!!!!!!!)
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
