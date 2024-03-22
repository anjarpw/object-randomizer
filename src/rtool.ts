import moment, { Moment } from "moment";
import { Obj, RGenerator, transformRecursively } from "./common"
import { v4 as uuidv4 } from 'uuid';
import { accessValue, AccessValuePath } from "./accessValue";


export class RTool {
    static AnyOf<T = any>(...options: T[]): T {
        return options[Math.floor(Math.random() * options.length)];
    }

    static Between(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static Guid(): string {
        return uuidv4() as string;
    }


    static Date(startDate: string, endDate: string, format: string): string {
        const start: Moment = moment(startDate);
        const end: Moment = moment(endDate);

        // Calculate the range in milliseconds
        const range = end.diff(start);

        // Generate a random number within the range
        const randomRange = Math.random() * range;

        // Add the random number of milliseconds to the start date
        const randomDate = start.add(randomRange, 'milliseconds');

        // Format the random date using the provided format
        const formattedDate = randomDate.format(format);

        return formattedDate;
    }

}

export class R {
    static SameAs(path: AccessValuePath) {
        return new RGenerator((_, context) => {
            const {
                root,
                absolutePaths
            } = context
            return accessValue(root, absolutePaths, path)
        }, 1);
    }

    static AnyOf(...options: any) {
        return new RGenerator(() => RTool.AnyOf(...options));
    }

    static Between(min: number, max: number) {
        return new RGenerator(() => RTool.Between(min, max));
    }

    static Guid() {
        return new RGenerator(() => RTool.Guid());
    }


    static Date(startDate: string, endDate: string, format: string) {
        return new RGenerator(() => RTool.Date(startDate, endDate, format));
    }

    static Array(rGenerator: RGenerator | Obj): RArray {
        return new RArray(rGenerator)
    }
    static Object(obj: Obj): RObject {
        return new RObject(obj)
    }
}


class RArray extends RGenerator {
    from: number
    to: number

    constructor(obj: RGenerator | Obj) {
        const func = () => {
            const result: (Obj | RGenerator)[] = [];
            const length = RTool.Between(this.from, this.to);
            for (let i = 0; i < length; i++) {
                let tempObj = transformRecursively(obj, {
                    onGeneratorIsFound: (x) => x.generate()
                })
                result.push(tempObj)
            }
            return result;
        }
        super(func)
        this.from = 1
        this.to = 1
    }

    withLengthBetween(from: number, to: number): RGenerator {
        this.from = from
        this.to = to
        return this
    }
}
class RObject extends RGenerator {

    constructor(format: Obj) {
        let func = () => {
            let tempObj = transformRecursively(format, {
                onGeneratorIsFound: (x) => x.generate()
            })
            tempObj = transformRecursively(tempObj, {
                onGeneratorIsFound: (x, absolutePaths) => {
                    let res = x.generate(1, {
                        root: tempObj,
                        absolutePaths
                    })
                    return res;
                }
            })
            return tempObj
        }
        super(func)
    }
}
