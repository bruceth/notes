import React from 'react';
import { FA } from 'tonva';
import { CSpace } from './CSpace';
import { observer } from 'mobx-react';
import { VNoteBase } from '../../noteBase/VNoteBase';

export class VSpaceDir extends VNoteBase<CSpace> {
	render() {
		return React.createElement(observer(() => {
			let {noteItem} = this.controller;
			let {toCount, unread} = noteItem;
			let divToCount:any;
			if (toCount > 0) {
				divToCount = <small className="ml-4 text-muted">
					<FA name="share" className="mr-1" />
					{toCount}
				</small>;
			}
			return <div className="d-block bg-white">
				<div className="d-flex px-3 py-3 align-items-center">
					<div className="unread-dot mr-3">
						<FA name="users" className="text-warning" size="2x" fixWidth={true} />
						{unread>0 && <u />}
					</div>
					<b className="text-primary">{noteItem.caption}</b>
					{divToCount}
				</div>
			</div>
		}));
	}
}
