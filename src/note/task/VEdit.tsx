import { tv } from "tonva";
import { VNoteForm } from '../item/VNoteForm';
import { CTaskNoteItem } from "./CTaskNoteItem";

export class VEdit extends VNoteForm<CTaskNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		let {note, caption} = this.controller.noteItem;
		//return tv(note, (values) => {
			//let {caption, content} = values;
			//if (!this.controller.title) this.controller.title = caption;
			//this.parseContent(content);
			return this.renderEdit();
		//});
	}

	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined && this.controller.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		await this.controller.SetNote(true);
		this.closePage();
	}
}
