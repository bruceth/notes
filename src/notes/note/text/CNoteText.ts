import { NoteItem, NoteModel } from '../../model';
import { VTextView } from './VTextView';
import { VAdd } from './VAdd';
import { CInput } from '../CInput';

export class CNoteText extends CInput {
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

	showListItemNote(noteModel: NoteModel) {
		this.openVPage(VTextView);
	}

	showAddNotePage(parent: number, checkType: number) {
		this.checkType = checkType;
		this.openVPage(VAdd, parent);
	}
}
