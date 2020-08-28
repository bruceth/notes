import { CContainer } from "./CContainer";
import { NoteItem } from "../model";
import { CNoteBase } from "../noteBase";

export abstract class CFolder extends CContainer {
}

export abstract class CFolderDisableItemFrom extends CFolder {
	protected getItemConverter() {
		return (item:NoteItem, queryResults:{[name:string]:any[]}):CNoteBase => {
			let ret = this.owner.noteItemConverter(item, queryResults);
			ret.disableFrom = true;
			return ret;
		}
	}
}