import { CFolderDisableItemFrom } from "../CFolder";
import { renderIcon } from "../../noteBase";
import { VFolderShare } from "./VFolderShare";

export class CFolderShare extends CFolderDisableItemFrom {
	renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
	showAddPage() {}
	showEditPage() {}

	showFolder(): void {
		this.load();
		this.openVPage(VFolderShare);
	}
}
