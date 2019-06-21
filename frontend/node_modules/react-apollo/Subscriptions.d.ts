import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient, { ApolloError } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { OperationVariables } from './types';
export interface SubscriptionResult<TData = any> {
    loading: boolean;
    data?: TData;
    error?: ApolloError;
}
export interface OnSubscriptionDataOptions<TData = any> {
    client: ApolloClient<Object>;
    subscriptionData: SubscriptionResult<TData>;
}
export interface SubscriptionProps<TData = any, TVariables = OperationVariables> {
    subscription: DocumentNode;
    variables?: TVariables;
    shouldResubscribe?: any;
    client?: ApolloClient<Object>;
    onSubscriptionData?: (options: OnSubscriptionDataOptions<TData>) => any;
    children?: (result: SubscriptionResult<TData>) => React.ReactNode;
}
export interface SubscriptionState<TData = any> {
    loading: boolean;
    data?: TData;
    error?: ApolloError;
}
export interface SubscriptionContext {
    client?: ApolloClient<Object>;
}
declare class Subscription<TData = any, TVariables = any> extends React.Component<SubscriptionProps<TData, TVariables>, SubscriptionState<TData>> {
    static contextTypes: {
        client: PropTypes.Validator<object>;
    };
    static propTypes: {
        subscription: PropTypes.Validator<object>;
        variables: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<(...args: any[]) => any>;
        onSubscriptionData: PropTypes.Requireable<(...args: any[]) => any>;
        shouldResubscribe: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
    };
    private client;
    private queryObservable?;
    private querySubscription?;
    constructor(props: SubscriptionProps<TData, TVariables>, context: SubscriptionContext);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SubscriptionProps<TData, TVariables>, nextContext: SubscriptionContext): void;
    componentWillUnmount(): void;
    render(): any;
    private initialize;
    private startSubscription;
    private getInitialState;
    private updateCurrentData;
    private updateError;
    private endSubscription;
}
export default Subscription;
