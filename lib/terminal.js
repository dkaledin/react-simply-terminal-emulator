define("terminal.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/commandLine/commandLine.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/commandLine/components/caret.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/commandLine/components/caret", ["require", "exports", "tslib", "react", "./caret.css"], function (require, exports, tslib_1, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Caret = Caret;
});
define("components/commandLine/commandLine", ["require", "exports", "tslib", "react", "components/commandLine/components/caret", "./commandLine.css"], function (require, exports, tslib_2, React, caret_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandLine = /** @class */ (function (_super) {
        tslib_2.__extends(CommandLine, _super);
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
                commandStringWithCaret.splice(_this.state.caretPosition, 1, React.createElement(caret_1.Caret, { key: 'caret', commandString: commandString, caretPosition: caretPosition }));
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
                    _this.props.onReceiveCommand(_this.state.commandString);
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
    exports.CommandLine = CommandLine;
});
define("components/terminalStateless", ["require", "exports", "react", "components/commandLine/commandLine", "./terminalStateless.css"], function (require, exports, React, commandLine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function TerminalStateless(props) {
        var history = props.history, prompt = props.prompt, onReceiveCommand = props.onReceiveCommand;
        return (React.createElement("div", { className: "terminal__box" },
            React.createElement("div", { className: "terminal__container" },
                history.map(function (line, index) {
                    return React.createElement("div", { key: index }, line);
                }),
                React.createElement(commandLine_1.CommandLine, { onReceiveCommand: onReceiveCommand, prompt: prompt }))));
    }
    exports.TerminalStateless = TerminalStateless;
});
define("terminalEmulator/terminalEmulator.interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("terminalEmulator/executors/baseExecutor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseExecutor = /** @class */ (function () {
        function BaseExecutor() {
        }
        BaseExecutor.prototype.checkCommand = function (command) {
            return this.commandPattern.test(command);
        };
        return BaseExecutor;
    }());
    exports.BaseExecutor = BaseExecutor;
});
define("terminalEmulator/executors/clearExecutor", ["require", "exports", "tslib", "terminalEmulator/executors/baseExecutor"], function (require, exports, tslib_3, baseExecutor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClearExecutor = /** @class */ (function (_super) {
        tslib_3.__extends(ClearExecutor, _super);
        function ClearExecutor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.commandPattern = new RegExp('^clear$', 'i');
            return _this;
        }
        ClearExecutor.prototype.execute = function (command, setState) {
            setState(function (prevState, props) {
                return {
                    history: [],
                    prompt: props.prompt,
                };
            });
        };
        ClearExecutor.prototype.isCompleted = function () {
            return true;
        };
        return ClearExecutor;
    }(baseExecutor_1.BaseExecutor));
    exports.ClearExecutor = ClearExecutor;
});
define("terminalEmulator/executors/helpExecutor", ["require", "exports", "tslib", "terminalEmulator/executors/baseExecutor"], function (require, exports, tslib_4, baseExecutor_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HelpExecutor = /** @class */ (function (_super) {
        tslib_4.__extends(HelpExecutor, _super);
        function HelpExecutor() {
            var _this = _super.call(this) || this;
            _this.commandPattern = new RegExp('^help$', 'i');
            return _this;
        }
        HelpExecutor.prototype.execute = function (command, setState) {
            setState(function (prevState, props) { return ({
                history: prevState.history.concat([
                    props.prompt + " " + command,
                    'This is the Help program!',
                ]),
                prompt: props.prompt,
            }); });
        };
        HelpExecutor.prototype.isCompleted = function () {
            return true;
        };
        return HelpExecutor;
    }(baseExecutor_2.BaseExecutor));
    exports.HelpExecutor = HelpExecutor;
});
define("terminalEmulator/terminalEmulator", ["require", "exports", "terminalEmulator/executors/clearExecutor", "terminalEmulator/executors/helpExecutor"], function (require, exports, clearExecutor_1, helpExecutor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TerminalEmulator = /** @class */ (function () {
        function TerminalEmulator(params) {
            this.executors = params.executors;
        }
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
                else if (command === '') {
                    this.emptyExecutor(setState);
                }
                else {
                    this.errorExecutor(setState);
                }
            }
        };
        TerminalEmulator.prototype.errorExecutor = function (setState) {
            var _this = this;
            setState(function (state, props) { return ({
                history: state.history.concat([
                    props.prompt + " " + _this.command,
                    "Terminal: Unknown command '" + _this.command + "'",
                ]),
                prompt: props.prompt,
            }); });
        };
        // TODO: Move this method to BaseExecutor
        TerminalEmulator.prototype.emptyExecutor = function (setState) {
            var _this = this;
            setState(function (state, props) { return ({
                history: state.history.concat([
                    props.prompt + " " + _this.command,
                ]),
                prompt: props.prompt,
            }); });
        };
        return TerminalEmulator;
    }());
    exports.TerminalEmulator = TerminalEmulator;
    exports.terminalEmulator = new TerminalEmulator({
        executors: [
            new clearExecutor_1.ClearExecutor(),
            new helpExecutor_1.HelpExecutor(),
        ],
    });
});
define("terminal", ["require", "exports", "tslib", "react", "components/terminalStateless", "terminalEmulator/terminalEmulator"], function (require, exports, tslib_5, React, terminalStateless_1, terminalEmulator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Terminal = /** @class */ (function (_super) {
        tslib_5.__extends(Terminal, _super);
        function Terminal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                history: _this.props.history,
                prompt: _this.props.prompt,
            };
            _this.handleReceiveCommand = function (command) {
                terminalEmulator_1.terminalEmulator.execute(command, _this.setState.bind(_this));
            };
            return _this;
        }
        Terminal.prototype.render = function () {
            var _a = this.state, history = _a.history, prompt = _a.prompt;
            return (React.createElement(terminalStateless_1.TerminalStateless, { history: history, prompt: prompt, onReceiveCommand: this.handleReceiveCommand }));
        };
        Terminal.defaultProps = {
            history: [],
            prompt: '$',
        };
        return Terminal;
    }(React.Component));
    exports.Terminal = Terminal;
});
define("terminalEmulator/__test__/TerminalEmulator.test", ["require", "exports", "terminalEmulator/terminalEmulator"], function (require, exports, terminalEmulator_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('TerminalEmulator', function () {
        var defaultPrompt = '$';
        var props = {
            prompt: defaultPrompt,
        };
        var terminalEmulator = new terminalEmulator_2.TerminalEmulator({
            executors: [],
        });
        var createSetStateMock = function (expected) { return jest.fn(function (state) {
            var prevState = {
                history: [],
                prompt: props.prompt,
            };
            var nextState = state(prevState, props);
            expect(expected).toEqual(nextState);
        }); };
        it('should execute errorExecutor command', function () {
            var undefinedCommand = 'undefined command';
            var setStateMock = createSetStateMock({
                history: [
                    defaultPrompt + " " + undefinedCommand,
                    "Terminal: Unknown command '" + undefinedCommand + "'",
                ],
                prompt: defaultPrompt,
            });
            terminalEmulator.execute(undefinedCommand, setStateMock);
            expect(setStateMock).toHaveBeenCalledTimes(1);
        });
        it('should execute emptyExecutor command', function () {
            var emptyCommand = '';
            var setStateMock = createSetStateMock({
                history: [
                    defaultPrompt + " " + emptyCommand,
                ],
                prompt: defaultPrompt,
            });
            terminalEmulator.execute(emptyCommand, setStateMock);
            expect(setStateMock).toHaveBeenCalledTimes(1);
        });
    });
});
