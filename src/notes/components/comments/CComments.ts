import { Controller } from "tonva";
import { NoteModel } from "../../model";
import { VCommentsList } from "./VCommentsList";
import { VAddComment } from "./VAddComment";

interface CommentsOptions {
	onAddComment: (comment:string) => Promise<void>;
	onDeleteComment: (comentId:number) => Promise<void>;
}

export class CComments extends Controller {
	private param: CommentsOptions;
	noteModel: NoteModel;

	protected async internalStart() {}

	init(noteModel: NoteModel, param: CommentsOptions) {
		this.noteModel = noteModel;
		this.param = param;
	}

	renderCommentsList():JSX.Element { return this.renderView(VCommentsList); }
	
	showAddCommentPage() {
		this.openVPage(VAddComment);
	}

	async onAddComment(comment:string) {
		await this.param.onAddComment(comment);
		//this.controller.relativeKey = 'comment';
	}
}
