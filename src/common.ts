export type Path = number | string

export type BreakFurtherFunc<T extends Obj = Obj, TOut = any> = (obj: T, paths: Path[]) => TOut
export type Obj = {
    [key: Path]: any
}


export type OnIteratingObject<T extends Obj = Obj, TOut = T> = (obj: T, breakFurtherFunc: BreakFurtherFunc<T>, paths: Path[]) => TOut
export type OnGeneratorIsFound<TOut = any> = (obj: RGenerator, paths: Path[]) => (TOut | RGenerator)
export type OnPrimitiveIsFound<TOut = any> = (obj: any, paths: Path[]) => TOut

export function transformRecursively<T extends Obj, TOut = T>(obj: T, events: {
    onIteratingObject?: OnIteratingObject,
    onGeneratorIsFound?: OnGeneratorIsFound,
    onPrimitiveIsFound?: OnPrimitiveIsFound
}, paths?: Path[]): TOut {
    let {
        onIteratingObject,
        onGeneratorIsFound,
        onPrimitiveIsFound
    } = events;
    if (!onIteratingObject) {
        onIteratingObject = (x, breakFurtherFunc, paths0) => breakFurtherFunc(x, paths0)
    }
    if (!onGeneratorIsFound) {
        onGeneratorIsFound = (x) => x
    }
    if (!onPrimitiveIsFound) {
        onPrimitiveIsFound = (x) => x
    }
    if (!paths) {
        paths = []
    }

    let newObj: any = obj
    if (typeof newObj === 'object') {
        if (newObj instanceof RGenerator) {
            return onGeneratorIsFound(newObj, paths)
        }
        const breakFurtherFunc: BreakFurtherFunc = (o: Obj, paths0: Path[]) => {
            if (Array.isArray(o)) {
                return o.map((x, idx) => transformRecursively(x, events, [...paths0, idx]))
            } else {
                const otherObj: any = {}
                for (const key in o) {
                    otherObj[key] = transformRecursively(o[key], events, [...paths0, key])
                }
                return otherObj
            }
        }
        newObj = onIteratingObject(newObj, breakFurtherFunc, paths)

    } else {
        newObj = onPrimitiveIsFound(newObj, paths)
    }
    return newObj
}

export type RGeneratorFunc<TIn = any, TOut = any> = (res: TIn | null, context: Obj) => TOut

export type PhaseCheck = number | (() => number)

export class RGenerator {
    funcs: RGeneratorFunc[]
    phase: number
    constructor(func: RGeneratorFunc, phase: number = 0) {
        this.funcs = [func]
        this.phase = phase
    }
    generate<TOut = any>(phaseCheck: PhaseCheck = 0, context: Obj = {}): TOut | RGenerator {
        if (typeof (phaseCheck) == 'number' && this.phase > phaseCheck) {
            return this
        }
        if (typeof (phaseCheck) == 'function' && this.phase > phaseCheck()) {
            return this
        }
        let res: any = null
        this.funcs.forEach((func) => {
            res = func(res, context)
        })
        return res
    }

    asString(): RGenerator {
        this.funcs.push((res) => (res).toString())
        return this
    }
    mappedInto(mapper: Obj): RGenerator {
        this.funcs.push((res) => mapper[res])
        return this
    }
    transformedInto(func: RGeneratorFunc): RGenerator {
        this.funcs.push(func)
        return this
    }
}
