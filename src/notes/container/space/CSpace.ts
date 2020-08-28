import { CContainer } from "../CContainer";
import { VSpaceItem } from "./VSpaceItem";
import { VSpaceView } from "./VSpaceView";

export class CSpace extends CContainer {
	// protected setDisableFrom(cNoteBase: CNoteBase) {cNoteBase.disableFrom = false;}

	renderItem(index: number): JSX.Element {
		let vNoteItem = new VSpaceItem(this);
		return vNoteItem.render();
	}

	showFolder() {
		this.load();
		this.openVPage(VSpaceView);
	}
}
