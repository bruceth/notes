import { NoteItem, NoteModel } from '../../model';
import { VAssignView } from './VAssignView';
import { VAdd } from './VAdd';
import { CInput } from '../CInput';

export class CNoteAssign extends CInput {
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
	}

	showListItemNote(noteModel: NoteModel) {
		this.openVPage(VAssignView);
	}

	showAddNotePage(parent: number, checkType: number) {
		this.checkType = checkType;
		this.openVPage(VAdd, parent);
	}
}
