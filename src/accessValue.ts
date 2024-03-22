import { Obj, Path } from "./common"

type TracedObject = {
    _p: () => TracedObject | null
    _r: () => Obj
} & Obj
export type AccessValuePath = Path | ((parent: Obj) => any)

export function accessValue<TOut = any>(root: Obj, absolutePaths: Path[], path: AccessValuePath): TOut {
    const mappers = [root]


    let currentTrace: TracedObject = {
        _p: () => null,
        _r: () => root,
        ...root
    }


    absolutePaths.forEach((x: Path) => {
        if (typeof (currentTrace) != 'object') {
            return
        }
        currentTrace = {
            _p: () => currentTrace,
            _r: () => root,
            ...currentTrace[x]
        }
        mappers.push(currentTrace)
    })
    const parent = mappers[mappers.length - 2]

    let func: (p: Obj) => any = p => p
    if (typeof (path) === 'string') {
        func = eval("(p) => p." + path)
    } else if (typeof (path) === 'function') {
        func = path as ((p: Obj) => any)
    }
    return func(parent)
}
