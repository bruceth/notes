import React from 'react';
import { observer } from 'mobx-react';
import { CNoteBase } from "./CNoteBase";
import { VNoteBaseEdit } from './VNoteBaseEdit';

export class VNoteBaseAdd<T extends CNoteBase> extends VNoteBaseEdit<T> {	
	protected parentId: number;

	init(param?:any):void 
	{
		super.init(param);
		this.parentId = param;
	}

	protected async onButtonSave(): Promise<void> {
		this.controller.cContent.checkHaveNewItem?.();
		await this.controller.AddNote(this.parentId);
		this.closePage();
		return;
	}

	protected renderExButtons():JSX.Element {
		return React.createElement(observer(() => {
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
		this.controller.cContent.checkHaveNewItem?.();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}

export class VNoteBaseAddPage extends VNoteBaseAdd<CNoteBase> {
}
