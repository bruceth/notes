import { VAssignEdit } from './VAssignEdit';

export class VAssignAdd extends VAssignEdit {
	header() {
		return this.t('assign');
	}

	protected async onButtonSave(): Promise<void> {
		this.controller.cContent.checkHaveNewItem?.();
		await this.controller.AddNote(this.parentId);
		this.closePage();
		return;
	}

	protected renderExButtons():JSX.Element {
		return;
	}

	protected onSaveAndSendNote = async () => {
		this.controller.cContent.checkHaveNewItem?.();
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
