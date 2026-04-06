import { PickableValue } from "./values/pickable"
import { enabled } from "./values/enabled"
import { tr } from "../../translation"

export interface ModeInfo {
    i: number
    short: string
    name: string
}
export const modes = [
    { i: 0, short: 'CLASSIC', name: tr('Classic') },
    { i: 1, short: 'ARAM', name: tr('ARAM') },
    { i: 2, short: 'ODIN', name: tr('ODIN') },
    { i: 3, short: 'TUTORIAL', name: tr('Tutorial') },
]
export class GameMode extends PickableValue {
    public static readonly name = tr('Game Mode')
    public static readonly values = modes.map(({ short }) => short)
    public static readonly choices = modes.map(({ i, short, name }) => ({ value: i, short, name }))
}
export const GameModesEnabled = enabled(GameMode)
