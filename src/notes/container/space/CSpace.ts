import { CContainer } from "../CContainer";
import { VSpaceDir } from "./VSpaceDir";
import { VSpaceView } from "./VSpaceView";
import { renderIcon } from "../../noteBase";
import { EnumNoteType } from "notes/model";

export class CSpace extends CContainer {
	get type():EnumNoteType { return EnumNoteType.groupFolder }
	showFolder() {
		this.load();
		this.openVPage(VSpaceView);
	}

	renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
	renderDirItem():JSX.Element {
		let item = new VSpaceDir(this);
		return item.render();
	}
	showAddPage() {}
	showEditPage() {}
}
