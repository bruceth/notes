import { CNoteTask } from "../CNoteTask";
import { VTaskDone } from "./VTaskDone";
import { TaskStateResult } from "../TaskState";

export class CTaskDone extends CNoteTask {	
	//protected getTaskView() {return VTaskDone };
	showViewPage():void {this.openVPage(VTaskDone);}

	get taskStateResult(): TaskStateResult {
		return {content: '已办', isEnd: true}
	}
}
