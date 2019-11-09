const card_names = ["card1", "card2","card3"];
const cards = {
	card1: {
		conditions: null,
		text: "Steuererhöhung auf Autos",
		img: "card-cartax.png",
		answers: [
			{
                text: "Steuern erheben und Auto-Import einstellen",
				changes: {
					satisfaction: -10,
					health: +5,
					environment: +10
				},
				next_cards: [
					{
						name: "card2",
						probability: 100
					}
				]
			},
			{
                text: "Steuern belassen",
				changes: {
					satisfaction: +5,
					environment: -10
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
					health: +5
				},
				next_cards: [
					{
						name: "card3",
						probability: 100
					}
				]
			},
			{
                text: "Stattdessen sparen",
				changes: {
					health: -10,
					environment: -5,
					money: +10
				},
				next_cards: null
			}
		]
	},
	card3: {
		conditions: null,
		text: "Kohle- und Ölbetrieb schwächen",
		img: "card-bohrer",
		answers: [
			{
                text: "Bohrlizenzen entziehen",
				changes: {
					satisfaction: -5,
					money: -5,
					environment: +10
				},
				next_cards: [
					{
						name: "card4",
						probability: 100
					}
				]
			},
			{
                text: "Budget erhöhen",
				changes: {
					environment: -10,
					money: +10,
					health: -5
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
		img: "",
		answers: [
			{
                text: "Wohnungen bauen",
				changes: {
					satisfaction: +5,
					money: -5,
					health: +5,
					environment: -5
				},
				next_cards: [
					{
						name: "card1",
						probability: 100
					}
				]
			},
			{
                text: "Abschiebungen",
				changes: {
					satisfaction: -10,
					health: +5,
				},
				next_cards: null
			}
		]
	}
};
