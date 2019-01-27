import * as tslib_1 from "tslib";
import { BaseExecutor } from './baseExecutor';
var HelpExecutor = /** @class */ (function (_super) {
    tslib_1.__extends(HelpExecutor, _super);
    function HelpExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelpExecutor.prototype.execute = function (command, setState) {
        setState(function (prevState, props) { return ({
            history: prevState.history.concat([
                'This is the Help program!',
            ]),
            prompt: props.prompt,
        }); });
    };
    HelpExecutor.prototype.isCompleted = function () {
        return true;
    };
    HelpExecutor.prototype.getCommandPattern = function () {
        return /^help$/i;
    };
    return HelpExecutor;
}(BaseExecutor));
export { HelpExecutor };
