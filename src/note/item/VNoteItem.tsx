import React from 'react';
import { VNoteView } from '../item';
import { FA } from 'tonva';
import { CNoteItem } from './CNoteItem';
import { observer } from 'mobx-react';

export class VNoteItem<T extends CNoteItem> extends VNoteView<T> {
	render() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;
			let divToCount = this.renderToCount();
			let divspawnCount = this.renderSpawnCount();

			return <div className="d-block bg-white">
				{this.renderTop()}
				{caption && <div className="px-3 py-2"><b>{caption}</b></div>}
				{this.renderItemContent()}
				{
					(divToCount || divspawnCount) &&
						<div className="d-flex align-items-center px-3 mb-1">
							{divToCount}
							{divspawnCount}
							<div className="mr-auto" />
						</div>
				}
			</div>;
		}));
	}
}
