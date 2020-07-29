import { CNoteItem } from "../item";
import { NoteItem, NoteModel } from '../model';
import { VView } from './VView';
import { VAdd } from './VAdd';
import { VTextNoteItem } from './VTextNoteItem';

export class CTextNoteItem extends CNoteItem {
	renderItem(noteItem: NoteItem, index:number): JSX.Element {
		let vNoteItem = new VTextNoteItem(this);
		vNoteItem.init(noteItem);
		return vNoteItem.render();
	}

	onClickItem(noteItem: NoteItem, noteModel: NoteModel) {
		this.openVPage(VView, noteItem);
	}

	showAddNotePage() {
		this.openVPage(VAdd);
	}
}