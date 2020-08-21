import React from 'react';
import { FA } from 'tonva';
import { CFolderNoteItem } from './CFolderNoteItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VFolderNoteItem extends VNoteBase<CFolderNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {noteItem} = this.controller;

			return <div className="d-flex bg-white px-3 py-2 align-items-center">
				<FA name={noteItem.toCount>0?"folder-open":"folder"} className="text-warning mr-3" size="lg" />
				<b className="text-primary">{noteItem.caption}</b>
				<div className="ml-auto align-self-center" 
					onClick={(e)=>{e.stopPropagation(); this.controller.onClickEllipsis()}}>
					<FA name="ellipsis-h" />
				</div>
			</div>;
		}));
	}
}
