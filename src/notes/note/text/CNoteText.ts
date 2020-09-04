import { computed, observable } from 'mobx';
import { EnumNoteType, NoteItem } from '../../model';
import { VTextView } from './VTextView';
import { VTextAdd } from './VTextAdd';
import { renderIcon } from '../../noteBase';
import { VTextDir } from './VTextDir';
import { VTextEdit } from './VTextEdit';
import { CContent, CText, CCheckable, CList } from '../../components';
import { CNote } from '../CNote';

export class CNoteText extends CNote {
	@observable cContent: CContent;
	protected ctype: EnumNoteType;

	createTextContent(): void {
		this.cContent = new CText(this.res);
		this.ctype = EnumNoteType.text;
	}
	
	createListContent(): void {
		this.cContent = new CList(this.res);
		this.ctype = EnumNoteType.textList;
	}

	createCheckableContent(): void {
		this.cContent = new CCheckable(this.res);
		this.ctype = EnumNoteType.textCheckable;

	}
	
	init(param: NoteItem): void {
		super.init(param);
		if (param) {
			if (this.cContent === undefined) {
				debugger;
				throw new Error('this.cContent should have created');
			}
			this.cContent.init(param.obj);
		}
	}

	@computed get isContentChanged():boolean {return this.cContent.changed}
	get type():EnumNoteType { return this.ctype; }

	renderIcon(): JSX.Element {
		return renderIcon(this.noteIcon, this.noteItem.toCount>0? 'text-success' : 'text-info');
	}

	protected endContentInput():any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		this.cContent.endInput(obj);
		return obj;
	}

	renderDirItem(index: number): JSX.Element {
		return this.renderView(VTextDir);
	}

	showViewPage() {
		this.openVPage(VTextView);
	}

	showEditPage() {
		this.openVPage(VTextEdit);
	}

	showAddPage() {
		this.openVPage(VTextAdd);
	}

	changeToText = () => {
		if (this.ctype === EnumNoteType.text)
			return;
		let content = this.cContent.toString();
		this.createTextContent();
		this.resetCCContent(content);
		this.ctype = EnumNoteType.text;
		if (this.noteItem) {
			this.noteItem.type = EnumNoteType.text;
		}
	}

	changeToList = () => {
		if (this.ctype === EnumNoteType.textList)
			return;
		let content = this.cContent.toString();
		this.createListContent();
		this.resetCCContent(content);
		this.ctype = EnumNoteType.textList;
		if (this.noteItem) {
			this.noteItem.type = EnumNoteType.textList;
		}
	}

	changeToCheckable = () => {
		if (this.ctype === EnumNoteType.textCheckable)
			return;
		let content = this.cContent.toString();
		this.createCheckableContent();
		this.resetCCContent(content);
		this.ctype = EnumNoteType.textCheckable;
		if (this.noteItem) {
			this.noteItem.type = EnumNoteType.textCheckable;
		}
	}

	private resetCCContent(content: string) {
		this.cContent.initFromString(content);
		this.cContent.changed = true;
	}
}
