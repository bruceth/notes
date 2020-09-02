import { CContent } from "../CContent";
import { observable } from "mobx";

export abstract class CTextBase extends CContent {
	@observable noteContent: string;
	@observable changedNoteContent: string;

	init(content: string|any): void {
		switch (typeof content) {
			default: break;				// Add状态，没有初始值
			case 'undefined': break;
			case "string": this.noteContent = content.trim(); break;
			case "object": this.noteContent = content.content?.trim(); break;
		}
	}

	protected buildObj(obj:any) {
		obj.check = this.contentType;
		obj.content = this.changedNoteContent || this.noteContent;
	}
}
