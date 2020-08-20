import React from "react";
import { VNoteForm } from '../item/VNoteForm';
import { CTextNoteItem } from './CTextNoteItem';
import { NoteItem } from "note/model";
import { observer } from "mobx-react";

export class VAdd extends VNoteForm<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	protected parentId: number;

	init(param?:any):void 
	{
		super.init(param);
		this.parentId = param;
	}

	content() {
		return this.renderEdit();
	}

	protected getOptions(): {val:number, text:string}[] {
		return [
			{ val: 0, text: '文字' },
			{ val: 1, text: '可勾选事项' },
			{ val: 2, text: '分段落' },
			{ val: 3, text: '目录' },
		];
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
		await this.controller.AddNote(this.parentId);
		this.closePage();
		return;
	}

	protected renderExButtons():JSX.Element {
		return React.createElement(observer(() => {
			if (this.controller.checkType === 3)
				return;
			return this.renderSendToButton();
		}));
	}

	protected renderSendToButton() {
		return <button onClick={this.onSaveAndSendNote}
			className="btn btn-outline-primary mr-3">
			发给
		</button>;
	}

	private onSaveAndSendNote = async () => {
		this.checkInputAdd();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}

}
