import { NoteItem } from '../../model';
import { VTextView } from './VTextView';
import { VAdd } from './VAdd';
import { CNote } from "../CNote";
import { renderIcon, VNoteBaseItem } from '../../noteBase';
import { VTextItem } from './VTextItem';
import { CNotes } from '../../CNotes';

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

export class CNoteText extends CNote {
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
	}

	protected renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
	}

	protected newVNoteItem():VNoteBaseItem<any> {return new VTextItem(this);}

	showListItemNote() {
		this.openVPage(VTextView);
	}

	showAddNotePage(parent: number) {
		this.openVPage(VAdd, parent);
	}
}
