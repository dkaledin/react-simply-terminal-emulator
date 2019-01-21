import { TerminalEmulator } from '../terminalEmulator';
describe('TerminalEmulator', function () {
    var defaultPrompt = '$';
    var props = {
        prompt: defaultPrompt,
    };
    var terminalEmulator = new TerminalEmulator({
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
