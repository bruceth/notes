import React from 'react';
import { NoteItem, EnumNoteType } from '../../model';
import { CNotes } from '../../CNotes';
import { VAssignView } from './VAssignView';
import { VAdd } from './VAdd';
import { VEdit } from './VEdit'
import { renderIcon } from '../../noteBase';
import { FA } from 'tonva';
import { CNote } from '../CNote';
import { VAssignItem } from './VAssignItem';

export function createCNoteAssign(cNotes: CNotes): CNoteAssign {
	return new CNoteAssign(cNotes);
}

export class CNoteAssign extends CNote {
	get type():EnumNoteType { return EnumNoteType.assign }

	renderIcon(): JSX.Element {
		return renderIcon('list', 'text-primary');
	}

	protected newVDir() {return VAssignItem as any;}
	protected newVView() {return VAssignView as any;}
	protected newVEdit() {return VEdit as any;}
	protected newVAdd() {return VAdd as any;}

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

	/*
	showViewPage() {
		this.openVPage(VAssignView);
	}

	showAddAssignPage(parent: number) {
		//this.checkType = EnumCheckType.checkable;
		this.openVPage(VAdd, parent);
	}
	*/
}
