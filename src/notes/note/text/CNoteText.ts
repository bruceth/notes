import { NoteItem } from '../../model';
import { CNotes } from '../../CNotes';
import { VTextView } from './VTextView';
import { VAdd } from './VAdd';
import { CInput } from '../CInput';
import { renderIcon, VNoteBaseView } from '../../noteBase';
import { VTextItem } from './VTextItem';

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

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

	protected newVNoteItem():VNoteBaseView<any> {return new VTextItem(this);}

	showNoteView() {
		this.openVPage(VTextView);
	}

	showAddNotePage(parent: number, checkType: number) {
		this.checkType = checkType;
		this.openVPage(VAdd, parent);
	}
}
