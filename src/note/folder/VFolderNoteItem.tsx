import React from 'react';
import { FA } from 'tonva';
import { CFolderNoteItem } from './CFolderNoteItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VFolderNoteItem extends VNoteBase<CFolderNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {noteItem} = this.controller;
			let {toCount} = noteItem;
			//let divToCount = this.renderToCount();
			let divToCount:any;
			if (toCount > 0) {
				divToCount = <small className="ml-4 text-muted">
					<FA name="share" className="mr-1" />
					{toCount}
				</small>;
			}
			return <div className="d-block bg-white">
				<div className="d-flex px-3 py-2 align-items-center">
					<FA name="file-text-o" className="text-primary mr-3" size="lg" fixWidth={true} />
					<b className="">{noteItem.caption}</b>
					{divToCount}
				</div>
			</div>
		}));
	}
}
