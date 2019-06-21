import ApolloClient from 'apollo-client';
export interface CommonComponentProps {
    client?: ApolloClient<Object>;
}
export interface CommonComponentContext {
    client?: ApolloClient<Object>;
}
export declare function getClient(props: CommonComponentProps, context: CommonComponentContext): ApolloClient<Object>;
