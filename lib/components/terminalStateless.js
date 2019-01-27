import * as tslib_1 from "tslib";
import * as React from 'react';
import { CommandLine } from './commandLine/commandLine';
import * as styles from './terminalStateless.style';
var TerminalStateless = /** @class */ (function (_super) {
    tslib_1.__extends(TerminalStateless, _super);
    function TerminalStateless() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boxRef = React.createRef();
        return _this;
    }
    TerminalStateless.prototype.render = function () {
        var _a = this.props, history = _a.history, prompt = _a.prompt, onReceiveCommand = _a.onReceiveCommand, width = _a.width, height = _a.height;
        var terminalBox = tslib_1.__assign({}, styles.terminalBox, { width: width || styles.terminalBox.width, height: height || styles.terminalBox.height });
        return (React.createElement("div", { style: terminalBox, ref: this.boxRef },
            React.createElement("div", { style: styles.terminalContainer },
                history.map(function (line, index) {
                    return React.createElement("div", { key: index, style: styles.terminalContainerLine }, line);
                }),
                React.createElement(CommandLine, { onReceiveCommand: onReceiveCommand, prompt: prompt }))));
    };
    TerminalStateless.prototype.componentDidUpdate = function () {
        var box = this.boxRef.current;
        box.scroll({
            top: box.scrollHeight,
        });
    };
    return TerminalStateless;
}(React.Component));
export { TerminalStateless };
