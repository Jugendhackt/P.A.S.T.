card_names = ["card1", "card2"];
cards = {
	card1: {
		conditions: [
		],
		text: "abcdef",
		img: "card.png",
		answers: [
			{
                text: "abc",
				changes: {
					money: 0,
					satisfaction: 5,
					health: -20,
					environment: 10
				},
				next_cards: [
					{
						name: "card2",
						probability: 100
					}
				]
			},
			{
                text: "def",
				changes: {
					money: 10,
					satisfaction: 0,
					health: -20,
					environment: 15
				},
				next_cards: null
			}
		]
	},
	card2: {
		conditions: [
			{
				category: "money",
				min: 20,
				max: 100
			}
		],
		text: "abcdef2",
		img: "card.png",
		answers: [
			{
                text: "abc2",
				changes: {
					money: 0,
					satisfaction: 5,
					health: -20,
					environment: 10
				},
				next_cards: [
					{
						name: "card1",
						probability: 100
					}
				]
			},
			{
                text: "def2",
				changes: {
					money: 10,
					satisfaction: 0,
					health: -20,
					environment: 15
				},
				next_cards: null
			}
		]
	}
};
