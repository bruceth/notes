import React from 'react';
import { observable } from "mobx";
import { CUqSub } from '../../tapp';
import { NoteItem, NoteModel, EnumNoteType, RelativeKey } from '../model';
import { CNotes } from '../CNotes';
import { CContent, createCContent, CComments, createCContentFromType, EnumContentType } from '../components';
import { VNoteBaseDir } from './VNoteBaseDir';
import { VNoteBaseView } from './VNoteBaseView';
import { VNoteBaseEdit } from './VNoteBaseEdit';

export abstract class CNoteBase extends CUqSub<CNotes> {
	disableFrom: boolean = false;
	@observable noteModel: NoteModel;
	@observable noteItem: NoteItem;
	@observable relativeKey: RelativeKey;
	cContent: CContent;
	cComments: CComments;

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
		if (!param) {
			return;
		}
		this.caption = param.caption;
		this.cContent = createCContent(param.content, param.type);
		if (!this.cContent) debugger;
		/*
		let { obj } = param;
		if (obj) {
			this.noteContent = obj.content;
		}
		*/
	}

	abstract get type():EnumNoteType;

	initContent(type: EnumContentType) {
		this.cContent = createCContentFromType(type);
	}

	protected async internalStart() { }

	@observable caption: string;
	get captionChanged() {return this.caption !== this.noteItem.caption;}

	protected newVDir(): VNoteBaseDir<any> {return new VNoteBaseDir<CNoteBase>(this);}
	protected newVView(): VNoteBaseView<any> {return new VNoteBaseView<CNoteBase>(this);}
	protected newVEdit(): VNoteBaseEdit<any> {return new VNoteBaseEdit<CNoteBase>(this);}

	renderListItem(index: number): JSX.Element {
		let vDir = this.newVDir();
		return vDir.render();
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
		//obj.content = this.changedNoteContent || this.noteContent;
		this.cContent.buildObj(obj);
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
			this.caption,
			noteContent,
			this.buildObj());
		this.updateChange();
	}

	protected updateChange() {
		//if (this.changedNoteContent) {
		//	this.noteContent = this.changedNoteContent;
		//	this.changedNoteContent = undefined;
		//}
		if (this.noteItem) {
			this.noteItem.$update = new Date();
			if (this.caption && this.caption !== this.noteItem.caption) {
				this.noteItem.caption = this.caption;
			}
			this.owner.updateFolderTime(this.noteItem.note, this.noteItem.$update);
		}
	}

	updateTime(time:Date) {
		if (this.noteItem) {
			this.noteItem.$update = time;
		}
	}

	async AddNote(parent: number) {
		let noteContent = this.stringifyContent();
		let ret = await this.owner.addNote(parent, this.caption, noteContent, this.buildObj(), this.type);
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
