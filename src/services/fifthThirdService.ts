import { FifthThirdTransaction } from "../models/fifthThirdTransaction";
import { Transaction } from "../models/transaction";
import csvService from "./csvService";
export class FifthThirdService {
    async fetchTransactions(path: string): Promise<Transaction[]> {
        const data = await csvService.parse<FifthThirdTransaction>(
            path,
            row => { 
                return {
                    transDate: row.field1,
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

export default new FifthThirdService()