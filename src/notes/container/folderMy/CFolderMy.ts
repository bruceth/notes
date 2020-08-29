import { CFolderDisableItemFrom } from "../CFolder";
import { renderIcon } from "../../noteBase";

// 小单夹
export class CFolderMy extends CFolderDisableItemFrom {
	protected renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
	}
}
