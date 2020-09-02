import { observable } from "mobx";
import { CNoteBase } from "../noteBase";
import { NoteItem } from "../model";
import { CComments } from "./components";
import { VNoteRelatives } from "./views";

export abstract class CNote extends CNoteBase {
	protected cComments: CComments;
	@observable activeRelativeTab: string;

	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.caption) this.caption = param.caption;
		}
	}
	
	addComment = async (content: string) => {
		let ret = await this.uqs.notes.AddComment.submit({ note: this.noteModel.id, content });
		let commentId = ret.comment;
		// 加入note界面，显示comment
		if (commentId) {
			this.noteItem.commentCount++;
			this.noteModel.comments.unshift({
				id: commentId,
				content: content,
				owner: this.user.id,
				assigned: undefined,
				$create: new Date(),
				$update: new Date(),
			});
		}
	}

	deleteComment = async (commentId: number) => {
		debugger;
	}

	showViewPage() {
		if (!this.noteModel) {
			debugger;
			throw new Error('noteModel 应该已经赋值了');
		}
		this.cComments = new CComments(this.res);
		this.cComments.init(this);
		this.openVPage(this.newVView());
	}

	renderWriteComment() {
		return this.cComments.renderWriteComment();
	}

	renderCommentButton() {
		return this.cComments.renderCommentButton();
	}

	renderCommentsList() {
		return this.cComments.renderCommentsList();
	}

	protected renderRelatives() {
		return this.renderView(VNoteRelatives);
	}
}
