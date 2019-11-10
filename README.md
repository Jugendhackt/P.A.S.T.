# P.A.S.T. (postapokalyptisches Spiel des Todes)

## Ziel(goal)
Dieses Spiel soll die Auswegslosigkeit darstellen, in die wir uns als Spezies
Mensch begeben, sollten wir so weiter machen und mit Anlauf über den Point-of-no-return
hinwegschießen. Der Spieler muss dabei als Staatsgewalt für jede Frage zwischen 2
Optionen wählen und dabei versuchen verschiedene Ressourcen auszubalancieren.


This game is meant to represent the hopelessness into which we are drawn as a species if
we continue like this and don't stop before the Point-of-no-return.
The player has to decide as the leader of a country for every question between 2
options and try to balance different resources.


## JSON-interface
``` typescript
interface cards{
	[cardname: string]: {
		probability: number | string,
		conditions?: {
			category: string,
			min: number,
			max: number
		}[],
		text: string,
		img: string,
		answers: {
			text: string,
			changes: {
				[cardname: string]: number
			},
			next_cards?: {
				name: string,
				probability: number
			}[]
		}[]
	}
}
```
