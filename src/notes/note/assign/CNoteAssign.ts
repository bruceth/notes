import React from 'react';
import { EnumNoteType } from '../../model';
import { CNotes } from '../../CNotes';
import { VAssignView } from './VAssignView';
import { VAssignAdd } from './VAssignAdd';
import { VAssignEdit } from './VAssignEdit'
import { renderIcon } from '../../noteBase';
import { FA } from 'tonva';
import { CNote } from '../CNote';
import { VAssignDir } from './VAssignDir';

export function createCNoteAssign(cNotes: CNotes): CNoteAssign {
	return new CNoteAssign(cNotes);
}

export class CNoteAssign extends CNote {
	get type():EnumNoteType { return EnumNoteType.assign }

	renderIcon(): JSX.Element {
		return renderIcon('list', 'text-primary');
	}

	protected newVDir() {return VAssignDir as any;}
	protected newVView() {return VAssignView as any;}
	protected newVEdit() {return VAssignEdit as any;}
	protected newVAdd() {return VAssignAdd as any;}

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
