import {TerminalEmulator} from '../terminalEmulator';

describe('TerminalEmulator', () => {
    const defaultPrompt = '$';
    const props = {
        prompt: defaultPrompt,
    };
    const terminalEmulator = new TerminalEmulator({
        executors: [],
    });

    const createSetStateMock = (expected: any) => jest.fn((state: any) => {
        const prevState = {
            history: [],
            prompt: props.prompt,
        };
        const nextState = state(prevState, props);
        expect(expected).toEqual(nextState);
    });

    it('should execute errorExecutor command', () => {
        const undefinedCommand = 'undefined command';
        const setStateMock = createSetStateMock({
            history: [
                `Terminal: Unknown command '${undefinedCommand}'`,
            ],
            prompt: defaultPrompt,
        });

        terminalEmulator.execute(undefinedCommand, setStateMock);

        expect(setStateMock).toHaveBeenCalledTimes(1);
    });

    it('should return history with default prompt and empty command', () => {
        const emptyCommand = '';
        const setStateMock = createSetStateMock({
            history: [
                `${defaultPrompt} ${emptyCommand}`,
            ],
            prompt: defaultPrompt,
        });
        terminalEmulator.execute(emptyCommand, setStateMock);
    });
});
