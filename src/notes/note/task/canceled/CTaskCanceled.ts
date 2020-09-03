import { CNoteTask } from "../CNoteTask";
import { VTaskCanceled } from "./VTaskCanceled";
import { TaskStateResult } from "../TaskState";

export class CTaskCanceled extends CNoteTask {	
	//protected getTaskView() {return VTaskCanceled };
	renderDirItem(index: number): JSX.Element {
		return this.renderViewForTaskDir(VTaskCanceled);
	}
	showViewPage():void {this.openVPage(VTaskCanceled);}

	get taskStateResult(): TaskStateResult {
		return {content: '已取消', isEnd: false}
	}
}
