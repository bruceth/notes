import { CFolderNoteItem } from "../folder";
import { VGroupFolderItem } from "./VGroupFolderItem";
import { VGroupFolder } from "./VGroupFolder";

export class CGroupFolderItem extends CFolderNoteItem {
	protected getItemConverter() {
		return this.owner.noteItemConverter;
	}

	renderItem(index: number): JSX.Element {
		let vNoteItem = new VGroupFolderItem(this);
		return vNoteItem.render();
	}

	showFolder() {
		this.load();
		this.openVPage(VGroupFolder);
	}
}
