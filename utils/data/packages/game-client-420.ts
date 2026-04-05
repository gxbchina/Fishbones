import path from 'node:path'
import { downloads } from '../fs'
import embedded from '../embedded/embedded'
import { gdrive, magnet } from './shared'
import { tr } from '../../translation'
import { withProperty } from '../../config'
import { GC_LOCATION_AUTO, GCPkgCommon } from './game-client'
import { HARDCODED_HTTP_SERVER_URL } from '../../constants-build'

export const GC_420_LOCATION = 'game-client-420-location'
const config = withProperty(GC_420_LOCATION, GC_LOCATION_AUTO, location => gc420Pkg.setDirLocation(location))

export const gc420Pkg = new class extends GCPkgCommon {

    name = tr('Game Client')
    dirName = 'playable_client_420'
    makeDir = false
    zipExt = '7z'
    zipHasSingleRootEntry = true
    zipRoot = [ 'League of Legends_UNPACKED', 'League-of-Legends-4-20', 'RADS', 'solutions', 'lol_game_client_sln', 'releases', '0.0.1.68', 'deploy' ]
    zipName = `${this.zipRoot[0]!}.${this.zipExt}`
    zipInfoHashV1 = '4bb197635194f4242d9f937f0f9225851786a0a8'
    zipInfoHashV2 = ''
    zipSize = 2171262108
    size = 5991712821
    
    release = '0.0.1.68'
    preferC = false
    dir = ''

    zip = path.join(downloads, this.zipName)
    zipTorrentEmbedded = embedded.gc420ZipTorrent
    zipTorrentName = `${this.zipName}.torrent`
    zipTorrent = `${this.zip}.torrent`
    zipMagnet = magnet(this.zipInfoHashV1, this.zipInfoHashV2, this.zipName, this.zipSize)
    zipMega = 'https://mega.nz/file/Hr5XEAqT#veo2lfRWK7RrLUdFBBqRdUvxwr_gd8UyUL0f6b4pHJ0'
    zipWebSeeds = [
        gdrive(`17MxGQEgO0y7OUgRU5AXb1Mr2WF0emDVI`),
        `${HARDCODED_HTTP_SERVER_URL}/${this.zipName}`,
    ]

    exeName = 'League of Legends.exe'
    exeDir = ''
    exe = ''

    topLevelEntries = [
        'LEVELS',
        'DATA',
        'util.dll',
        'tbb.dll',
        'riotlauncher.dll',
        'msvcr120.dll',
        'msvcp120.dll',
        'LogitechLed.dll',
        'LogitechGkey.dll',
        'League of Legends.exe',
        'launcher.maestro.dll',
        'dbghelp.dll',
        'cgGL.dll',
        'cgD3D9.dll',
        'cg.dll',
        'bugsplatrc.dll',
        'bugsplat.dll',
        'BsSndRpt.exe',
        'atimgpud.dll',
    ]
    topLevelEntriesOptional = [
        'Logs',
        'Localization_Errors.txt',
        '2018-07-08_01-48-41_League of Legends.log',
        '-000000000000001_crash.json',
        'Launch.bat',
        'oldFiles.json',
        'files.json',
        'run.bat',
    ]

    constructor(){
        super()
        this.setDirLocation(GC_LOCATION_AUTO)
    }
}()
