import { NoteItem, EnumNoteType } from '../../model';
import { CNotes } from '../../CNotes';
import { VTextView } from './VTextView';
import { VAdd } from './VAdd';
import { renderIcon, VNoteBase } from '../../noteBase';
import { VTextItem } from './VTextItem';
import { CNote } from '../CNote';
import { EnumContentType, createCContentFromType } from '../../components';
import { VEdit } from './VEdit';

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

export class CNoteText extends CNote {
	get type():EnumNoteType { return EnumNoteType.text }
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
	}

	protected renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
	}

	protected newVNoteItem():VNoteBase<any> {return new VTextItem(this);}

	showNoteView() {
		this.openVPage(VTextView);
	}

	showAddPage(parent: number, contentType: EnumContentType) {
		//this.checkType = checkType;
		this.cContent = createCContentFromType(contentType);
		this.openVPage(VAdd, parent);
	}

	showEditPage() {
		this.openVPage(VEdit);
	}
}
