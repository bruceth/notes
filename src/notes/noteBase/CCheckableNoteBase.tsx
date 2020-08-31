import { observable } from "mobx";
import { NoteItem, CheckItem, EnumCheckType } from '../model';
import { CNoteBase } from './CNoteBase';
import { VNoteBaseView } from './VNoteBaseView';

export abstract class CCheckableNoteBase1 extends CNoteBase {
	/*
	init(param: NoteItem): void {
		this.noteItem = param;
		if (!param) return;
		this.title = param.caption;
		let { obj } = param;
		if (obj) {
			this.checkType = Number(obj.check);
			if (this.checkType === EnumCheckType.text || this.checkType === EnumCheckType.folder) {
				this.noteContent = obj.content;
			}
			else {
				this.items.splice(0, this.items.length);
				this.itemKey = obj.itemKey;
				this.items.push(...obj.items);
			}
		}
	}
	*/

	@observable checkType: EnumCheckType = EnumCheckType.text;	//0: text, 1: checkable, 2: list, 3: folder
	@observable items: CheckItem[] = [];
	itemKey: number = 1;

	protected async internalStart() { }

	addItem(value: string): boolean {
		if (this.checkType === EnumCheckType.checkable) {
			this.items.push({
				key: this.itemKey++,
				text: value,
				checked: false,
			});
		}
		else if (this.checkType === EnumCheckType.list) {
			this.items.push({
				key: this.itemKey++,
				text: value,
			});
		}
		return false;
	}

	/*
	protected buildObj(): any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		if (this.checkType === EnumCheckType.text || this.checkType === EnumCheckType.folder) {
			obj.check = this.checkType;
			obj.content = this.changedNoteContent || this.noteContent;
			delete obj.itemKey;
			delete obj.items;
		}
		else {
			obj.check = this.checkType;
			obj.itemKey = this.itemKey;
			obj.items = this.items;
			delete obj.content;
		}
		return obj;
	}
	*/

	protected newVNoteItem():VNoteBaseView<any> {return new VNoteBaseView(this);}

	onCheckableChanged(type: EnumCheckType) {
		/*
		let oldType = this.checkType;
		this.checkType = type;
		if (oldType === EnumCheckType.text) {
			let content = this.changedNoteContent || this.noteContent;
			if (content) {
				this.items.splice(0, this.items.length);
				this.items.push(...content.split('\n').filter((v, index) => {
						return v.trim().length > 0;
					}).map((v, index) => {
					if (this.checkType === EnumCheckType.checkable) {
						return {
							key: this.itemKey++,
							text: v,
							checked: false
						}
					}
					else {
						return {
							key: this.itemKey++,
							text: v,
						}
					}
				}));
			}
		}
		else {
			if (this.checkType === EnumCheckType.text || this.checkType === EnumCheckType.folder) {
				this.noteContent = this.items.map(v => v.text).join('\n');
			}
			else if (this.checkType === EnumCheckType.checkable) {
				this.items.map(v => v.checked = false);
			}
			else if (this.checkType === EnumCheckType.list) {
				this.items.map(v => delete v.checked);
			}
		}
		this.changedNoteContent = undefined;
		*/
	}

	async onCheckChange(key: number, checked: boolean) {
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = checked;
		await this.SetNote(false);
	}
}
