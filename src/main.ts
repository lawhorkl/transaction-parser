import CsvService from "./services/csvService"


const main = async () => {
    const csvService = new CsvService<{ testA: string, testB: string }>()

    try { 
        const path = __dirname + "/../files/test.csv"
        console.log(path)

        const data = await csvService.parse(path)

        console.log(data)
    } catch (e: any) {
        console.log(e)
    }
}

main()
