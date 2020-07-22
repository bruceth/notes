import { CNoteItem } from "../item";
import { NoteItem } from '../model';
import { VView } from './VView';
import { VTaskNoteItem } from "./VTaskNoteItem";
import { Contact } from "model";

export class CTaskNoteItem extends CNoteItem {
	renderItem(noteItem: NoteItem, index:number): JSX.Element {
		let v = new VTaskNoteItem(this);
		v.init(noteItem);
		return v.render();
	}

	onClickItem(noteItem: NoteItem) {
		this.openVPage(VView, noteItem);
	}

	assignTask(noteItem: NoteItem, contacts: Contact[]) {
		alert('assign task');
	}
}
