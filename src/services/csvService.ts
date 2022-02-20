import CSV from 'csvtojson'

export type CsvConverter<TInput, TOutput> = (rowData: TInput) => TOutput

export class CsvService {

    async parse<TInput, TOutput>(
        path: string,
        convert: CsvConverter<TInput, TOutput>
    ): Promise<TOutput[]> {
        let data = await CSV({
            noheader: true
        }).fromFile(path)

        return data.map((rowData: TInput) => convert(rowData))
    }

}

export default new CsvService()