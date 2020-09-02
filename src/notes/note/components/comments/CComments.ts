import { Controller } from "tonva";
import { NoteModel } from "../../../model";
import { VCommentsList } from "./VCommentsList";
import { VAddComment } from "./VAddComment";
import { CNote } from "notes/note/CNote";
import { VWriteComment } from "./VWriteComment";

/*
interface CommentsOptions {
	onAddComment: (comment:string) => Promise<void>;
	onDeleteComment: (comentId:number) => Promise<void>;
}
*/
export class CComments extends Controller {
	private cNote: CNote;
	//private param: CommentsOptions;
	noteModel: NoteModel;

	protected async internalStart() {}

	init(cNote: CNote) {
		this.cNote = cNote;
		this.noteModel = cNote.noteModel;
		//this.param = param;
	}

	renderCommentsList():JSX.Element { return this.renderView(VCommentsList); }
	
	showAddCommentPage() {
		this.openVPage(VAddComment);
	}

	async onAddComment(comment:string) {
		await this.cNote.addComment(comment);
		//this.controller.relativeKey = 'comment';
	}

	renderWriteComment():JSX.Element {
		return this.renderView(VWriteComment);
	}

	renderCommentButton():JSX.Element {
		let vWriteComment = new VWriteComment(this);
		return vWriteComment.renderButton();
	}
}
