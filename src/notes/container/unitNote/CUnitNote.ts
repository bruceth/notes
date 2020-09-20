import { EnumNoteType } from "notes/model";
import { renderIcon } from "notes/noteBase";
import { CContainer } from "../CContainer";
import { VUnitNoteDir } from "./VUnitNoteDir";

export class CUniteNote extends CContainer {
	get type():EnumNoteType { return EnumNoteType.unitNote }
	renderIcon(): JSX.Element {
		return renderIcon('sitemap', 'text-primary');
	}

	renderDirItem(index: number): JSX.Element {
		let vNoteItem = new VUnitNoteDir(this);
		return vNoteItem.render();
	}

	showAddPage() {
		//this.openVPage(VFolderMyAdd);
	}
	showEditPage() {
		//this.openVPage(VFolderMyEdit);
	}

	async showFolder() {
		this.load();
		//this.openVPage(VFolderMy);
	}

}