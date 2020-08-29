import { CNoteTask } from "../CNoteTask";
import { VTaskPass } from "./VTaskPass";
import { TaskStateResult } from "../TaskState";

export class CTaskPass extends CNoteTask {	
	protected getTaskView() {return VTaskPass };

	get taskStateResult(): TaskStateResult {
		return {content: '签收', isEnd: true}
	}
}
