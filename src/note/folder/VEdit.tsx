import { tv } from "tonva";
import { VNoteForm } from '../item/VNoteForm';
import { CFolderNoteItem } from "./CFolderNoteItem";

export class VEdit extends VNoteForm<CFolderNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return '编辑目录';
	}
	content() {
		return this.renderEdit();
	}

	protected getOptions(): {val:number, text:string}[] {
		return undefined;
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
