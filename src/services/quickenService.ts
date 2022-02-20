import { QuickenTransaction } from "../models/quickenTransaction"
import { Transaction } from "../models/transaction"
import csvService from "./csvService"


export class QuickenService {
    async fetchTransactions(path: string): Promise<Transaction[]> {
        const data = await csvService.parse<QuickenTransaction>(
            path,
            row => {
                return {
                    transDate: new Date(row.field1),
                    purchaseAmount: row.field2
                }
            }
        )

        return data.map(row => {
            return {
                transDate: row.transDate,
                purchaseAmount: row.purchaseAmount
            }
        })
    }
}

export default new QuickenService()