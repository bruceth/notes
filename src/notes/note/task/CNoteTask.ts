import { observable } from "mobx";
import { NoteItem, numberFromId, EnumNoteType } from '../../model';
import { renderIcon } from '../../noteBase';
import { VTaskParams } from "./VTaskParams";
import { TaskStateResult } from "./TaskState"
import { AssignTaskParam } from "./model";
import { CNote } from "../CNote";
import { CTaskItem } from "../../components/content/taskitem/CTaskItem";

export abstract class CNoteTask extends CNote {
	get type():EnumNoteType { return EnumNoteType.task }
	//private getTaskView = new TaskViewFactory().getView;

	cContent: CTaskItem;

	@observable checkInfo: string;
	@observable rateInfo: string;

	protected checker: number;
	protected rater: number;
	protected checkInfoInput: string;
	protected rateInfoInput: string;
	protected rateValue: number;
	protected rateValueInput: number;
	hours: number;
	point: number;

	init(param: NoteItem):void {
		super.init(param);
		this.cContent = new CTaskItem(this.res);
		if (!param) {
			this.cContent.init(undefined);
			return;
		}
		let {obj} = param;
		if (obj) {
			this.cContent.init(obj);
			this.checkInfo = obj.checkInfo;
			this.checkInfoInput = this.checkInfo;
			this.rateInfo = obj.rateInfo;
			this.rateInfoInput = this.rateInfo;
			this.rateValue = obj.rateValue;
			this.rateValueInput = this.rateValue;
			this.checker = obj.checker;
			this.rater = obj.rater;
			this.hours = obj.hours;
			this.point = obj.point;
		}
	}

	protected endContentInput():any {
		let obj = super.endContentInput();
		if (this.checkInfo) {
			obj.checkInfo = this.checkInfo;
		}
		else {
			delete obj.checkInfo;
		}
		if (this.rateInfo) {
			obj.rateInfo = this.rateInfo;
		}
		else {
			delete obj.rateInfo;
		}
		if (this.rateValue !== undefined) {
			obj.rateValue = this.rateValue;
		}
		else {
			delete obj.rateValue;
		}
		if (this.checker !== undefined) {
			obj.checker = this.checker;
		}
		if (this.rater !== undefined) {
			obj.rater = this.rater;
		}
		obj.hours = this.hours;
		obj.point = this.point;
		this.cContent.endInput(obj);
		return obj;
	}

	updateCheckInfo(v:string) {
		this.checkInfoInput = v;
	}

	updateRateInfo(v:string) {
		this.rateInfoInput = v;
	}
/*
	convertObj(item: NoteItem): NoteItem {
		let content = item.flowContent;
		if (!content) {
			content = item.content;
		}
		if (content) {
			item.obj = JSON.parse(content);
		}
		return item;
	}
*/
	//protected abstract getTaskView():(new (controller: any) => VTaskView<any>);
	abstract get taskStateResult(): TaskStateResult;

	showAddPage() {/*CNoteTask no need to Add*/}
	showEditPage() {/*CNoteTask no need to Edit*/}
/*
	private getView() {
		let state = this.noteItem.state as EnumTaskState;
		// eslint-disable-next-line
		if (state == EnumTaskState.Done) {
			if (this.noteItem.obj && this.isMe(this.noteItem.obj.checker)) {
				return VCheckTask;
			}
		}
		// eslint-disable-next-line
		else if (state == EnumTaskState.Pass) {
			if (this.noteItem.obj && this.isMe(this.noteItem.obj.rater)) {
				return VRateTask;
			}
		}

		return getTaskView(state);
	}
*/
	renderIcon(): JSX.Element {
		return renderIcon('tasks', 'text-success');
	}

	/*
	protected newVNoteItem():VNoteBase<any> {
		let TaskView = this.getTaskView(); //this.noteItem.state as EnumTaskState);
		return new TaskView(this);
	}
	*/

	abstract renderDirItem(index: number): JSX.Element;

	//abstract showViewPage():void;
	/* {
		let TaskView = this.getTaskView(); // this.getView();
		this.openVPage(TaskView);
	} */

	showAssignTaskPage() {
		this.openVPage(VTaskParams, { contacts: this.owner.contacts }, () => this.closePage());
	}

	async assignTask(param: AssignTaskParam) {
		let { note: noteId } = this.noteItem;
		let { contacts, checker, rater, point, hours } = param;
		let { caption, content } = this.noteItem;
		let cObj = JSON.parse(content);
		if (checker) {
			cObj.checker = numberFromId(checker.contact);
		}
		else {
			delete cObj.checker;
		}
		if (rater) {
			cObj.rater = numberFromId(rater.contact);
		}
		else {
			delete cObj.rater;
		}
		cObj.hours = hours;
		cObj.point = point;
		let data = {
			groupFolder: this.owner.currentFold.groupFolder,
			folder: this.owner.currentFold.folderId,
			note: numberFromId(noteId),
			caption,
			content: JSON.stringify(cObj),
			tos: contacts.map(v => { return { to: v.contact } }),
			checker: checker?.contact,
			rater: rater?.contact,
			point,
		}
		await this.uqs.notes.AssignTask.submit(data);
	}

	async checkSaveInfo() {
		let change = false;
		if (this.rateInfo !== this.rateInfoInput) {
			this.rateInfo = this.rateInfoInput;
			change = true;
		}
		if (this.checkInfo !== this.checkInfoInput) {
			this.checkInfo = this.checkInfoInput;
			change = true;
		}
		if (this.rateValue !== this.rateValueInput) {
			this.rateValue = this.rateValueInput;
			change = true;
		}

		if (change) {
			await this.saveX();
		}
	}

	protected async saveX() {
		let { note: noteId } = this.noteItem;
		let obj = this.endContentInput();
		let flowContent = JSON.stringify(obj);
		let param = { note: noteId, content: flowContent };
		await this.uqs.notes.SetNoteX.submit(param, false);
	}
}
