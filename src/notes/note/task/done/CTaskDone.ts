import { CNoteTask } from "../CNoteTask";
import { VTaskDone } from "./VTaskDone";
import { TaskStateResult } from "../TaskState";

export class CTaskDone extends CNoteTask {	
	protected getTaskView() {return VTaskDone };

	get taskStateResult(): TaskStateResult {
		return {content: '已办', isEnd: true}
	}
}
