/**
 *
 * PageOf
 *
 * An implementation of React's higher-order component to handle
 * cross-cutting concerns.
 */

import React from "react";
import { ApolloError, ApolloProvider } from "@apollo/client";

import client from "../../../apollo/client";

export default function PageOf(WrappedComponent) {
    return class extends React.Component {
        state: { error; errorInfo };

        constructor(props) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }

        static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { error: error };
        }

        componentDidCatch(error, errorInfo) {
            // Catch errors in any components below and re-render with error message
            this.setState({
            error: error,
            errorInfo: errorInfo
            });
        }

        render() {
            const error = this.state.error;
            const errorMessage = error ? error.toString() : "Something went wrong.";

            let details = "";
            if (error) {
                if (error instanceof ApolloError) {
                    details += error.graphQLErrors.map(
                    ({ message, locations, path }) =>
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    );
                }
            }

            if (this.state.errorInfo) {
                return (
                    <div>
                    <h2>{errorMessage}</h2>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        <p>{details}</p>
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                    </div>
                );
            }

            return (
                <ApolloProvider client={client}>
                    <WrappedComponent {...this.props} />
                </ApolloProvider>
            );
        }
    };
}
