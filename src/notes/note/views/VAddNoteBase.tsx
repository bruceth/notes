import React from "react";
import { VNoteForm } from './VNoteForm';
import { CNote } from '../CNote';
import { observer } from "mobx-react";

export class VAddNoteBase<T extends CNote> extends VNoteForm<T> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	protected parentId: number;

	init(param?:any):void 
	{
		super.init(param);
		this.parentId = param;
	}

	protected getSaveDisabled():boolean {
		if (this.controller.title !== undefined) {
			return this.controller.title.length === 0;
		}
		/*if (this.controller.changedNoteContent !== undefined) {
			return this.controller.changedNoteContent.length === 0;
		}*/
		return true;
    }

	protected async onButtonSave(): Promise<void> {
		//this.checkInputAdd();
		//let type =  this.controller.checkType === EnumCheckType.folder ? EnumNoteType.folder : EnumNoteType.text;
		await this.controller.AddNote(this.parentId); //, type);
		this.closePage();
		return;
	}

	protected renderExButtons():JSX.Element {
		return React.createElement(observer(() => {
			//if (this.controller.checkType === EnumCheckType.folder)
			//	return;
			return this.renderShareButton();
		}));
	}

	protected renderShareButton() {
		return <button onClick={this.onSaveAndSendNote}
			className="btn btn-outline-primary mr-3">
			发给
		</button>;
	}

	protected onSaveAndSendNote = async () => {
		//this.checkInputAdd();
		//let type = this.controller.cContent.contentType;/ .checkType === EnumCheckType.folder ? EnumNoteType.folder : EnumNoteType.text;
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
	
}
