import { observable, computed } from "mobx";
import { CUqSub } from '../../tapp';
import { NoteItem, NoteModel, EnumNoteType } from '../model';
import { CNotes } from '../CNotes';
import { CContent, createCContent, createCContentFromType, EnumContentType } from '../components';
import { VNoteBaseDir, VNoteBaseDirView } from './VNoteBaseDir';
import { VNoteBase, VNoteBasePage } from "./VNoteBase";

export abstract class CNoteBase extends CUqSub<CNotes> {
	disableFrom: boolean = false;
	@observable noteModel: NoteModel;
	@observable noteItem: NoteItem;
	@observable protected cContent: CContent;

	@computed get isContentChanged():boolean {return this.cContent.changed}
	renderContentInput() {return this.cContent.renderInput()}
	renderContentDir() {return this.cContent.renderDirContent()}
	renderContentView() {return this.cContent.renderViewContent()}

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

	createCContent(type: EnumContentType) {
		this.cContent = createCContentFromType(type);
	}

	protected async internalStart() { }

	@observable caption: string;
	get captionChanged() {return this.caption !== this.noteItem?.caption;}

	protected newVDir(): (new (controller: CNoteBase) => VNoteBaseDir<any>) {return VNoteBaseDirView;}
	protected newVView(): (new (controller: CNoteBase) => VNoteBase<any>) {return VNoteBasePage;}
	protected newVEdit(): (new (controller: CNoteBase) => VNoteBase<any>) {return VNoteBasePage;}
	protected newVAdd(): (new (controller: CNoteBase) => VNoteBase<any>) {return VNoteBasePage;}

	renderListItem(index: number): JSX.Element {
		return this.renderView(this.newVDir());
	}

	abstract renderIcon(): JSX.Element;

	showViewPage() {
	}

	showEditPage() {
		this.openVPage(this.newVEdit());
	}

	showAddPage(folderId: number, contentType: EnumContentType) {
		//this.checkType = checkType;
		this.cContent = createCContentFromType(contentType);
		this.openVPage(this.newVAdd(), folderId);
	}

	/*
	protected stringifyContent() {
		let ret = JSON.stringify(this.buildObj());
		return ret;
	}
	*/

	/*
	protected buildObj(): any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		//obj.content = this.changedNoteContent || this.noteContent;
		return this.cContent.endInput(obj);
		//return obj;
	}
	*/

	protected endContentInput():any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		//obj.content = this.changedNoteContent || this.noteContent;
		this.cContent.endInput(obj);
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
		let obj = this.endContentInput();
		let noteContent = JSON.stringify(obj);
		await this.owner.editNote(showWaiting,
			this.noteItem,
			this.caption,
			noteContent,
			obj);
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
		let obj = this.endContentInput();
		let noteContent = JSON.stringify(obj);
		let ret = await this.owner.addNote(parent, this.caption, noteContent, obj, this.type);
		this.updateChange();
		return ret;
	}
/*
	async addComment(content: string) {
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

	async deleteComment(commentId: number) {
		debugger;
	}
*/
}
