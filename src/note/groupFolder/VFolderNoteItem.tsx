import React from 'react';
import { FA } from 'tonva';
import { CGroupFolderItem } from './CGroupFolderItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VGroupFolderItem extends VNoteBase<CGroupFolderItem> {
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
					<FA name="users" className="text-warning mr-3" size="lg" />
					<b className="text-primary">{noteItem.caption}</b>
					{divToCount}
				</div>
			</div>
		}));
	}
}
