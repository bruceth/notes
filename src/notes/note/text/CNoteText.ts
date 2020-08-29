import { NoteItem } from '../../model';
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

	protected renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
	}

	protected newVNoteItem():VNoteBaseItem<any> {return new VTextItem(this);}

	showListItemNote() {
		this.openVPage(VTextView);
	}

	showAddNotePage(parent: number, checkType: number) {
		this.checkType = checkType;
		this.openVPage(VAdd, parent);
	}
}
