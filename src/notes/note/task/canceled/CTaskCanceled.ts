import { CNoteTask } from "../CNoteTask";
import { VTaskCanceled } from "./VTaskCanceled";
import { TaskStateResult } from "../TaskState";

export class CTaskCanceled extends CNoteTask {	
	protected getTaskView() {return VTaskCanceled };

	get taskStateResult(): TaskStateResult {
		return {content: '已取消', isEnd: false}
	}
}
