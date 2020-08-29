import React from 'react';
import { VNoteBaseView } from '.';
import { CNoteBase } from './CNoteBase';
import { observer } from 'mobx-react';

export class VNoteBaseItem<T extends CNoteBase> extends VNoteBaseView<T> {
	render() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;
			let divToCount = this.renderToCount();
			let divSpawnCount = this.renderSpawnCount();
			let divComment = this.renderCommentFlag();
			let divBottom:any;
			if (divToCount || divSpawnCount || divComment) {
				divBottom = <div className="d-flex align-items-center px-3 mb-1">
					{divToCount}
					{divSpawnCount}
					{divComment}
					<div className="mr-auto" />
				</div>;
			}

			return <div className="d-block bg-white">
				{this.renderItemTop()}
				<div className="py-2">
					{caption && <div className="px-3 my-2"><b>{caption}</b></div>}
					{this.renderItemContent()}
				</div>
				{divBottom}
			</div>;
		}));
	}
}
