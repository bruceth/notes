import { NoteItem, EnumNoteType } from '../../model';
import { CNotes } from '../../CNotes';
import { VTextView } from './VTextView';
import { VTextAdd } from './VTextAdd';
import { renderIcon } from '../../noteBase';
import { VTextDir } from './VTextDir';
import { CNote } from '../CNote';
import { EnumContentType, createCContentFromType } from '../../components';
import { VTextEdit } from './VTextEdit';

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

export class CNoteText extends CNote {
	get type():EnumNoteType { return EnumNoteType.text }

	renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
	}

	protected newVDir() {return VTextDir as any;}
	protected newVView() {return VTextView as any;}
	protected newVEdit() {return VTextEdit as any;}
	protected newVAdd() {return VTextAdd as any;}

	/*
	showNoteView() {
		this.openVPage(VTextView);
	}
	*/

	/*
	showEditPage() {
		this.openVPage(VEdit);
	}
	*/
}
