import { VAssignEdit } from './VAssignEdit';

export class VAssignAdd extends VAssignEdit {
	protected onSaveAndSendNote = async () => {
		//this.controller.cContent.checkHaveNewItem?.();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
