import { CContainer } from "../CContainer";
import { VSpaceItem } from "./VSpaceItem";
import { VSpaceView } from "./VSpaceView";
import { renderIcon, VNoteBase } from "../../noteBase";
import { EnumNoteType } from "notes/model";

export class CSpace extends CContainer {
	get type():EnumNoteType { return EnumNoteType.groupFolder }
	// protected setDisableFrom(cNoteBase: CNoteBase) {cNoteBase.disableFrom = false;}

	/*
	renderListItem(index: number): JSX.Element {
		let vNoteItem = new VSpaceItem(this);
		return vNoteItem.render();
	}
	*/
	protected newVNoteItem():VNoteBase<any> {return new VSpaceItem(this);}

	showFolder() {
		this.load();
		this.openVPage(VSpaceView);
	}

	protected renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
}
