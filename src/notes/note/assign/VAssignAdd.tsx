import React from "react";
import { VAssignEdit } from './VAssignEdit';

export class VAssignAdd extends VAssignEdit {
	protected async onButtonSave(): Promise<void> {
		await this.controller.AddNote();
		this.closePage();
		return;
	}

	protected renderExButtons():JSX.Element {
		return;
		// 	return this.renderShareButton();
	}

	protected renderShareButton() {
		return <button onClick={this.onSaveAndSendNote}
			className="btn btn-outline-primary mr-3">
			发给
		</button>;
	}
	protected onSaveAndSendNote = async () => {
		let cnewNote = await this.controller.AddNote();
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
