import * as tslib_1 from "tslib";
import * as React from 'react';
import { TerminalStateless } from './components/terminalStateless';
var Terminal = /** @class */ (function (_super) {
    tslib_1.__extends(Terminal, _super);
    function Terminal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            history: _this.props.history,
            prompt: _this.props.prompt,
        };
        _this.handleReceiveCommand = function (command) {
            _this.setState(function (prevState) { return ({
                history: prevState.history.concat([
                    prevState.prompt + " " + command,
                ]),
            }); }, function () {
                _this.props.terminalEmulator.execute(command, _this.setState.bind(_this));
            });
        };
        return _this;
    }
    Terminal.prototype.render = function () {
        var _a = this.state, history = _a.history, prompt = _a.prompt;
        return (React.createElement(TerminalStateless, { history: history, prompt: prompt, onReceiveCommand: this.handleReceiveCommand }));
    };
    Terminal.defaultProps = {
        history: [],
        prompt: '$',
    };
    return Terminal;
}(React.Component));
export { Terminal };
