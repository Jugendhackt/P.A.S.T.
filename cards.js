const card_names = ["card1", "card2"];
const cards = {
	card1: {
		conditions: null,
		text: "Steuererhöhung auf Autos",
		img: "card-cartax.png",
		answers: [
			{
                text: "Ja",
				changes: {
					satisfaction: -10,
					money: +5,
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
                text: "Nein",
				changes: {
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
					environment: +5
				},
				next_cards: [
					{
						name: "card1",
						probability: 100
					}
				]
			},
			{
                text: "Forscher wegsperren",
				changes: {
					health: -10,
					environment: -5
				},
				next_cards: null
			}
		]
	}
};
