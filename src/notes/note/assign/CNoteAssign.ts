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

	showAddAssignPage(parent: number) {
		this.checkType = 1;
		this.openVPage(VAdd, parent);
	}
}
