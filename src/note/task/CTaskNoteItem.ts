import { CNoteItem } from "../item";
import { NoteItem, NoteModel, numberFromId } from '../model';
import { VTaskParams } from "./VTaskParams";
import { Contact } from "model";
import { TaskViewFactory } from "./state";

export interface AssignTaskParam {
	contacts: Contact[];
	checker: Contact;
	rater: Contact;
	point?: number;
}

export enum EnumTaskState {Start=0, Done=1, Pass=2, Fail=3, Rated=4, Canceled=5};

export class CTaskNoteItem extends CNoteItem {
	private getTaskView = new TaskViewFactory().getView;

	renderItem(index:number): JSX.Element {
		let TaskView = this.getTaskView(this.noteItem.state as EnumTaskState);
		let v = new TaskView(this);
		return v.renderListItem();
	}

	onClickItem(noteModel: NoteModel) {
		let TaskView = this.getTaskView(this.noteItem.state as EnumTaskState);
		this.openVPage(TaskView);
	}

	// convert 可以在不同的继承中被重载
	// task 里面是把content parse 成json，放到obj里面	
	convert(noteItem: NoteItem): NoteItem {
		noteItem.obj = JSON.parse(noteItem.content);
		return noteItem;
	}

	showAssignTaskPage() {
		this.openVPage(VTaskParams, {contacts: this.owner.contacts}, () => this.closePage());
	}

	async assignTask(param: AssignTaskParam) {
		let {note:noteId} = this.noteItem;
		let {contacts, checker, rater, point} = param;
		let note:NoteModel = await this.uqs.notes.Note.assureBox(noteId);
		let {caption, content} = note;
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
			tos: contacts.map(v => {return {to: v.contact}}),
			checker: checker?.contact,
			rater: rater?.contact,
			point,
		}
		await this.uqs.notes.AssignTask.submit(data);
	}

	async DoneTask() {
		let {note:noteId} = this.noteItem;
		let note:NoteModel = await this.uqs.notes.Note.assureBox(noteId);
		let {content} = note;
		let data = {
			note: numberFromId(noteId),
			content: content
		}

		let ret = await this.uqs.notes.DoneTask.submit(data);
	}
}
