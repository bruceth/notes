import { CContainer } from "../CContainer";
import { VSpaceDir } from "./VSpaceDir";
import { VSpace } from "./VSpace";
import { renderIcon } from "../../noteBase";
import { EnumNoteType } from "notes/model";
import { VSpaceView } from "./VSpaceView";
import { VSpaceEdit } from "./VSpaceEdit";

export class CSpace extends CContainer {
	get type():EnumNoteType { return EnumNoteType.groupFolder }
	showFolder() {
		this.load();
		this.openVPage(VSpace);
	}

	renderIcon(): JSX.Element {
		return renderIcon('users', 'text-warning');
	}
	renderDirItem():JSX.Element {
		let item = new VSpaceDir(this);
		return item.render();
	}
	showAddPage() {}
	showEditPage() {
		this.openVPage(VSpaceEdit);
	}

	showFolderViewPage() {
		this.openVPage(VSpaceView as any);
	}

	protected endContentInput():any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		this.cContent.endInput(obj);
		return obj;
	}
}
