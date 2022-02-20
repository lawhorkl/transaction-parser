import compareService from "./services/compare"
import fifthThirdService from "./services/fifthThirdService"
import quickenService from "./services/quickenService"

const leftPath = "/Users/kyle/workspace/trans-parser/files/left.csv"
const rightPath = "/Users/kyle/workspace/trans-parser/files/right.csv"

const main = async () => {
    const leftTransactions = await quickenService.fetchTransactions(leftPath)
    const rightTransactions = await fifthThirdService.fetchTransactions(rightPath)

    compareService.findMissingTransactions(leftTransactions, rightTransactions)
}

main()

