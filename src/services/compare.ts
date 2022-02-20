import { Transaction } from "../models/transaction";

export interface MissingTransactionReport {

}

type StringMap<TValue> = { [key: string]: TValue[] } 

const groupBy = <TValue>(
    input: TValue[],
    keySelector: (value: TValue) => string,

): StringMap<TValue> => {
    var map: StringMap<TValue> = {}

    for (const value of input) {
        const key = keySelector(value)
        if (!map[key]) {
            map[key] = []
            continue
        }

        const test = map[key]

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
            value => value.transDate.toISOString()
        )
        const rightGroup = groupBy(
            rightData,
            value => value.transDate.toISOString()
        )
        const leftDates = Object.keys(leftGroup)

        for (var dateString of leftDates) {
            const date = new Date(dateString)
            const leftTransactions = leftGroup[dateString]!
            const rightTransactions = rightGroup[dateString]

            if (!rightTransactions) {
                console.debug('right missing transaction on ' + date.toISOString())
                continue
            }

            const numLeft = leftTransactions.length
            const numRight = rightTransactions.length

            if (numLeft > numRight) {
                console.debug('transactions in left that are not in right on day ' +  date.toISOString())
            } else if (numLeft < numRight) {
                console.debug('transactions in right that are not in left on day ' + date.toISOString())
            } else {
                console.debug('transactions are equal on day ' + date.toISOString())
            }
        }

        return {}
    }
}

export default new CompareService()