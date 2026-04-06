
import { PickableValue } from "./values/pickable"
import { enabled } from "./values/enabled"
import { tr } from "../../translation"

export const spells = [
    { i: 0, short: "Heal", name: tr("Heal") },
    { i: 1, short: "Ghost", name: tr("Ghost") },
    { i: 2, short: "Barrier", name: tr("Barrier") },
    { i: 3, short: "Exhaust", name: tr("Exhaust") },
    { i: 4, short: "Mark", name: tr("Mark") },
    { i: 5, short: "Dash", name: tr("Dash") },
    { i: 6, short: "Clarity", name: tr("Clarity") },
    { i: 7, short: "Flash", name: tr("Flash") },
    { i: 8, short: "Teleport", name: tr("Teleport") },
    { i: 9, short: "Smite", name: tr("Smite") },
    { i: 10, short: "Cleanse", name: tr("Cleanse") },
    { i: 11, short: "Ignite", name: tr("Ignite") },
    { i: 12, short: "BattleCry", name: tr("BattleCry") },
    { i: 13, short: "Boost", name: tr("Boost") },
    { i: 14, short: "Clairvoyance", name: tr("Clairvoyance") },
    { i: 15, short: "Dot", name: tr("Dot") },
    { i: 16, short: "Fortify", name: tr("Fortify") },
    { i: 17, short: "Haste", name: tr("Haste") },
    { i: 18, short: "Mana", name: tr("Mana") },
    { i: 19, short: "Rally", name: tr("Rally") },
    { i: 20, short: "Revive", name: tr("Revive") },
    { i: 21, short: "Promote", name: tr("Promote") },
    { i: 22, short: "OdinPromote", name: tr("OdinPromote") },
    { i: 23, short: "OdinSabotage", name: tr("OdinSabotage") },
    { i: 24, short: "OdinGarrison", name: tr("OdinGarrison") },
    { i: 25, short: "PromoteSR", name: tr("PromoteSR") },
    { i: 26, short: "Observer", name: tr("Observer") },
    { i: 27, short: "ReviveSpeedBoost", name: tr("ReviveSpeedBoost") },
]

export class SummonerSpell extends PickableValue {
    public static readonly name = tr('Summoner Spell')
    public static readonly values = spells.map(({ short }) => short)
    public static readonly choices = spells.map(({ i, short, name }) => ({ value: i, short, name }))
}
export const SummonerSpellsEnabled = enabled(SummonerSpell)
