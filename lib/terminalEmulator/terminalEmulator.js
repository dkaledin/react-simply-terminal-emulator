import { ClearExecutor } from './executors/clearExecutor';
import { HelpExecutor } from './executors/helpExecutor';
var TerminalEmulator = /** @class */ (function () {
    function TerminalEmulator(params) {
        this.executors = params.executors;
    }
    TerminalEmulator.prototype.addExecutor = function (executor) {
        this.executors.push(executor);
    };
    TerminalEmulator.prototype.execute = function (command, setState) {
        this.command = command.trim();
        if (this.ranExecutor && !this.ranExecutor.isCompleted()) {
            this.ranExecutor.execute(command, setState);
        }
        else {
            var matchedExecutor = this.executors.find(function (executor) { return executor.checkCommand(command); });
            if (matchedExecutor) {
                this.ranExecutor = matchedExecutor;
                this.ranExecutor.execute(command, setState);
            }
            else if (command !== '') {
                this.errorExecutor(setState);
            }
        }
    };
    TerminalEmulator.prototype.errorExecutor = function (setState) {
        var _this = this;
        setState(function (state, props) { return ({
            history: state.history.concat([
                "Terminal: Unknown command '" + _this.command + "'",
            ]),
            prompt: props.prompt,
        }); });
    };
    return TerminalEmulator;
}());
export { TerminalEmulator };
export var terminalEmulator = new TerminalEmulator({
    executors: [
        new ClearExecutor(),
        new HelpExecutor(),
    ],
});
