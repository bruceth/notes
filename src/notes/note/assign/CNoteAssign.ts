import React from 'react';
import { NoteItem } from '../../model';
import { CNotes } from '../../CNotes';
import { VAssignView } from './VAssignView';
import { VAdd } from './VAdd';
import { CInput } from '../CInput';
import { renderIcon } from '../../noteBase';
import { FA } from 'tonva';

export function createCNoteAssign(cNotes: CNotes): CNoteAssign {
	return new CNoteAssign(cNotes);
}

export class CNoteAssign extends CInput {
	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
	}

	protected renderIcon(): JSX.Element {
		return renderIcon('list', 'text-primary');
		/*
		//return <FA name={name} size="lg" className={cn} fixWidth={true} />;
		let name = 'list';
		let cn = 'text-primary';
		return React.createElement(FA, {
			name, 
			size:'2x',
			className:cn,
			fixWidth: true
		});
		*/
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

	showNoteView() {
		this.openVPage(VAssignView);
	}

	showAddAssignPage(parent: number) {
		//this.checkType = EnumCheckType.checkable;
		this.openVPage(VAdd, parent);
	}
}
