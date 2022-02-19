import CSV from 'csvtojson'

export default class CsvService<T> {

    async parse(path: string): Promise<T[]> {
        let data = await CSV({
            noheader: true
        }).fromFile(path)

        return data as T[]
    }

}