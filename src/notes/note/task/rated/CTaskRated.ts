import { CNoteTask } from "../CNoteTask";
import { VTaskRated } from "./VTaskRated";
import { TaskStateResult } from "../TaskState";

export class CTaskRated extends CNoteTask {	
	showViewPage():void {this.openVPage(VTaskRated) };

	get taskStateResult(): TaskStateResult {
		return {content: '已评价', isEnd: true}
	}
}
