import { observable } from "mobx";
import { Contact } from "../../../model";
import { NoteItem, numberFromId, CheckItem, EnumNoteType } from '../../model';
import { renderIcon, VNoteBase } from '../../noteBase';
import { CNote } from "../CNote";
import { VTaskParams } from "./VTaskParams";
import { EnumTaskState, TaskStateResult } from "./TaskState"
import { VTaskView } from './VTaskView';

export interface AssignTaskParam {
	contacts: Contact[];
	checker: Contact;
	rater: Contact;
	point?: number;
	hours?: number;
}

export interface TaskCheckItem extends CheckItem {
	checkInfo?: string;
	rateInfo?: string;
}

export abstract class CNoteTask extends CNote {
	get type():EnumNoteType { return EnumNoteType.task }
	//private getTaskView = new TaskViewFactory().getView;

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
		if (!param)
			return;
		let {obj} = param;
		if (obj) {
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

	protected buildObj():any {
		let obj = super.buildObj();
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

		return obj;
	}

	updateCheckInfo(v:string) {
		this.checkInfoInput = v;
	}

	updateRateInfo(v:string) {
		this.rateInfoInput = v;
	}

	convertObj(item: NoteItem): NoteItem {
		let content = item.flowContent;
		if (!content) {
			content = item.content;
		}
		item.obj = this.parseContent(content);
		return item;
	}

	protected abstract getTaskView():(new (controller: any) => VTaskView<any>);
	abstract get taskStateResult(): TaskStateResult;
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
	protected renderIcon(): JSX.Element {
		return renderIcon('tasks', 'text-success');
	}

	protected newVNoteItem():VNoteBase<any> {
		let TaskView = this.getTaskView(); //this.noteItem.state as EnumTaskState);
		return new TaskView(this);
	}
	/*
	renderListItem(index: number): JSX.Element {
		let TaskView = this.getTaskView(); //this.noteItem.state as EnumTaskState);
		let v = new TaskView(this);
		return v.renderListItem();
	}
	*/

	renderBaseItem(index: number): JSX.Element {
		return super.renderListItem(index);
	}

	showNoteView() {
		let TaskView = this.getTaskView(); // this.getView();
		this.openVPage(TaskView);
	}

	showAssignTaskPage() {
		this.openVPage(VTaskParams, { contacts: this.owner.contacts }, () => this.closePage());
	}

	async assignTask(param: AssignTaskParam) {
		let { note: noteId } = this.noteItem;
		let { contacts, checker, rater, point, hours } = param;
		//let note: NoteModel = await this.uqs.notes.Note.assureBox(noteId);
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

	async DoneTask() {
		let { note: noteId, caption } = this.noteItem;
		let content = this.stringifyContent();
		let data = {
			groupFolder: this.owner.currentFold.groupFolder,
			folder: this.owner.currentFold.folderId,
			note: numberFromId(noteId),
			content: content,
			caption: caption,
			hours: this.hours
		}

		await this.uqs.notes.DoneTask.submit(data);
		this.noteItem.state = Number(EnumTaskState.Done);
		this.noteItem.$update = new Date();
	}

	async CheckSaveInfo() {
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
			await this.SaveX();
		}
	}

	async CheckTask(pass: boolean) {
		await this.CheckSaveInfo();

		let { note: noteId } = this.noteItem;
		let content = this.stringifyContent();
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

	async RateTask(value: number) {
		this.rateValueInput = value;
		await this.CheckSaveInfo();

		let { note: noteId } = this.noteItem;
		let content = this.stringifyContent();
		let data = {
			groupFolder: this.owner.currentFold.groupFolder,
			folder: this.owner.currentFold.folderId,
			note: numberFromId(noteId),
			value: value,
			content: content
		}

		await this.uqs.notes.RateTask.submit(data);
		this.noteItem.state = Number(EnumTaskState.Rated);
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

	async setRateInfo(item: TaskCheckItem, v:string) {
		if (v === undefined || v.length === 0) {
			delete item.rateInfo;
		}
		else {
			item.rateInfo = v;
		}
		await this.SaveX();
	}

	protected async SaveX() {
		let { note: noteId } = this.noteItem;
		let flowContent = this.stringifyContent();
		let param = { note: noteId, content: flowContent };
		await this.uqs.notes.SetNoteX.submit(param, false);
	}
}
