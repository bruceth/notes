import { CContent } from "../CContent";
import { observable } from "mobx";

export abstract class CTextBase extends CContent {
	@observable noteContent: string;
	@observable changedNoteContent: string;

	init(obj: any): void {
		this.noteContent = obj.content;
	}

	buildObj(obj:any) {
		obj.check = this.checkType;
		obj.content = this.changedNoteContent || this.noteContent;
	}
}
