import * as tslib_1 from "tslib";
import * as React from 'react';
import { CommandLine } from './commandLine/commandLine';
import './terminal.css';
import { BasicEmulator } from './helper/emulator';
var Terminal = /** @class */ (function (_super) {
    tslib_1.__extends(Terminal, _super);
    function Terminal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            history: _this.props.history,
        };
        _this.handleReceiveCommand = function (command) { return _this.setState(_this.executor(command)); };
        _this.executor = BasicEmulator;
        return _this;
    }
    Terminal.prototype.render = function () {
        return (React.createElement("div", { className: "terminal__box" },
            React.createElement("div", { className: "terminal__container" },
                this.state.history.map(function (line, index) {
                    return React.createElement("div", { key: index }, line);
                }),
                React.createElement(CommandLine, { onReceiveCommand: this.handleReceiveCommand, prompt: this.props.prompt }))));
    };
    Terminal.defaultProps = {
        history: [],
        prompt: '$',
    };
    return Terminal;
}(React.Component));
export { Terminal };
