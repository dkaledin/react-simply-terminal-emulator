var BaseExecutor = /** @class */ (function () {
    function BaseExecutor() {
    }
    BaseExecutor.prototype.checkCommand = function (command) {
        return this.commandPattern.test(command);
    };
    return BaseExecutor;
}());
export { BaseExecutor };
