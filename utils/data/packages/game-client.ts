import path from 'node:path'
import { downloads } from '../fs'
import embedded from '../embedded/embedded'
import { gdrive, magnet, PkgInfoExe } from './shared'
import { HARDCODED_HTTP_SERVER_URL } from '../../constants-build'
import { withProperty } from '../../config'
import { tr } from '../../translation'

const GC_LOCATION = 'game-client-location'
const GC_LOCATION_AUTO = 'auto'
const GC_LOCATION_C_DRIVE = 'C'
const GC_LOCATION_DOWNLOADS = 'Fishbones_Data'
const config = withProperty(GC_LOCATION, GC_LOCATION_AUTO, location => gcPkg.setDirLocation(location))

export const gcPkg = new class extends PkgInfoExe {
    name = tr('Game Client')
    dirName = 'playable_client_126'
    makeDir = false
    zipExt = '7z'
    zipName = `${this.dirName}.${this.zipExt}`
    zipInfoHashV1 = '875201f4a9920ffd7c9bff6c9a2ad59e28f041ae'
    zipInfoHashV2 = '6ccbb2911b07b2c084beb666d22018159845b3eae180b989d75b354af39c8af3'
    zipSize = 898175547
    size = 2472089243

    release = '0.0.0.51' //TODO: Are you sure about that?
    dir = ''
    
    zip = path.join(downloads, this.zipName)
    zipTorrentEmbedded = embedded.gcZipTorrent
    zipTorrentName = `${this.zipName}.torrent`
    zipTorrent = `${this.zip}.torrent`
    zipMagnet = magnet(this.zipInfoHashV1, this.zipInfoHashV2, this.zipName, this.zipSize)
    zipMega = 'https://mega.nz/file/uqRmkCKC#nJFZ2hAYqTq5q-T1PExXPpu0aX4ALjjZj2SZ4q9yCpk'
    zipWebSeeds = [
        gdrive(`1tSoj5PIOWg1Wl7Y-SbjEAEypskvxJ6mx`),
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
        'rads.dll',
        'League of Legends.exe',
        'launcher.maestro.dll',
        'fmodex.dll',
        'fmod_event.dll',
        'dbghelp.dll',
        'client.ver',
        'bugsplatrc.dll',
        'bugsplat.dll',
        'BsSndRpt.exe',
    ]
    topLevelEntriesOptional = [
        'launch_client.bat',
        'd3dx9_39.dll',
    ]

    constructor(){
        super()
        this.setDirLocation(GC_LOCATION_AUTO)
    }

    setDirLocation(location: string){
        
        if(location == GC_LOCATION_AUTO)
            location = process.platform == 'win32' ? GC_LOCATION_C_DRIVE : GC_LOCATION_DOWNLOADS
        
        if(location == GC_LOCATION_C_DRIVE)
            this.dir = path.join('C:', 'Riot Games', 'League of Legends', 'RADS', 'solutions', 'lol_game_client_sln', 'releases', this.release)
        else if(location == GC_LOCATION_DOWNLOADS)
            this.dir = path.join(downloads, this.dirName)
        else
            this.dir = location

        this.exeDir = this.dir
        this.exe = path.join(this.exeDir, this.exeName)

        this.onDirSet?.(this.dir)
    }

    onDirSet?: (gcPkg_dir: string) => void

}()
