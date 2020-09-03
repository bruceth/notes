import { computed } from 'mobx';
import { EnumNoteType, NoteItem } from '../../model';
import { VTextView } from './VTextView';
import { VTextAdd } from './VTextAdd';
import { renderIcon } from '../../noteBase';
import { VTextDir } from './VTextDir';
import { VTextEdit } from './VTextEdit';
import { CContent, CText, CCheckable, CList } from '../../components';
import { CNote } from '../CNote';

export class CNoteText extends CNote {
	cContent: CContent;

	createTextContent(): void {
		this.cContent = new CText(this.res);
	}
	
	createListContent(): void {
		this.cContent = new CList(this.res);
	}

	createCheckableContent(): void {
		this.cContent = new CCheckable(this.res);
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
	get type():EnumNoteType { return EnumNoteType.text }

	renderIcon(): JSX.Element {
		return renderIcon(this.noteItem.toCount>0? 'files-o': 'file-o', 'text-info');
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
		if (this.noteItem.type === EnumNoteType.text)
			return;
		let content = this.cContent.toString();
		this.cContent = new CText(this.res);
		this.resetCCContent(content);
		this.noteItem.type = EnumNoteType.text;
	}

	changeToList = () => {
		if (this.noteItem.type === EnumNoteType.textList)
			return;
		let content = this.cContent.toString();
		this.cContent = new CList(this.res);
		this.resetCCContent(content);
		this.noteItem.type = EnumNoteType.textList;
	}

	changeToCheckable = () => {
		if (this.noteItem.type === EnumNoteType.textCheckable)
			return;
		let content = this.cContent.toString();
		this.cContent = new CCheckable(this.res);
		this.resetCCContent(content);
		this.noteItem.type = EnumNoteType.textCheckable;
	}

	private resetCCContent(content: string) {
		this.cContent.initFromString(content);
		this.cContent.changed = true;
	}
}
