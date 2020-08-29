import { VNoteForm } from '../views/VNoteForm';
import { CNoteAssign } from "./CNoteAssign";

export class VEdit extends VNoteForm<CNoteAssign> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return this.t('assign');
	}

	content() {
		return this.renderEdit();
	}

	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined && this.controller.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		this.checkInputAdd();
		await this.controller.SetNote(true);
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return this.renderDeleteButton();
	}
}
