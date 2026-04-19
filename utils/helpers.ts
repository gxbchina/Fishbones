export function sortInplace<T>(a: T[], by: (e: T) => (number | string), dir: 'asc' | 'dsc' = 'asc'): T[] {
    const s = dir == 'asc' ? +1 : -1
    a.sort((a, b) => {
        const by_a = by(a)
        const by_b = by(b)
        if(by_a < by_b) return -1 * s
        if(by_b < by_a) return +1 * s
        return 0
    })
    return a
}
