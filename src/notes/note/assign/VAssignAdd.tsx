import { CNoteAssign } from './CNoteAssign';
import { VNoteBaseAdd } from 'notes/noteBase';

export class VAssignAdd extends VNoteBaseAdd<CNoteAssign> {
	header() {
		return this.t('assign');
	}

	protected onSaveAndSendNote = async () => {
		this.controller.cContent.checkHaveNewItem?.();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
