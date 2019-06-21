import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient, { PureQueryOptions, ApolloError } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import { DocumentNode, GraphQLError } from 'graphql';
import { OperationVariables, RefetchQueriesProviderFn } from './types';
export interface MutationResult<TData = Record<string, any>> {
    data?: TData;
    error?: ApolloError;
    loading: boolean;
    called: boolean;
    client: ApolloClient<Object>;
}
export interface MutationContext {
    client?: ApolloClient<Object>;
    operations: Map<string, {
        query: DocumentNode;
        variables: any;
    }>;
}
export interface ExecutionResult<T = Record<string, any>> {
    data?: T;
    extensions?: Record<string, any>;
    errors?: GraphQLError[];
}
export declare type MutationUpdaterFn<T = {
    [key: string]: any;
}> = (proxy: DataProxy, mutationResult: FetchResult<T>) => void;
export declare type FetchResult<C = Record<string, any>, E = Record<string, any>> = ExecutionResult<C> & {
    extensions?: E;
    context?: C;
};
export declare type MutationOptions<TData = any, TVariables = OperationVariables> = {
    variables?: TVariables;
    optimisticResponse?: Object;
    refetchQueries?: Array<string | PureQueryOptions> | RefetchQueriesProviderFn;
    awaitRefetchQueries?: boolean;
    update?: MutationUpdaterFn<TData>;
};
export declare type MutationFn<TData = any, TVariables = OperationVariables> = (options?: MutationOptions<TData, TVariables>) => Promise<void | FetchResult<TData>>;
export interface MutationProps<TData = any, TVariables = OperationVariables> {
    client?: ApolloClient<Object>;
    mutation: DocumentNode;
    ignoreResults?: boolean;
    optimisticResponse?: Object;
    variables?: TVariables;
    refetchQueries?: Array<string | PureQueryOptions> | RefetchQueriesProviderFn;
    awaitRefetchQueries?: boolean;
    update?: MutationUpdaterFn<TData>;
    children: (mutateFn: MutationFn<TData, TVariables>, result: MutationResult<TData>) => React.ReactNode;
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
    context?: Record<string, any>;
}
export interface MutationState<TData = any> {
    called: boolean;
    error?: ApolloError;
    data?: TData;
    loading: boolean;
}
declare class Mutation<TData = any, TVariables = OperationVariables> extends React.Component<MutationProps<TData, TVariables>, MutationState<TData>> {
    static contextTypes: {
        client: PropTypes.Validator<object>;
        operations: PropTypes.Requireable<object>;
    };
    static propTypes: {
        mutation: PropTypes.Validator<object>;
        variables: PropTypes.Requireable<object>;
        optimisticResponse: PropTypes.Requireable<object>;
        refetchQueries: PropTypes.Requireable<((...args: any[]) => any) | (string | object | null)[]>;
        awaitRefetchQueries: PropTypes.Requireable<boolean>;
        update: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Validator<(...args: any[]) => any>;
        onCompleted: PropTypes.Requireable<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
    };
    private client;
    private mostRecentMutationId;
    private hasMounted;
    constructor(props: MutationProps<TData, TVariables>, context: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: MutationProps<TData, TVariables>, nextContext: MutationContext): void;
    render(): React.ReactNode;
    private runMutation;
    private mutate;
    private onMutationStart;
    private onMutationCompleted;
    private onMutationError;
    private generateNewMutationId;
    private isMostRecentMutation;
    private verifyDocumentIsMutation;
}
export default Mutation;
