import { Controller } from "tonva";
import { CommentItem } from "../../model";
import { VCommentsList } from "./VCommentsList";

export class CComments extends Controller {
	comments: CommentItem[];

	protected async internalStart() {}

	renderCommentsList():JSX.Element { return this.renderView(VCommentsList); }
	showAddCommentPage() {
		alert('AddCommentPage');
	}
}
