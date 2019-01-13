import * as tslib_1 from "tslib";
import * as React from 'react';
import { CommandLine } from './commandLine/commandLine';
import './terminal.css';
var Terminal = /** @class */ (function (_super) {
    tslib_1.__extends(Terminal, _super);
    function Terminal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            history: [],
        };
        _this.prompt = '$';
        _this.handleSubmit = function (command) {
            var commandLine = _this.prompt + " " + command;
            if (command === 'clear') {
                _this.setState({
                    history: [],
                });
            }
            else {
                _this.setState({
                    history: _this.state.history.concat([commandLine]),
                });
            }
        };
        return _this;
    }
    Terminal.prototype.render = function () {
        return (React.createElement("div", { className: "terminal__box" },
            React.createElement("div", { className: "terminal__container" },
                this.state.history.map(function (line, index) { return React.createElement("div", { key: index }, line); }),
                React.createElement(CommandLine, { onSubmit: this.handleSubmit, prompt: this.prompt }))));
    };
    return Terminal;
}(React.Component));
export { Terminal };
