import { versionFromString } from "../../constants-build"

export type ClientVersion = number & { readonly brand: unique symbol }
export const KnownClients = {
    Unknown: 0 as ClientVersion,
    v126: versionFromString('1.0.0.126') as ClientVersion,
    v420: versionFromString('4.20.0.315') as ClientVersion,
    Default: 1 as ClientVersion,
}
type ClientInfo = {
    id: number
    name: string
    pkg: ClientPkgInfo
}
type ClientPkgInfo = {
    exeDir: string
    exe: string
}
export const clients: Array<ClientInfo> & Record<ClientVersion, ClientInfo> = []
