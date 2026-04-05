import path from 'node:path'
import { downloads } from '../fs'
import embedded from '../embedded/embedded'
import { gdrive, magnet, PkgInfoCSProj } from './shared'
import { tr } from '../../translation'
import { sdkPkg } from './sdk'
import { HARDCODED_HTTP_SERVER_URL } from '../../constants-build'

export const gs420Pkg = new class extends PkgInfoCSProj {
    name = tr('Game Server')
    dirName = 'GameServer'
    makeDir = false
    zipExt = '7z'
    zipName = `Chronobreak.GameServer.${this.zipExt}`
    zipInfoHashV1 = 'e4043fdc210a896470d662933f7829ccf3ed781b'
    zipInfoHashV2 = 'cf9bfaba0f9653255ff5b19820ea4c01ac8484d0f8407b109ca358236d4f4abc'
    zipSize = 21309506
    size = 0 //TODO:
    
    dir = path.join(downloads, this.dirName)
    zip = path.join(downloads, this.zipName)
    zipTorrentEmbedded = embedded.gs420PkgZipTorrent
    zipTorrentName = `${this.zipName}.torrent`
    zipTorrent = `${this.zip}.torrent`
    zipMagnet = magnet(this.zipInfoHashV1, this.zipInfoHashV2, this.zipName, this.zipSize)
    zipMega = 'https://mega.nz/file/D35i0YaD#P08udvnbUByZHGBvCTbC1XDPkKdUGgp4xtravAlECbU'
    zipWebSeeds = [
        gdrive(`1EU7XYOnsG35-HoVKRpban34HxqHUnbpA`),
        `${HARDCODED_HTTP_SERVER_URL}/${this.zipName}`,
    ]

    projName = 'GameServerConsole'
    csProjDir = path.join(this.dir, this.projName)
    
    target = 'Debug'
    netVer = sdkPkg.target
    csProj = path.join(this.csProjDir, `${this.projName}.csproj`)
    dllDir = path.join(this.csProjDir, 'bin', this.target, this.netVer)
    dllName = `${this.projName}.dll`
    dll = path.join(this.dllDir, this.dllName)
    
    infoDir = path.join(this.dllDir, 'Settings')
    gcDir = path.join(this.dir, 'Content', 'GameClient')

    program = path.join(this.csProjDir, 'Program.cs')
    allCSProjs = [
        'Content/CBProject-Converted/CBProject-Converted.csproj',
        'Content/Chronobreak-Scripts/Chronobreak-Scripts.csproj',
        'GameServerConsole/GameServerConsole.csproj',
        'GameServerCore/GameServerCore.csproj',
        'GameServerLib/GameServerLib.csproj',
        'LENet/DummyServer/DummyServer.csproj',
        'LENet/ENetCS/ENetCS.csproj',
        'LENet/LENet/LENet.csproj',
        'LeaguePackets/LeaguePackets/LeaguePackets.csproj',
        'LeaguePackets/LeaguePacketsSender/LeaguePacketsSender.csproj',
        'LeaguePackets/LeaguePacketsSerializer/LeaguePacketsSerializer.csproj',
        'LeaguePackets/LeaguePacketsTests/LeaguePacketsTests.csproj',
        'QuadTree/QuadTree.csproj',
        'ScriptPackage-Template/ScriptPackage-Template.csproj',
        'ScriptsCore/ScriptsCore.csproj',
    ]

    topLevelEntries = [
        'QuadTree',
        'ScriptsCore',
        'ScriptPackage-Template',
        'GameServerLib',
        'GameServerCore',
        'GameServerConsole',
        'Content',
        'LeaguePackets',
        'LENet',
    ]
    topLevelEntriesOptional = [
        'GameServer.sln',
        'README.md',
        'LICENSE',
        'GameServer.sln.DotSettings',
    ]
}()
