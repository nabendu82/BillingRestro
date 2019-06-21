import { ApolloLink, FetchResult } from 'apollo-link';
import { DocumentNode } from 'graphql';
import { Cache } from 'apollo-cache';
import { QueryScheduler } from '../scheduler/scheduler';
import { Observer, Subscription, Observable } from '../util/Observable';
import { DataStore } from '../data/store';
import { MutationStore } from '../data/mutations';
import { QueryStore } from '../data/queries';
import { QueryOptions, WatchQueryOptions, SubscriptionOptions, MutationOptions } from './watchQueryOptions';
import { ObservableQuery } from './ObservableQuery';
import { QueryListener, ApolloQueryResult, FetchType, OperationVariables } from './types';
export interface QueryInfo {
    listeners: QueryListener[];
    invalidated: boolean;
    newData: Cache.DiffResult<any> | null;
    document: DocumentNode | null;
    lastRequestId: number | null;
    observableQuery: ObservableQuery<any> | null;
    subscriptions: Subscription[];
    cancel?: (() => void);
}
export interface QueryPromise {
    resolve: (result: ApolloQueryResult<any>) => void;
    reject: (error: Error) => void;
}
export declare class QueryManager<TStore> {
    scheduler: QueryScheduler<TStore>;
    link: ApolloLink;
    mutationStore: MutationStore;
    queryStore: QueryStore;
    dataStore: DataStore<TStore>;
    private deduplicator;
    private queryDeduplication;
    private onBroadcast;
    private idCounter;
    private queries;
    private fetchQueryPromises;
    private queryIdsByName;
    constructor({ link, queryDeduplication, store, onBroadcast, ssrMode, }: {
        link: ApolloLink;
        queryDeduplication?: boolean;
        store: DataStore<TStore>;
        onBroadcast?: () => void;
        ssrMode?: boolean;
    });
    mutate<T>({ mutation, variables, optimisticResponse, updateQueries: updateQueriesByName, refetchQueries, awaitRefetchQueries, update: updateWithProxyFn, errorPolicy, fetchPolicy, context, }: MutationOptions): Promise<FetchResult<T>>;
    fetchQuery<T>(queryId: string, options: WatchQueryOptions, fetchType?: FetchType, fetchMoreForQueryId?: string): Promise<FetchResult<T>>;
    queryListenerForObserver<T>(queryId: string, options: WatchQueryOptions, observer: Observer<ApolloQueryResult<T>>): QueryListener;
    watchQuery<T>(options: WatchQueryOptions, shouldSubscribe?: boolean): ObservableQuery<T>;
    query<T>(options: QueryOptions): Promise<ApolloQueryResult<T>>;
    generateQueryId(): string;
    stopQueryInStore(queryId: string): void;
    addQueryListener(queryId: string, listener: QueryListener): void;
    updateQueryWatch(queryId: string, document: DocumentNode, options: WatchQueryOptions): () => void;
    addFetchQueryPromise<T>(requestId: number, resolve: (result: ApolloQueryResult<T>) => void, reject: (error: Error) => void): void;
    removeFetchQueryPromise(requestId: number): void;
    addObservableQuery<T>(queryId: string, observableQuery: ObservableQuery<T>): void;
    removeObservableQuery(queryId: string): void;
    clearStore(): Promise<void>;
    resetStore(): Promise<ApolloQueryResult<any>[]>;
    reFetchObservableQueries(includeStandby?: boolean): Promise<ApolloQueryResult<any>[]>;
    startQuery<T>(queryId: string, options: WatchQueryOptions, listener: QueryListener): string;
    startGraphQLSubscription(options: SubscriptionOptions): Observable<any>;
    stopQuery(queryId: string): void;
    removeQuery(queryId: string): void;
    getCurrentQueryResult<T>(observableQuery: ObservableQuery<T>, optimistic?: boolean): {
        data: any;
        partial: boolean;
    };
    getQueryWithPreviousResult<T>(queryIdOrObservable: string | ObservableQuery<T>): {
        previousResult: any;
        variables: OperationVariables | undefined;
        document: DocumentNode;
    };
    broadcastQueries(): void;
    private getObservableQueryPromises;
    private fetchRequest;
    private refetchQueryByName;
    private generateRequestId;
    private getQuery;
    private setQuery;
    private invalidate;
    private buildOperationForLink;
}
//# sourceMappingURL=QueryManager.d.ts.map