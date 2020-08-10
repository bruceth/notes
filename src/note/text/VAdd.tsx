import { VNoteForm } from '../item/VNoteForm';
import { CTextNoteItem } from './CTextNoteItem';

export class VAdd extends VNoteForm<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	content() {
		return this.renderEdit();
	}

	protected getSaveDisabled():boolean {
		if (this.controller.title !== undefined) {
			return this.controller.title.length === 0;
		}
		if (this.controller.changedNoteContent !== undefined) {
			return this.controller.changedNoteContent.length === 0;
		}
		return true;
    }

	protected async onButtonSave(): Promise<void> {
		await this.controller.AddNote();
		this.closePage();
		return;
	}
}
