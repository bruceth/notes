import { VNoteForm } from '../item/VNoteForm';
import { CTextNoteItem } from './CTextNoteItem';

export class VAdd extends VNoteForm<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事';}
	content() {
		return this.renderEdit();
	}

	protected getSaveDisabled():boolean {
		if (this.title !== undefined) {
			return this.title.length === 0;
		}
		if (this.changedNoteContent !== undefined) {
			return this.changedNoteContent.length === 0;
		}
		return true;
    }

	protected async onButtonSave(): Promise<void> {
		let noteContent = this.stringifyContent();
		await this.controller.owner.addNote(this.title, noteContent)
		this.closePage();
		return;
	}
}
