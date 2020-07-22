import { tv } from "tonva";
import { VNoteForm } from './VNoteForm';

export class VEdit extends VNoteForm {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		let {note} = this.param;
		return tv(note, (values) => {
			let {caption, content} = values;
			if (!this.title) this.title = caption;
			this.parseContent(content);
			return this.renderEdit();
		});
	}

	protected getSaveDisabled():boolean {
		return (this.title === undefined && this.noteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		let noteContent = this.stringifyContent();
		await this.controller.owner.setNote(true,
			this.param,
			this.title, 
			noteContent);
		this.closePage();
	}
}
