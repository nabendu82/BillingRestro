import { ImportData, RelationTuple, RelationNode } from './types';
import { DocumentNode, ObjectTypeDefinitionNode, FieldDefinitionNode } from 'graphql';
export interface Mapping {
    [typeName: string]: {
        [key: string]: string;
    };
}
export interface FieldsMap {
    [name: string]: FieldDefinitionNode;
}
export interface Types {
    [typeName: string]: {
        definition: ObjectTypeDefinitionNode;
        fields: FieldsMap;
        requiredNonRelationScalarFieldNames: string[];
        requiredNonRelationListFieldNames: string[];
        allNonRelationListFieldNames: string[];
        allNonRelationScalarFieldNames: string[];
    };
}
export interface Enums {
    [enumName: string]: string[];
}
export declare class Validator {
    typesString: string;
    ast: DocumentNode;
    types: Types;
    enums: Enums;
    mapping: Mapping;
    validators: {
        [key: string]: (type: any) => boolean;
    };
    modelTypes: {
        [key: string]: boolean;
    };
    constructor(typesString: string);
    validateImportData(data: ImportData): true;
    validateNode(obj: any): true;
    validateListNode(obj: any): true;
    validateRelationNode(node: RelationNode): true;
    validateRelationTuple(tuple: RelationTuple): true;
    private checkFieldName;
    private collectModelTypes;
    private astToTypes;
    private astToEnums;
    private makeEnumValidators;
    private getFieldNames;
    private resolveFieldName;
    private checkTypeName;
    private checkIdField;
    private checkRequiredFields;
    private checkUnknownFields;
    private checkType;
    private validateValue;
    private validateScalarValue;
    private getDeepType;
    private isList;
}
