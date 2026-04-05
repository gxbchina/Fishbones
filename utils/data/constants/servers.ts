export type ServerVersion = number & { readonly brand: unique symbol }
export const KnownServers = {
    Unknown: 0 as ServerVersion,
    BrokenWings: 1 as ServerVersion,
    ChronoBreak: 2 as ServerVersion,
    Default: 1 as ServerVersion,
}
type ServerInfo = {
    id: number
    name: string
    pkg: ServerPkgInfo
}
type ServerPkgInfo = {
    infoDir: string
    dllDir: string
    dll: string
}
export const servers: Array<ServerInfo> & Record<ServerVersion, ServerInfo> = []
