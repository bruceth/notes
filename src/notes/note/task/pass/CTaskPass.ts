import { CNoteTask } from "../CNoteTask";
import { VTaskPass } from "./VTaskPass";
import { TaskStateResult } from "../TaskState";

export class CTaskPass extends CNoteTask {	
	showViewPage():void {this.openVPage(VTaskPass) };

	get taskStateResult(): TaskStateResult {
		return {content: '签收', isEnd: true}
	}
}
