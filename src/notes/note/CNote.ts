import { CNoteBase } from "../noteBase";
import { NoteItem } from "notes/model";

export abstract class CNote extends CNoteBase {
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.caption) this.caption = param.caption;
		}
	}
}
