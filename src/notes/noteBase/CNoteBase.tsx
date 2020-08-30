import React from 'react';
import { observable } from "mobx";
import { NoteItem, NoteModel, EnumNoteType, RelativeKey } from '../model';
import { CNotes } from '../CNotes';
import { CUqSub } from '../../tapp';
import { VNoteBaseView } from './VNoteBaseView';

export abstract class CNoteBase extends CUqSub<CNotes> {
	disableFrom: boolean = false;
	@observable noteModel: NoteModel;
	@observable noteItem: NoteItem;
	@observable relativeKey: RelativeKey;

	get groupFolder(): number {
		if (!this.noteItem)
			return undefined;
		let ret = this.noteItem.groupFolder;
		if (!ret && this.noteItem.type === Number(EnumNoteType.groupFolder)) {
			ret = this.noteItem.note;
		}

		return ret;
	}

	init(param: NoteItem): void {
		this.noteItem = param;
		if (!param) return;
		this.title = param.caption;
		let { obj } = param;
		if (obj) {
			this.noteContent = obj.content;
		}
	}

	@observable title: string;
	@observable noteContent: string;
	@observable changedNoteContent: string;

	protected async internalStart() { }

	protected newVNoteItem():VNoteBaseView<any> {return new VNoteBaseView(this);}

	renderListItem(index: number): JSX.Element {
		let vNoteItem = this.newVNoteItem();
		return vNoteItem.renderListItem();
	}

	protected abstract renderIcon(): JSX.Element;
	renderViewIcon(): JSX.Element {
		return <div className="mr-3">{this.renderIcon()}</div>;
	}
	renderItemIcon(): JSX.Element {
		let {unread} = this.noteItem;
		let dot:any;
		if (unread>0) dot = <u/>;
		return <div className="mr-3 unread-dot">{this.renderIcon()}{dot}</div>
	}

	abstract showNoteView(): void;

	protected stringifyContent() {
		let ret = JSON.stringify(this.buildObj());
		return ret;
	}

	protected buildObj(): any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		obj.content = this.changedNoteContent || this.noteContent;
		return obj;
	}

	// convertObj 可以在不同的继承中被重载
	convertObj(item: NoteItem): NoteItem {
		item.obj = this.parseContent(item.content);
		return item;
	}

	protected parseContent(content: string): any {
		try {
			if (!content) return undefined;
			return JSON.parse(content);
		}
		catch (err) {
			console.error(err);
			return undefined;
		}
	}

	async showTo(backPageCount: number) {
		await this.owner.showTo(this.noteItem, backPageCount);
	}

	async SetNote(showWaiting: boolean = true) {
		let noteContent = this.stringifyContent();
		await this.owner.editNote(showWaiting,
			this.noteItem,
			this.title,
			noteContent,
			this.buildObj());
		this.updateChange();
	}

	protected updateChange() {
		if (this.changedNoteContent) {
			this.noteContent = this.changedNoteContent;
			this.changedNoteContent = undefined;
		}
		if (this.noteItem) {
			this.noteItem.$update = new Date();
			if (this.title && this.title !== this.noteItem.caption) {
				this.noteItem.caption = this.title;
			}
			this.owner.updateFolderTime(this.noteItem.note, this.noteItem.$update);
		}
	}

	updateTime(time:Date) {
		if (this.noteItem) {
			this.noteItem.$update = time;
		}
	}

	async AddNote(parent: number, type:EnumNoteType) {
		let noteContent = this.stringifyContent();
		let ret = await this.owner.addNote(parent, this.title, noteContent, this.buildObj(), type);
		this.updateChange();
		return ret;
	}

	async AddComment(content: string) {
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
}
