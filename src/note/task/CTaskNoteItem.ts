import { CNoteItem, CheckItem } from "../item";
import { NoteItem, NoteModel, numberFromId } from '../model';
import { VTaskParams } from "./VTaskParams";
import { Contact } from "model";
import { TaskViewFactory, VCheckTask, VRateTask } from "./state";
import { observable } from "mobx";
import { EnumTaskState } from "./TaskState"

export interface AssignTaskParam {
	contacts: Contact[];
	checker: Contact;
	rater: Contact;
	point?: number;
}

export interface TaskCheckItem extends CheckItem {
	checkInfo?: string;
	rateInfo?: string;
}

export class CTaskNoteItem extends CNoteItem {
	private getTaskView = new TaskViewFactory().getView;

	@observable checkInfo: string;
	@observable rateInfo: string;

	protected checkInfoInput: string;
	protected rateInfoInput: string;
	protected rateValue: number;
	protected rateValueInput: number;

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

		return this.getTaskView(state);
	}

	renderItem(index: number): JSX.Element {
		let TaskView = this.getTaskView(this.noteItem.state as EnumTaskState);
		let v = new TaskView(this);
		return v.renderListItem();
	}

	renderBaseItem(index: number): JSX.Element {
		return super.renderItem(index);
	}

	onClickItem(noteModel: NoteModel) {
		let TaskView = this.getView();
		this.openVPage(TaskView);
	}

	showAssignTaskPage() {
		this.openVPage(VTaskParams, { contacts: this.owner.contacts }, () => this.closePage());
	}

	async assignTask(param: AssignTaskParam) {
		let { note: noteId } = this.noteItem;
		let { contacts, checker, rater, point } = param;
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
		let data = {
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
		let { note: noteId } = this.noteItem;
		let note: NoteModel = await this.uqs.notes.Note.assureBox(noteId);
		let { content } = note;
		let data = {
			note: numberFromId(noteId),
			content: content
		}

		let ret = await this.uqs.notes.DoneTask.submit(data);
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
			note: numberFromId(noteId),
			action: pass ? 1 : 2,
			content: content
		}

		let ret = await this.uqs.notes.CheckTask.submit(data);
		this.noteItem.state = Number(pass ? EnumTaskState.Pass : EnumTaskState.Fail);
	}

	async RateTask(value: number) {
		this.rateValueInput = value;
		await this.CheckSaveInfo();

		let { note: noteId } = this.noteItem;
		let content = this.stringifyContent();
		let data = {
			note: numberFromId(noteId),
			value: value,
			content: content
		}

		let ret = await this.uqs.notes.RateTask.submit(data);
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
