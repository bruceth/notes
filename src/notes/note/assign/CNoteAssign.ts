import React from 'react';
import { EnumNoteType, NoteItem } from '../../model';
import { VAssignView } from './VAssignView';
import { VAssignAdd } from './VAssignAdd';
import { VAssignEdit } from './VAssignEdit'
import { renderIcon } from '../../noteBase';
import { FA } from 'tonva';
import { CNote } from '../CNote';
import { VAssignDir } from './VAssignDir';
import { computed, observable } from 'mobx';
import { CContent, CCheckable } from '../../components';
import {  } from '../../components';

export class CNoteAssign extends CNote {
	@observable cContent: CContent;

	init(param: NoteItem): void {
		super.init(param);
		this.cContent = new CCheckable(this.res); // createCContent(param.content, param.type);
		if (!param) {
			this.cContent.init();
			return;
		}
		
		let {caption, obj} = param;
		this.cContent.init(obj);
		this.caption = caption;
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
		this.openVPage(VAssignEdit);
	}

	showAddPage() {
		this.openVPage(VAssignAdd);
	}

	renderViewIcon(): JSX.Element {
		let name = 'list';
		let cn = 'text-primary';
		let icon = React.createElement(FA, {
			name, 
			size:'2x',
			className:cn,
			fixWidth: true
		});
		return React.createElement('div', 
			{
				className:"mr-5"
			},
			icon
		);
	}
}
