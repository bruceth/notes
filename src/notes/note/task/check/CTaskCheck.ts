import { CNoteTask } from "../CNoteTask";
import { VTaskCheck } from "./VTaskCheck";
import { TaskStateResult } from "../TaskState";

export class CTaskCheck extends CNoteTask {	
	protected getTaskView() {return VTaskCheck };
	
	get taskStateResult(): TaskStateResult {
		return {content: 'check', isEnd: false}
	}
}
