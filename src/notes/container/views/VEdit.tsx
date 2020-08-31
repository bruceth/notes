import React from 'react';
import { CContainer } from "../CContainer";
import { VContainerForm } from './VContainerForm';

export class VEdit extends VContainerForm<CContainer> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return '编辑目录';
	}

	content() {
		return <div className="bg-white">
			{this.renderTitleInput()}
			{this.controller.cContent.renderInput()}
		</div>;
	}

	/*
	protected getOptions(): {val:number, text:string}[] {
		return undefined;
	}

	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined && this.controller.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return this.renderDeleteButton();
	}
	*/
}
