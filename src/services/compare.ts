import { Transaction } from "../models/transaction";

export interface MissingTransactionReport {

}

const groupBy = <TKey, TValue>(
    input: TValue[],
    keySelector: (value: TValue) => TKey,

): Map<TKey, TValue[]> => {
    const map = new Map<TKey, TValue[]>()

    for (const value of input) {
        const key = keySelector(value)

        if (!map.has(key)) {
            map.set(key, [])
            continue
        }

        const group = map.get(key)!

        group.push(value)
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
        const leftDates = leftGroup.keys()

        for (const date of leftDates) {
            const leftTransactions = leftGroup.get(date)!
            const rightTransactions = rightGroup.get(date)

            if (!rightTransactions) {
                continue
            }

            const numLeft = leftTransactions.length
            const numRight = rightTransactions.length

            if (numLeft > numRight) {
                console.debug('transactions in left that are not in right')
            } else {
                console.debug('transactions in right that are not in left')
            }
        }

        return {}
    }
}