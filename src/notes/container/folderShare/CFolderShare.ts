import { CFolderDisableItemFrom } from "../CFolder";
import { renderIcon } from "../../noteBase";

export class CFolderShare extends CFolderDisableItemFrom {
	renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
	showAddPage() {}
	showEditPage() {}
}
