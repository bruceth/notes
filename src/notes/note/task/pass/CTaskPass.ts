import { CNoteTask } from "../CNoteTask";
import { VTaskPass } from "./VTaskPass";
import { TaskStateResult } from "../TaskState";

export class CTaskPass extends CNoteTask {	
	showViewPage():void {this.openVPage(VTaskPass) };
	renderDirItem(index: number): JSX.Element {
		return this.renderViewForTaskDir(VTaskPass);
	}

	get taskStateResult(): TaskStateResult {
		return {content: '签收', isEnd: true}
	}
}
