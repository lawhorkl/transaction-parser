import { Transaction } from "../models/transaction";

export interface MissingTransactionReport {
    datesMissingTransactions: StringMap<number>
}

type StringArrayMap<TValue> = { [key: string]: TValue[] } 
type StringMap<TValue> = { [key: string]: TValue }


const groupBy = <TValue>(
    input: TValue[],
    keySelector: (value: TValue) => string
): StringArrayMap<TValue> => {
    var map: StringArrayMap<TValue> = {}

    for (const value of input) {
        const key = keySelector(value)
        if (!map[key]) {
            map[key] = []
        }

        map[key] = [ ...map[key], value]
    }

    return map
}

export class CompareService {
    findMissingTransactions(
        leftData: Transaction[],
        rightData: Transaction[]
    ): MissingTransactionReport {
        const leftGroup = groupBy(
            leftData,
            value => value.transDate
        )
        const rightGroup = groupBy(
            rightData,
            value => value.transDate
        )
        const rightDates = Object.keys(rightGroup)
        const report: MissingTransactionReport = {
            datesMissingTransactions: {}
        }

        for (var dateString of rightDates) {
            const date = new Date(dateString)
            const leftTransactions = leftGroup[dateString]
            const rightTransactions = rightGroup[dateString]!

            const numLeft = leftTransactions?.length
            const numRight = rightTransactions.length

            if (!leftTransactions) {
                console.debug('missing all transactions on ' + date.toDateString())
                report.datesMissingTransactions[dateString] = numRight
                continue
            }
            
            const diff = numRight - numLeft
            console.debug(`missing ${diff} transactions on` +  date.toDateString())
            report.datesMissingTransactions[dateString] = diff
        }

        return report
    }
}

export default new CompareService()