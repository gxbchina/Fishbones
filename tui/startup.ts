import type { AbortOptions } from "@libp2p/interface";
import { DeferredView, render, View } from "../ui/remote/view";
import { button, checkbox, form, line, option } from "../ui/remote/types";
import { Args, args } from "../utils/args";
import { gsPkg, REMOTE_IDX } from "../utils/data/packages/game-server";
import { LOCALE_STR, AUTO_LOCALE, DEFAULT_LOCALE, systemLocale, systemLocaleSupported, tr, usedLocale } from "../utils/translation";
import { config } from "../utils/config";
import { GC_LOCATION, GC_LOCATION_AUTO, GC_LOCATION_C_DRIVE, GC_LOCATION_CUSTOM, GC_LOCATION_DOWNLOADS, gcLocationFromIndexToString, gcLocationFromStringToIndex, gcPkg } from "../utils/data/packages/game-client";
import { gc420Pkg, GC_420_LOCATION } from "../utils/data/packages/game-client-420";

enum DownloadSource {
    Torrents_and_Mega = 3,
    Torrents = 2,
    Mega = 1,
    Web = 4,
}

export async function startup(opts: Required<AbortOptions>){

    let view: DeferredView<void>
    view = render('Startup', form({
        EnableInternet: checkbox(args.allowInternet.enabled, (on) => args.allowInternet.enabled = on),
        UpdateLauncher: checkbox(args.upgrade.enabled, (on) => args.upgrade.enabled = on),
        InstallModPack: checkbox(args.installModPack.enabled, (on) => args.installModPack.enabled = on),
        DownloadSource: option(
            [
                { id: DownloadSource.Torrents_and_Mega, text: tr('web + torrents + mega.nz') },
                { id: DownloadSource.Torrents, text: tr('web + torrents') },
                { id: DownloadSource.Mega, text: tr('web + mega.nz') },
                { id: DownloadSource.Web, text: tr('web') },
            ],
            (+args.torrentDownload.enabled << 1) | (+args.megaDownload.enabled),
            (index) => {
                args.torrentDownload.enabled = (index & DownloadSource.Torrents) != 0
                args.megaDownload.enabled = (index & DownloadSource.Mega) != 0
            }
        ),
        UpdateServer: checkbox(args.update.enabled, (on) => args.update.enabled = on),
        ServerOrigin: option(
            gsPkg.remotes.map((origin, id) => ({ id, text: origin.name })),
            config[REMOTE_IDX],
            (index) => {
                //gsPkg.setRemoteByIndex(index)
                config[REMOTE_IDX] = index
                //void saveConfig(config, safeOptions)
            }
        ),
        //EditServerOrigins: button(),
        ForceEnglish: {
            $type: 'checkbox',
            button_pressed: !systemLocaleSupported || usedLocale != systemLocale && usedLocale == DEFAULT_LOCALE,
            disabled: !systemLocaleSupported || systemLocale === DEFAULT_LOCALE,
            $listeners: {
                toggled(on){
                    const locale = on ? DEFAULT_LOCALE : AUTO_LOCALE
                    //setUsedLocale(locale)
                    config[LOCALE_STR] = locale
                    //void saveConfig(config, safeOptions)
                },
            }
        },

        ...clientLocation(() => view, gcPkg, 'installS1Client', 'InstallS1Client', 'S1ClientLocation', 'S1ClientCustomLocation', GC_LOCATION),
        ...clientLocation(() => view, gc420Pkg, 'installS4Client', 'InstallS4Client', 'S4ClientLocation', 'S4ClientCustomLocation', GC_420_LOCATION),
        //InstallS4Server: checkbox(args.installS4Server.enabled, (on) => args.installS4Server.enabled = on),

        Play: button(() => view.resolve()),
        Test: button(() => {
            args.mr.enabled = true
            view.resolve()
        }),
    }), opts)

    return view.promise.then(() => {
        args.installS4Server.enabled ||= args.installS4Client.enabled //HACK:
    })
}

function clientLocation(getView: () => DeferredView<void>, gcPkg: { dir: string }, installS1Client: 'installS1Client' | 'installS4Client', InstallS1Client: string, S1ClientLocation: string, S1ClientCustomLocation: string, GC_LOCATION: string){
    const GC_LOCATION_CUSTOM_IDX = gcLocationFromStringToIndex[GC_LOCATION_CUSTOM]!
    const index = gcLocationFromStringToIndex[config[GC_LOCATION]] ?? GC_LOCATION_CUSTOM_IDX
    const isCustom = index == GC_LOCATION_CUSTOM_IDX
    return {
        [InstallS1Client]: checkbox(args[installS1Client].enabled, (on) => {
            args[installS1Client].enabled = on
        }),
        [S1ClientLocation]: option(
            [
                { id: gcLocationFromStringToIndex[GC_LOCATION_AUTO]!, text: tr('automatic location') },
                { id: gcLocationFromStringToIndex[GC_LOCATION_C_DRIVE]!, text: tr('C drive') },
                { id: gcLocationFromStringToIndex[GC_LOCATION_DOWNLOADS]!, text: tr('Fishbones_Data folder') },
                { id: GC_LOCATION_CUSTOM_IDX, text: tr('custom location') },
            ],
            index,
            (index) => {
                const view = getView()
                const isCustom = index == GC_LOCATION_CUSTOM_IDX
                if(!isCustom) config[GC_LOCATION] = gcLocationFromIndexToString[index]
                view.get(S1ClientCustomLocation).update(line(gcPkg.dir, undefined, isCustom))
            },
        ),
        [S1ClientCustomLocation]: line(gcPkg.dir, (text) => {
            config[GC_LOCATION] = text
        }, isCustom),
    }
}
