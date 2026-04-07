
import { PickableValue } from "./values/pickable"
import { enabled } from "./values/enabled"
import { tr } from "../../translation"

export const spells = [
    { i: 0, short: "SummonerHeal", name: tr("Heal") },
    { i: 1, short: "SummonerGhost", name: tr("Ghost") },
    { i: 2, short: "SummonerBarrier", name: tr("Barrier") },
    { i: 3, short: "SummonerExhaust", name: tr("Exhaust") },
    { i: 4, short: "SummonerMark", name: tr("Mark") },
    { i: 5, short: "SummonerDash", name: tr("Dash") },
    { i: 6, short: "SummonerClarity", name: tr("Clarity") },
    { i: 7, short: "SummonerFlash", name: tr("Flash") },
    { i: 8, short: "SummonerTeleport", name: tr("Teleport") },
    { i: 9, short: "SummonerSmite", name: tr("Smite") },
    { i: 10, short: "SummonerCleanse", name: tr("Cleanse") },
    { i: 11, short: "SummonerIgnite", name: tr("Ignite") },
    { i: 12, short: "SummonerBattleCry", name: tr("BattleCry") },
    { i: 13, short: "SummonerBoost", name: tr("Boost") },
    { i: 14, short: "SummonerClairvoyance", name: tr("Clairvoyance") },
    { i: 15, short: "SummonerDot", name: tr("Dot") },
    { i: 16, short: "SummonerFortify", name: tr("Fortify") },
    { i: 17, short: "SummonerHaste", name: tr("Haste") },
    { i: 18, short: "SummonerMana", name: tr("Mana") },
    { i: 19, short: "SummonerRally", name: tr("Rally") },
    { i: 20, short: "SummonerRevive", name: tr("Revive") },
    { i: 21, short: "SummonerPromote", name: tr("Promote") },
    { i: 22, short: "SummonerOdinPromote", name: tr("OdinPromote") },
    { i: 23, short: "SummonerOdinSabotage", name: tr("OdinSabotage") },
    { i: 24, short: "SummonerOdinGarrison", name: tr("OdinGarrison") },
    { i: 25, short: "SummonerPromoteSR", name: tr("PromoteSR") },
    { i: 26, short: "SummonerObserver", name: tr("Observer") },
    { i: 27, short: "SummonerReviveSpeedBoost", name: tr("ReviveSpeedBoost") },
]

export class SummonerSpell extends PickableValue {
    public static readonly name = tr('Summoner Spell')
    public static readonly values = spells.map(({ short }) => short)
    public static readonly choices = spells.map(({ i, short, name }) => ({ value: i, short, name }))
}
export const SummonerSpellsEnabled = enabled(SummonerSpell)
