import { VNoteForm } from '../views/VNoteForm';
import { CNoteText } from "./CNoteText";

export class VEdit extends VNoteForm<CNoteText> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return this.controller.checkType === 1 ? this.t('taskList') : this.t('notes')
	}

	content() {
		return this.renderEdit();
	}

	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined && this.controller.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		this.checkInputAdd();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return this.renderDeleteButton();
	}
}
