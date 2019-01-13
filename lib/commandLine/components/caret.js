import * as tslib_1 from "tslib";
import * as React from 'react';
import './caret.css';
var Caret = /** @class */ (function (_super) {
    tslib_1.__extends(Caret, _super);
    function Caret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            blinked: false,
        };
        return _this;
    }
    Caret.prototype.render = function () {
        var _a = this.props, commandString = _a.commandString, caretPosition = _a.caretPosition;
        var caretSymbol = commandString[caretPosition] === undefined
            ? 'C'
            : React.createElement("span", { className: "caret__caret-with-symbol" }, commandString[caretPosition]);
        return (React.createElement("span", { key: 'caret', className: this.getCaretStyles() }, caretSymbol));
    };
    Caret.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.setState({
                blinked: !_this.state.blinked,
            });
        }, 550);
    };
    Caret.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    Caret.prototype.getCaretStyles = function () {
        return this.state.blinked
            ? 'caret__caret-blinked'
            : 'caret__caret';
    };
    return Caret;
}(React.Component));
export { Caret };
