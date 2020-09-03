import { numberFromId } from "../../../model";
import { CNoteTask } from "../CNoteTask";
import { VTaskCheck } from "./VTaskCheck";
import { TaskStateResult, EnumTaskState } from "../TaskState";
import { TaskCheckItem } from "../model";

export class CTaskCheck extends CNoteTask {	
	showViewPage():void {this.openVPage(VTaskCheck) };
	
	get taskStateResult(): TaskStateResult {
		return {content: 'check', isEnd: false}
	}

	async CheckTask(pass: boolean) {
		await this.CheckSaveInfo();

		let { note: noteId } = this.noteItem;
		let obj = this.endContentInput();
		let content = JSON.stringify(obj);
		let data = {
			groupFolder: this.owner.currentFold.groupFolder,
			folder: this.owner.currentFold.folderId,
			note: numberFromId(noteId),
			action: pass ? 1 : 2,
			content: content
		}

		await this.uqs.notes.CheckTask.submit(data);
		this.noteItem.state = Number(pass ? EnumTaskState.Pass : EnumTaskState.Fail);
	}

	async setCheckInfo(item: TaskCheckItem, v:string) {
		if (v === undefined || v.length === 0) {
			delete item.checkInfo;
		}
		else {
			item.checkInfo = v;
		}
		await this.SaveX();
	}
}
