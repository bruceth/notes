//import React from 'react';
import { computed, observable } from 'mobx';
//import { FA } from 'tonva';
import { Contact } from '../../../model';
import { EnumNoteType, NoteItem } from '../../model';
import { renderIcon } from '../../noteBase';
import { CContent, CCheckable } from '../../components';
import { CNote } from '../CNote';
import { VAssignView } from './VAssignView';
import { VAssignAdd } from './VAssignAdd';
import { VAssignEdit } from './VAssignEdit'
import { VAssignDir } from './VAssignDir';
import { CAssignTo } from './CAssignTo';

export class CNoteAssign extends CNote {
	cContent: CContent;
	@observable checker: Contact;
	@observable rater: Contact;

	point:number = 100;
	hours:number = 3;

	init(param: NoteItem): void {
		super.init(param);
		this.cContent = new CCheckable(this.res);
		let obj:any;
		if (param) {
			this.caption = param.caption;
			obj = param.obj;
		}
		this.cContent.init(obj);
	}

	@computed get isContentChanged():boolean {return this.cContent.changed}
	get type():EnumNoteType { return EnumNoteType.assign }

	renderIcon(): JSX.Element {
		return renderIcon('list', 'text-primary');
	}

	protected endContentInput():any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		this.cContent.endInput(obj);
		return obj;
	}

	renderDirItem(index: number): JSX.Element {
		return this.renderView(VAssignDir);
	}

	showViewPage() {
		this.openVPage(VAssignView);
	}

	showEditPage() {
		this.cContent.startInput();
		this.openVPage(VAssignEdit);
	}

	showAddPage() {
		this.cContent.startInput();
		this.openVPage(VAssignAdd);
	}

	async showAssignTo() {
		let cAssignTo = new CAssignTo(this.cApp, this);
		await cAssignTo.start();
	}

	assignTask = async (toList: number[]) => {
		let { note } = this.noteItem;
		let { caption, content } = this.noteItem;
		let cObj = JSON.parse(content);
		if (this.checker) {
			cObj.checker = this.checker.contact;
		}
		else {
			delete cObj.checker;
		}
		if (this.rater) {
			cObj.rater = this.rater.contact;
		}
		else {
			delete cObj.rater;
		}
		cObj.hours = this.hours;
		cObj.point = this.point;
		let data = {
			groupFolder: this.owner.currentFold.groupFolder,
			folder: this.owner.currentFold.folderId,
			note,
			caption,
			content: JSON.stringify(cObj),
			tos: toList,
			checker: this.checker?.contact,
			rater: this.rater?.contact,
			point: this.point,
		}
		await this.uqs.notes.AssignTask.submit(data);
	}
}
