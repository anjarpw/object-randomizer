export type Path = number | string;
export type BreakFurtherFunc<T extends Obj = Obj, TOut = any> = (obj: T, paths: Path[]) => TOut;
export type Obj = {
    [key: Path]: any;
};
export type OnIteratingObject<T extends Obj = Obj, TOut = T> = (obj: T, breakFurtherFunc: BreakFurtherFunc<T>, paths: Path[]) => TOut;
export type OnGeneratorIsFound<TOut = any> = (obj: RGenerator, paths: Path[]) => (TOut | RGenerator);
export type OnPrimitiveIsFound<TOut = any> = (obj: any, paths: Path[]) => TOut;
export declare function transformRecursively<T extends Obj, TOut = T>(obj: T, events: {
    onIteratingObject?: OnIteratingObject;
    onGeneratorIsFound?: OnGeneratorIsFound;
    onPrimitiveIsFound?: OnPrimitiveIsFound;
}, paths?: Path[]): TOut;
export type RGeneratorFunc<TIn = any, TOut = any> = (res: TIn | null, context: Obj) => TOut;
export type PhaseCheck = number | (() => number);
export declare class RGenerator {
    funcs: RGeneratorFunc[];
    phase: number;
    constructor(func: RGeneratorFunc, phase?: number);
    generate<TOut = any>(phaseCheck?: PhaseCheck, context?: Obj): TOut | RGenerator;
    asString(): RGenerator;
    mappedInto(mapper: Obj): RGenerator;
    transformedInto(func: RGeneratorFunc): RGenerator;
}
