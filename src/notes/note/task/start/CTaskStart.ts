import { CNoteTask } from "../CNoteTask";
import { VTaskStart } from "./VTaskStart";
import { TaskStateResult } from "../TaskState";

export class CTaskStart extends CNoteTask {	
	protected getTaskView() {return VTaskStart;};

	get taskStateResult(): TaskStateResult {
		return {content: '待办', isEnd: false}
	}
}
