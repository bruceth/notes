import { CNoteItem } from "../item";
import { NoteItem, NoteModel } from '../model';
import { VView } from './VView';
import { VAdd } from './VAdd';
//import { VTextNoteItem } from './VTextNoteItem';

export class CTextNoteItem extends CNoteItem {
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
	}

	// renderItem(index:number): JSX.Element {
	// 	let vNoteItem = new VTextNoteItem(this);
	// 	return vNoteItem.render();
	// }

	onClickItem(noteModel: NoteModel) {
		this.openVPage(VView);
	}

	showAddNotePage() {
		this.openVPage(VAdd);
	}
}
