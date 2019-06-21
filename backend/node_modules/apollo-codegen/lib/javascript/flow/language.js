"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../../utilities/graphql");
const helpers_1 = require("./helpers");
const t = require("@babel/types");
class FlowGenerator {
    constructor(compilerOptions) {
        this.options = compilerOptions;
        this.typeAnnotationFromGraphQLType = helpers_1.createTypeAnnotationFromGraphQLTypeFunction(compilerOptions);
    }
    enumerationDeclaration(type) {
        const { name, description } = type;
        const unionValues = graphql_1.sortEnumValues(type.getValues()).map(({ value }) => {
            const type = t.stringLiteralTypeAnnotation();
            type.value = value;
            return type;
        });
        const typeAlias = t.exportNamedDeclaration(t.typeAlias(t.identifier(name), undefined, t.unionTypeAnnotation(unionValues)), []);
        typeAlias.leadingComments = [{
                type: 'CommentLine',
                value: ` ${description}`
            }];
        return typeAlias;
    }
    inputObjectDeclaration(inputObjectType) {
        const { name } = inputObjectType;
        const fieldMap = inputObjectType.getFields();
        const fields = Object.keys(inputObjectType.getFields())
            .map((fieldName) => {
            const field = fieldMap[fieldName];
            return {
                name: fieldName,
                annotation: this.typeAnnotationFromGraphQLType(field.type)
            };
        });
        const typeAlias = this.typeAliasObject(name, fields, {
            keyInheritsNullability: true
        });
        return typeAlias;
    }
    objectTypeAnnotation(fields, { keyInheritsNullability = false } = {}) {
        const objectTypeAnnotation = t.objectTypeAnnotation(fields.map(({ name, description, annotation }) => {
            const objectTypeProperty = t.objectTypeProperty(t.identifier(name), annotation);
            objectTypeProperty.optional = keyInheritsNullability && annotation.type === "NullableTypeAnnotation";
            if (this.options.useFlowReadOnlyTypes) {
                objectTypeProperty.variance = { kind: 'plus' };
            }
            if (description) {
                objectTypeProperty.trailingComments = [{
                        type: 'CommentLine',
                        value: ` ${description.replace(new RegExp('\n', 'g'), ' ')}`
                    }];
            }
            return objectTypeProperty;
        }));
        if (this.options.useFlowExactObjects) {
            objectTypeAnnotation.exact = true;
        }
        return objectTypeAnnotation;
    }
    typeAliasObject(name, fields, { keyInheritsNullability = false } = {}) {
        return t.typeAlias(t.identifier(name), undefined, this.objectTypeAnnotation(fields, {
            keyInheritsNullability
        }));
    }
    typeAliasObjectUnion(name, members) {
        return t.typeAlias(t.identifier(name), undefined, t.unionTypeAnnotation(members.map(member => {
            return this.objectTypeAnnotation(member);
        })));
    }
    typeAliasGenericUnion(name, members) {
        return t.typeAlias(t.identifier(name), undefined, t.unionTypeAnnotation(members));
    }
    exportDeclaration(declaration, options = {}) {
        const exportedDeclaration = t.exportNamedDeclaration(declaration, []);
        if (options.comments) {
            exportedDeclaration.leadingComments = [{
                    type: 'CommentLine',
                    value: options.comments,
                }];
        }
        return exportedDeclaration;
    }
    annotationFromScopeStack(scope) {
        return t.genericTypeAnnotation(t.identifier(scope.join('_')));
    }
}
exports.default = FlowGenerator;
//# sourceMappingURL=language.js.map