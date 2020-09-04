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
	cContent: CContent;
	private noteIcon: string;
	@observable noteType: EnumNoteType;
	@observable header: string;

	createTextContent(): void {
		this.cContent = new CText(this.res);
		this.noteIcon = 'file-o';
		this.noteType = EnumNoteType.text;
		this.header = this.t('noteText');
	}
	
	createListContent(): void {
		this.cContent = new CList(this.res);
		this.noteIcon = 'list';
		this.noteType = EnumNoteType.textList;
		this.header = this.t('noteList');
	}

	createCheckableContent(): void {
		this.cContent = new CCheckable(this.res);
		this.noteIcon = 'check-square-o';
		this.noteType = EnumNoteType.textCheckable;
		this.header = this.t('noteCheckable');
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
	get type():EnumNoteType { return this.noteType }

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
		if (this.noteType === EnumNoteType.text)
			return;
		let content = this.cContent.toString();
		this.createTextContent();
		this.resetCCContent(content);
		this.noteItem.type = this.noteType;
	}

	changeToList = () => {
		if (this.noteType === EnumNoteType.textList)
			return;
		let content = this.cContent.toString();
		this.createListContent();
		this.resetCCContent(content);
		this.noteItem.type = this.noteType;
	}

	changeToCheckable = () => {
		if (this.noteType === EnumNoteType.textCheckable)
			return;
		let content = this.cContent.toString();
		this.createCheckableContent();
		this.resetCCContent(content);
		this.noteItem.type = this.noteType;
	}

	private resetCCContent(content: string) {
		this.cContent.initFromString(content);
		this.cContent.changed = true;
	}
}
