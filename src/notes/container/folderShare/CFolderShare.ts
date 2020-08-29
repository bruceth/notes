import { CFolderDisableItemFrom } from "../CFolder";
import { renderIcon } from "../../noteBase";

export class CFolderShare extends CFolderDisableItemFrom {
	protected renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
}
