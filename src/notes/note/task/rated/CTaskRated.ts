import { CNoteTask } from "../CNoteTask";
import { VTaskRated } from "./VTaskRated";
import { TaskStateResult } from "../TaskState";

export class CTaskRated extends CNoteTask {	
	protected getTaskView() {return VTaskRated };

	get taskStateResult(): TaskStateResult {
		return {content: '已评价', isEnd: true}
	}
}
