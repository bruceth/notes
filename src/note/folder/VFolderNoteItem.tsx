import React from 'react';
import { EasyTime, FA } from 'tonva';
import { CFolderNoteItem } from './CFolderNoteItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VFolderNoteItem extends VNoteBase<CFolderNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;

			return <div className="d-block d-flex bg-white">
				{caption && <div className="px-3 py-2"><b>{caption}</b></div>}
				<FA className="ml-auto mr-2 align-self-center" name="angle-right" />
			</div>;
		}));
	}
}
