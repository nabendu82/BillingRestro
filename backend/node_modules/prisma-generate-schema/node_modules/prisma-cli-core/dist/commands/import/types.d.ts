export declare type ValueType = 'nodes' | 'relations' | 'lists';
export declare type ScalarType = number | string | boolean | null;
export interface Node {
    _typeName: string;
    id: string;
    [fieldName: string]: ScalarType | ScalarType[];
}
export interface RelationNode {
    _typeName: string;
    id: string;
    fieldName: string;
}
export declare type RelationTuple = [RelationNode, RelationNode];
export interface ImportData {
    valueType: ValueType;
    values: Node[] | RelationTuple[];
}
