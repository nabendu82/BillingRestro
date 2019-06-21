export interface TableColumn<T> {
    key: string;
    label?: string;
    format: (value: string, row: string) => string;
    get: (row: T) => string;
    width: number;
}
export interface TableOptions<T> {
    columns?: Array<TableColumn<T>>;
    after?: (row: T, options: TableOptions<T>) => void;
    printRow?: (row: any[]) => void;
    printHeader?: (row: any[]) => void;
}
