import CSV from 'csvtojson'

export default class CsvService<T> {

    async parse(path: string): Promise<T[]> {
        let data = await CSV().fromFile(path)

        return data.map(row => row as T)
    }

}