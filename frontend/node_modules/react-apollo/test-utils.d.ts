import React from 'react';
import ApolloClient from 'apollo-client';
import { DefaultOptions } from 'apollo-client/ApolloClient';
import { MockedResponse } from './test-links';
import { ApolloCache } from 'apollo-cache';
export * from './test-links';
export interface MockedProviderProps<TSerializedCache = {}> {
    mocks?: ReadonlyArray<MockedResponse>;
    addTypename?: boolean;
    defaultOptions?: DefaultOptions;
    cache?: ApolloCache<TSerializedCache>;
}
export interface MockedProviderState {
    client: ApolloClient<any>;
}
export declare class MockedProvider extends React.Component<MockedProviderProps, MockedProviderState> {
    static defaultProps: MockedProviderProps;
    constructor(props: MockedProviderProps);
    render(): JSX.Element;
    componentWillUnmount(): void;
}
