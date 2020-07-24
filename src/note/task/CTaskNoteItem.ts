import { CNoteItem } from "../item";
import { NoteItem, NoteModel } from '../model';
import { VView } from './VView';
import { VTaskNoteItem } from "./VTaskNoteItem";
import { VTaskParams } from "./VTaskParams";
import { Contact } from "model";

export interface AssignTaskParam {
	contacts: Contact[];
	checker: Contact;
	rater: Contact;
	point?: number;
}

export class CTaskNoteItem extends CNoteItem {
	renderItem(noteItem: NoteItem, index:number): JSX.Element {
		let v = new VTaskNoteItem(this);
		v.init(noteItem);
		return v.render();
	}

	onClickItem(noteItem: NoteItem) {
		this.openVPage(VView, noteItem);
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
