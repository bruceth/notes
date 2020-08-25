import React from "react";
import { VNoteForm } from './VNoteForm';
import { CNoteItem } from './CNoteItem';
import { observer } from "mobx-react";

export class VAddNoteBase<T extends CNoteItem> extends VNoteForm<T> {
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
			{ val: 2, text: '列表' },
			{ val: 1, text: '勾选事项' },
			{ val: 3, text: '小单夹' },
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
		this.checkInputAdd();
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

	protected onSaveAndSendNote = async () => {
		this.checkInputAdd();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}

}
