import React from 'react';
import { VNoteView } from '../item';
import { CNoteItem } from './CNoteItem';
import { observer } from 'mobx-react';

export class VNoteItem<T extends CNoteItem> extends VNoteView<T> {
	render() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;
			let divToCount = this.renderToCount();
			let divspawnCount = this.renderSpawnCount();
			let divComment = this.renderCommentFlag();

			return <div className="d-block bg-white">
				{this.renderItemTop()}
				<div className="py-2">
					{caption && <div className="px-3 my-2"><b>{caption}</b></div>}
					{this.renderItemContent()}
				</div>
				{
					(divToCount || divspawnCount) &&
						<div className="d-flex align-items-center px-3 mb-1">
							{divToCount}
							{divspawnCount}
							{divComment}
							<div className="mr-auto" />
						</div>
				}
			</div>;
		}));
	}
}
