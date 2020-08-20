import React from 'react';
import { EasyTime, FA } from 'tonva';
import { CFolderNoteItem } from './CFolderNoteItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VFolderNoteItem extends VNoteBase<CFolderNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;

			return <div className="d-flex bg-white px-3 py-2 align-items-center">
				<FA name="folder" className="text-warning mr-2" size="lg" />
				<b className="text-primary">{caption}</b>
				<div className="ml-auto align-self-center" 
					onClick={(e)=>{e.stopPropagation(); this.controller.onClickEllipsis()}}>
					<FA name="ellipsis-h" />
				</div>
			</div>;
		}));
	}
}
