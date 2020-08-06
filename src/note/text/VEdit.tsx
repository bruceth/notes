import { tv } from "tonva";
import { VNoteForm } from '../item/VNoteForm';
import { CTextNoteItem } from "./CTextNoteItem";

export class VEdit extends VNoteForm<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		let {note, caption, content} = this.param;
		//return tv(note, (values) => {
			//let {caption, content} = values;
			if (!this.title) this.title = caption;
			//this.parseContent(content);
			return this.renderEdit();
		//});
	}

	protected getSaveDisabled():boolean {
		return (this.title === undefined && this.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		let noteContent = this.stringifyContent();
		await this.controller.owner.setNote(true,
			this.param,
			this.title, 
			noteContent,
			this.buildObj());
		this.closePage();
	}
}
