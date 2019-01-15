function CommandExecutorFactory(params) {
    return function (rawCommand) {
        var command = rawCommand.trim();
        if (command === '') {
            return function (state, props) { return ({
                history: state.history.concat([
                    props.prompt,
                ]),
            }); };
        }
        if (params.commandList[command]) {
            return params.commandList[command];
        }
        return function (state, props) { return ({
            history: state.history.concat([
                props.prompt + " " + command,
                "Terminal Emulator: Unknown command '" + command + "'",
            ]),
        }); };
    };
}
var clear = function () { return ({
    history: [],
}); };
var help = function (state, props) { return ({
    history: state.history.concat([
        props.prompt + " help",
        "Hi, Man :) It's Simply Terminal Emulator Help",
    ]),
}); };
export var BasicEmulator = CommandExecutorFactory({
    commandList: {
        clear: clear,
        help: help,
    },
});
