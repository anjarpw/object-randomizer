import { Obj, Path } from "./common";
export type AccessValuePath = Path | ((parent: Obj) => any);
export declare function accessValue<TOut = any>(root: Obj, absolutePaths: Path[], path: AccessValuePath): TOut;
