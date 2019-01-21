import * as tslib_1 from "tslib";
import * as React from 'react';
import * as styles from './caret.style';
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
            : React.createElement("span", { style: styles.caretCaretWithSymbol }, commandString[caretPosition]);
        return (React.createElement("span", { key: 'caret', style: this.getCaretStyles() }, caretSymbol));
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
            ? styles.caretCaretBlinked
            : styles.caretCaret;
    };
    return Caret;
}(React.Component));
export { Caret };
