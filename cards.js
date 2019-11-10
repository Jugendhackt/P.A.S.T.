const card_names = ["card1","card2","card3","card4","card5","event1","event2","event3"];
const cards = {
	card1: {
		conditions: [],
		text: "Steuererhöhung auf Autos",
		img: "card-cartax.png",
		answers: [
			{
                text: "Steuern erheben und Auto-Import einstellen",
				changes: {
					satisfaction: -10,
					health: +5,
					environment: +10,
					desaster: +1
				},
				next_cards: null
			},
			{
                text: "Steuern belassen",
				changes: {
					satisfaction: +5,
					environment: -10,
					desaster: +1
				},
				next_cards: null
			}
		]
	},
	card2: {
		conditions: [
			{
				category: "money",
				min: 40,
				max: 100
			}
		],
		text: "Forschung für hitzeresistente Nutzpflanzen",
		img: "card-heatresistence.png",
		answers: [
			{
                text: "Investieren",
				changes: {
					satisfaction: +5,
					money: -10,
					environment: +5,
					health: +5,
					desaster: +1
				},
				next_cards: null
			},
			{
                text: "Stattdessen sparen",
				changes: {
					health: -10,
					environment: -5,
					money: +10,
					desaster: +1
				},
				next_cards: null
			}
		]
	},
	card3: {
		conditions: [],
		text: "Kohle- und Ölbetrieb schwächen",
		img: "card-bohrer.png",
		answers: [
			{
                text: "Bohrlizenzen entziehen",
				changes: {
					satisfaction: -5,
					money: -5,
					environment: +10,
					desaster: +1
				},
				next_cards: null
			},
			{
                text: "Budget erhöhen",
				changes: {
					satisfaction: +5,
					environment: -10,
					money: +10,
					health: -5,
					desaster: +1
				},
				next_cards: null
			}
		]
	},
	card4: {
		conditions: [
			{
				category: "health",
				min: 0,
				max: 70
			}
		],
		text: "Obdachlosenhilfe",
		img: "card-obdachlosenhilfe.png",
		answers: [
			{
                text: "Wohnungen bauen",
				changes: {
					satisfaction: +5,
					money: -5,
					health: +5,
					environment: -5,
					desaster: +1
				},
				next_cards: null
			},
			{
                text: "Abschiebungen",
				changes: {
					money: +5,
					satisfaction: -10,
					health: +5,
					desaster: +1
				},
				next_cards: null
			}
		]
	},
 	card5: {
		conditions: [
			{
				category: "desaster",
				min: 5,
				max: 100
			}
		],
		text: "Dammbau",
		img: "card-damm.png",
		answers: [
			{
                text: "Hochwasser-Prävention",
				changes: {
					satisfaction: +5,
					money: -10,
					environment: +5,
					desaster: -7
				},
				next_cards: null
			},
			{
                text: "Geld sparen",
				changes: {
					health: -10,
					money: +10,
					environment: +5,
					desaster: +1
				},
				next_cards: null
			}
		]
	},
	event1: {
		conditions: [
			{
				category: "desaster",
				min: 10,
				max: 100
			}
		],
		text: "HOCHWASSER!",
		img: "card-flut.png",
		answers: [
			{
                text: "THIS LIL SECRET NOONE SEES",
				changes: {
					satisfaction: -5,
					money: -5,
					health: -5,
					environment: -5,
					desaster: -7
				},
				next_cards: null
			}
		]
	},
	event2: {
		conditions: [
			{
				category: "desaster",
				min: 17,
				max: 100
			}
		],
		text: "HOCHWASSER!",
		img: "card-flut.png",
		answers: [
			{
                text: "THIS LIL SECRET NOONE SEES",
				changes: {
					satisfaction: -5,
					money: -5,
					health: -5,
					environment: -5,
					desaster: -7
				},
				next_cards: null
			}
		]
	},
	event3: {
		conditions: [
			{
				category: "desaster",
				min: 24,
				max: 100
			}
		],
		text: "HOCHWASSER!",
		img: "card-flut.png",
		answers: [
			{
                text: "THIS LIL SECRET NOONE SEES",
				changes: {
					satisfaction: -5,
					money: -5,
					health: -5,
					environment: -5,
					desaster: -7
				},
				next_cards: null
			}
		]
	},
};
