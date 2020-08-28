import { EnumTaskState } from "../TaskState"
import { CNoteTask } from "../CNoteTask";
import { VTaskView } from "./VTaskView";
import { VTaskStart } from "./VTaskStart";
import { VTaskDone } from "./VTaskDone";
import { VTaskPass } from "./VTaskPass";
import { VTaskFail } from "./VTaskFail";
import { VTaskRated } from "./VTaskRated";
import { VTaskCanceled } from "./VTaskCanceled";

export class TaskViewFactory {
	private stateViews: { [type in EnumTaskState]: new (controller: CNoteTask) => VTaskView } = {
		[EnumTaskState.Start]: VTaskStart,
		[EnumTaskState.Done]: VTaskDone,
		[EnumTaskState.Pass]: VTaskPass,
		[EnumTaskState.Fail]: VTaskFail,
		[EnumTaskState.Rated]: VTaskRated,
		[EnumTaskState.Canceled]: VTaskCanceled,
	}

	getView = (enumTaskState: EnumTaskState) => {
		let TaskView = this.stateViews[enumTaskState];
		if (!TaskView) {
			TaskView = VTaskStart;
		}
		return TaskView;
	}
}
