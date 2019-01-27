import * as tslib_1 from "tslib";
import { BaseExecutor } from './baseExecutor';
var ClearExecutor = /** @class */ (function (_super) {
    tslib_1.__extends(ClearExecutor, _super);
    function ClearExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    ClearExecutor.prototype.getCommandPattern = function () {
        return /^clear$/i;
    };
    return ClearExecutor;
}(BaseExecutor));
export { ClearExecutor };
