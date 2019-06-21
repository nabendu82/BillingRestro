var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ApolloLink, Observable, } from 'apollo-link';
export var onError = function (errorHandler) {
    return new ApolloLink(function (operation, forward) {
        return new Observable(function (observer) {
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
}(ApolloLink));
export { ErrorLink };
//# sourceMappingURL=index.js.map