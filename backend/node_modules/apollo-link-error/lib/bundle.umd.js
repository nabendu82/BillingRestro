(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('apollo-link')) :
    typeof define === 'function' && define.amd ? define(['exports', 'apollo-link'], factory) :
    (factory((global.apolloLink = global.apolloLink || {}, global.apolloLink.error = {}),global.apolloLink.core));
}(this, (function (exports,apolloLink) { 'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var onError = function (errorHandler) {
        return new apolloLink.ApolloLink(function (operation, forward) {
            return new apolloLink.Observable(function (observer) {
                var sub;
                try {
                    sub = forward(operation).subscribe({
                        next: function (result) {
                            if (result.errors) {
                                errorHandler({
                                    graphQLErrors: result.errors,
                                    response: result,
                                    operation: operation,
                                });
                            }
                            observer.next(result);
                        },
                        error: function (networkError) {
                            errorHandler({
                                operation: operation,
                                networkError: networkError,
                                //Network errors can return GraphQL errors on for example a 403
                                graphQLErrors: networkError.result && networkError.result.errors,
                            });
                            observer.error(networkError);
                        },
                        complete: observer.complete.bind(observer),
                    });
                }
                catch (e) {
                    errorHandler({ networkError: e, operation: operation });
                    observer.error(e);
                }
                return function () {
                    if (sub)
                        sub.unsubscribe();
                };
            });
        });
    };
    var ErrorLink = /** @class */ (function (_super) {
        __extends(ErrorLink, _super);
        function ErrorLink(errorHandler) {
            var _this = _super.call(this) || this;
            _this.link = onError(errorHandler);
            return _this;
        }
        ErrorLink.prototype.request = function (operation, forward) {
            return this.link.request(operation, forward);
        };
        return ErrorLink;
    }(apolloLink.ApolloLink));

    exports.onError = onError;
    exports.ErrorLink = ErrorLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
