import CSV from 'csvtojson'

export type CsvConverter<TInput, TOutput> = (rowData: TInput) => TOutput

export class CsvService {

    async parse<TFormat>(
        path: string,
        convert: (row: any) => TFormat
    ): Promise<TFormat[]> {
        let data = await CSV({
            noheader: true
        }).fromFile(path)

        return data.map(row => convert(row))
    }

}

export default new CsvService()