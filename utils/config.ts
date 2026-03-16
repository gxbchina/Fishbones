import type { AbortOptions } from '@libp2p/interface'
import { downloads, fs_readFile, fs_writeFile } from './data/fs'
import { safeOptions } from './process/process'
import path from 'node:path'

type Config = Record<string, any>
const defaultConfig: Config = {}
const config: Config = {}

const callbacks: Record<string, (value: any) => void> = {}

export { configProxy as config }
const configProxy = new Proxy(config, {
    get(target, key: string){
        return config[key] ?? defaultConfig[key]
    },
    set(target, key: string, value){
        config[key] = value
        callbacks[key]?.(value)
        saveConfig(config, safeOptions)
        return true
    }
})

export function withProperty<K extends string, V>(key: K, defaultValue: V, cb: (value: V) => void = () => {}): Record<K, V> {
    defaultConfig[key] = defaultValue
    callbacks[key] = cb
    return configProxy as Record<K, V>
}

export async function loadConfig(opts: Required<AbortOptions>){
    const configJSON = await fs_readFile(configFile, { ...opts, encoding: 'utf8' })
    if(configJSON){
        Object.assign(config, JSON.parse(configJSON))
    } else {
        await saveConfig(defaultConfig, opts)
    }

    for(const [key, cb] of Object.entries(callbacks))
        cb(config[key] ?? defaultConfig[key])

    return config
}

const configFile = path.join(downloads, 'config.json')
async function saveConfig(config: Config, opts: Required<AbortOptions>){
    return fs_writeFile(configFile, JSON.stringify(config, null, 4), { ...opts, encoding: 'utf8' })
}
