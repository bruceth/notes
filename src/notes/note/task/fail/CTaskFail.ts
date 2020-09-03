import { CNoteTask } from "../CNoteTask";
import { VTaskFail } from "./VTaskFail";
import { TaskStateResult } from "../TaskState";

export class CTaskFail extends CNoteTask {	
	showViewPage():void {this.openVPage(VTaskFail) };

	get taskStateResult(): TaskStateResult {
		return {content: '拒签', isEnd: true}
	}
}
