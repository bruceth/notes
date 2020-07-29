import { CNoteItem } from "../item";
import { NoteItem, NoteModel } from '../model';
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

	renderItem(noteItem: NoteItem, index:number): JSX.Element {
		let TaskView = this.getTaskView(noteItem.state as EnumTaskState);
		let v = new TaskView(this);
		v.init(noteItem);
		return v.renderListItem();
	}

	onClickItem(noteItem: NoteItem, noteModel: NoteModel) {
		let TaskView = this.getTaskView(noteItem.state as EnumTaskState);
		this.openVPage(TaskView, noteItem);
	}

	showAssignTaskPage() {
		this.openVPage(VTaskParams, {contacts: this.owner.contacts}, () => this.closePage());
	}

	async assignTask(param: AssignTaskParam) {
		let {note:noteId} = this.owner.noteItem;
		let {contacts, checker, rater, point} = param;
		let note:NoteModel = await this.uqs.notes.Note.assureBox(noteId);
		let {caption, content} = note;
		let data = {
			note: (noteId as any)?.id,
			caption,
			content,
			tos: contacts.map(v => {return {to: v.contact}}),
			checker: checker?.contact,
			rater: rater?.contact,
			point,
		}
		await this.uqs.notes.AssignTask.submit(data);
	}
}
