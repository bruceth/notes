import React from 'react';
import { CNoteBase } from "./CNoteBase";
import { VNoteBaseForm } from './VNoteBaseForm';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

export class VNoteBaseEdit<T extends CNoteBase> extends VNoteBaseForm<T> {	
	protected parentId: number;

	init(param?:any):void 
	{
		super.init(param);
		this.parentId = param;
	}

	@computed protected get btnSaveDisabled():boolean {
		if (this.controller.isContentChanged) return false;
		if (this.changed === true) return false;
		return true;
	}

	protected renderEditBottom():JSX.Element {
		return <div className="py-2 pl-3 bg-light border-top d-flex">
			<div className="mr-auto" />
			{React.createElement(observer(() => <>
				<button onClick={() => this.onButtonSave()}
					className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
					保存
				</button>
			</>))}
			{this.renderExButtons()}
		</div>;
	}

	protected async onButtonSave(): Promise<void> {
		//this.controller.cContent.checkHaveNewItem?.();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {return}
}

export class VNoteBaseEditPage extends VNoteBaseEdit<CNoteBase> {
}
