import { VNoteForm } from '../views/VNoteForm';
import { CNoteTask } from "./CNoteTask";

export class VEdit extends VNoteForm<CNoteTask> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
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
		return;
	}
}