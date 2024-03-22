import { Obj, RGenerator } from "./common";
import { AccessValuePath } from "./accessValue";
export declare class RTool {
    static AnyOf<T = any>(...options: T[]): T;
    static Between(min: number, max: number): number;
    static Guid(): string;
    static Date(startDate: string, endDate: string, format: string): string;
}
export declare class R {
    static SameAs(path: AccessValuePath): RGenerator;
    static AnyOf(...options: any): RGenerator;
    static Between(min: number, max: number): RGenerator;
    static Guid(): RGenerator;
    static Date(startDate: string, endDate: string, format: string): RGenerator;
    static Array(rGenerator: RGenerator | Obj): RArray;
    static Object(obj: Obj): RObject;
}
declare class RArray extends RGenerator {
    from: number;
    to: number;
    constructor(obj: RGenerator | Obj);
    withLengthBetween(from: number, to: number): RGenerator;
}
declare class RObject extends RGenerator {
    constructor(format: Obj);
}
export {};
