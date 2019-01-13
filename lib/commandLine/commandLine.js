import * as tslib_1 from "tslib";
import * as React from 'react';
import { Caret } from './components/caret';
import './commandLine.css';
var CommandLine = /** @class */ (function (_super) {
    tslib_1.__extends(CommandLine, _super);
    function CommandLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            commandString: '',
            caretPosition: 0,
        };
        _this.inputRef = React.createRef();
        _this.keyboardEvents = ['keyup', 'keydown', 'keypress'];
        _this.handleInputChange = function (event) {
            var value = event.target.value;
            _this.setState({
                commandString: value,
            });
            _this.updateCaretPosition();
        };
        _this.handleSelect = function (event) {
            event.target.selectionStart = event.target.selectionEnd;
        };
        _this.renderCommandLive = function () {
            var _a = _this.state, commandString = _a.commandString, caretPosition = _a.caretPosition;
            var commandStringWithCaret = commandString.split('');
            commandStringWithCaret.splice(_this.state.caretPosition, 1, React.createElement(Caret, { key: 'caret', commandString: commandString, caretPosition: caretPosition }));
            return commandStringWithCaret;
        };
        _this.updateCaretPosition = function () {
            var newCaretPosition = _this.inputRef.current.selectionStart;
            _this.setState({
                caretPosition: Number(newCaretPosition),
            });
        };
        _this.handleEnterKeyPress = function (event) {
            if (event.key === 'Enter') {
                _this.props.onSubmit(_this.state.commandString);
                _this.setState({
                    commandString: '',
                    caretPosition: 0,
                });
            }
        };
        return _this;
    }
    CommandLine.prototype.render = function () {
        var prompt = this.props.prompt;
        return (React.createElement("div", null,
            React.createElement("span", null,
                prompt,
                " "),
            this.renderCommandLive(),
            React.createElement("input", { type: "text", className: "command-line__input", onChange: this.handleInputChange, autoFocus: true, ref: this.inputRef, onSelect: this.handleSelect, value: this.state.commandString })));
    };
    CommandLine.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this.inputRef.current.focus(); }, 500);
        this.keyboardEvents.map(function (eventName) {
            return document.addEventListener(eventName, _this.updateCaretPosition);
        });
        document.addEventListener('keypress', this.handleEnterKeyPress);
    };
    CommandLine.prototype.componentWillUnmount = function () {
        var _this = this;
        clearInterval(this.interval);
        this.keyboardEvents.map(function (eventName) {
            return document.removeEventListener(eventName, _this.updateCaretPosition);
        });
        document.removeEventListener('keyPress', this.handleEnterKeyPress);
    };
    return CommandLine;
}(React.Component));
export { CommandLine };
