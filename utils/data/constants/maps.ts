import { PickableValue } from "./values/pickable"
import { enabled } from "./values/enabled"
import { tr } from "../../translation"

export const maps = [
    { i: 0, id: 0, short: 'Map0', name: tr(`Test`) },
    { i: 1, id: 1, short: 'Map1', name: tr(`Old Summoner's Rift`) },
    { i: 2, id: 2, short: 'Map2', name: tr(`Old Summoner's Rift Autumn`) },
    { i: 3, id: 3, short: 'Map3', name: tr(`Proving Grounds`) },
    { i: 4, id: 4, short: 'Map4', name: tr(`Twisted Treeline`) },
    { i: 5, id: 5, short: 'Map5', name: tr(`Unknown (5)`) },
    { i: 6, id: 6, short: 'Map6', name: tr(`Summoner's Rift Winter (2011)`) },
    { i: 7, id: 7, short: 'Map7', name: tr(`Summoner's Rift Winter (2009)`) },
    { i: 8, id: 8, short: 'Map8', name: tr(`Crystal Scar`) },
    { i: 9, id: 9, short: 'Map9', name: tr(`Dominion Test`) },
    { i: 10, id: 10, short: 'Map10', name: tr(`New Twisted Treeline`) },
    { i: 11, id: 11, short: 'Map11', name: tr(`New Summoner's Rift`) },
    { i: 12, id: 12, short: 'Map12', name: tr(`Howling Abyss`) },
    { i: 13, id: 13, short: 'Map13', name: tr(`Magma Chamber`) },
    { i: 14, id: 14, short: 'Map14', name: tr(`Butcher's Bridge`) },
    { i: 15, id: 15, short: 'Map15', name: tr(`Unknown (15)`) },
    { i: 16, id: 16, short: 'Map16', name: tr(`Cosmic Ruins`) },
    { i: 17, id: 17, short: 'Map17', name: tr(`Unknown (17)`) },
    { i: 18, id: 18, short: 'Map18', name: tr(`Valoran City Park`) },
    { i: 19, id: 19, short: 'Map19', name: tr(`Substructure 43`) },
    { i: 20, id: 20, short: 'Map20', name: tr(`Crash Site`) },
    { i: 21, id: 21, short: 'Map21', name: tr(`Temple of Lily and Lotus`) },
    //{ i: 22, id: 22, short: 'Map22', name: tr(`Magma Chamber (recreated in Minecraft)`) },
    //{ i: 30, id: 30, short: 'Map30', name: tr(`Arena: Rings of Wrath`) },
    { i: 30, id: 30, short: 'Map30', name: tr(`New Proving Grounds`) },
    { i: 35, id: 35, short: 'Map35', name: tr(`The Bandlewood`) },
]

export class GameMap extends PickableValue {
    public static readonly name = 'Game Map'
    public static values = maps.map(({ name }) => name)
    public static choices = maps.map(({ i, short, name }) => ({ value: i, short, name }))
}
export const GameMapsEnabled = enabled(GameMap)
