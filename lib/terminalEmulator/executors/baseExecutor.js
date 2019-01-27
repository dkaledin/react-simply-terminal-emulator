var BaseExecutor = /** @class */ (function () {
    function BaseExecutor() {
    }
    BaseExecutor.prototype.checkCommand = function (command) {
        var commandPattern = this.getCommandPattern();
        return commandPattern.test(command);
    };
    BaseExecutor.prototype.init = function () {
        // it necessary for complicated command
    };
    return BaseExecutor;
}());
export { BaseExecutor };
