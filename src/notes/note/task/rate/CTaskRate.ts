import { CNoteTask } from "../CNoteTask";
import { VTaskRate } from "./VRateTask";
import { TaskStateResult } from "../TaskState";

export class CTaskRate extends CNoteTask {	
	protected getTaskView() {return VTaskRate };

	get taskStateResult(): TaskStateResult {
		return {content: 'rate', isEnd: true}
	}
}
