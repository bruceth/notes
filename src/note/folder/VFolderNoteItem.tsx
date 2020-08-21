import React from 'react';
import { FA } from 'tonva';
import { CFolderNoteItem } from './CFolderNoteItem';
import { observer } from 'mobx-react';
import { VNoteBase } from '../item/VNoteBase';

export class VFolderNoteItem extends VNoteBase<CFolderNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {noteItem} = this.controller;
			let divToCount = this.renderToCount();

			return <div className="d-block bg-white"> 
				<div className="d-flex px-3 py-2 align-items-center">
					<FA name={noteItem.toCount>0?"folder-open":"folder"} className="text-warning mr-3" size="lg" />
					<b className="text-primary">{noteItem.caption}</b>
					<div className="ml-auto align-self-center" 
						onClick={(e)=>{e.stopPropagation(); this.controller.onClickEllipsis()}}>
						<FA name="ellipsis-h" />
					</div>
				</div>
				{ divToCount &&
						<div className="d-flex align-items-center px-3 mb-1">
							{divToCount}
							<div className="mr-auto" />
						</div>
					}
			</div>
		}));
	}
}
