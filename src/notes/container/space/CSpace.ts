import { CContainer } from "../CContainer";
import { VSpaceItem } from "./VSpaceItem";
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
	renderListItem():JSX.Element {
		let item = new VSpaceItem(this);
		return item.render();
	}
	showAddPage() {}
	showEditPage() {}
}
