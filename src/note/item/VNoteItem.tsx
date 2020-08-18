import React from 'react';
import { VNoteBase } from '../item';
import { EasyTime, FA } from 'tonva';
import { CNoteItem } from './CNoteItem';
import { observer } from 'mobx-react';

export class VNoteItem extends VNoteBase<CNoteItem> {
	render() {
		return React.createElement(observer(() => {
			let {owner, caption, $create, $update} = this.controller.noteItem;
			let divChanged:any = undefined;
			let create:Date = $create;
			let update:Date = $update;
			if (create && update) {
				let time:Date, action:any;
				if (update.getTime() - create.getTime() > 60*1000) {
					action = <FA name="pencil-square-o" />;
					time = update;
				}
				else {
					time = create;
				}
				divChanged = <div className="small text-muted">
					<small>
						{action}
						<span className="text-info"><EasyTime date={time} /></span>
					</small>
				</div>;
			}
			let divFrom = this.renderFrom();
			let divToCount = this.renderToCount();
			let divspawnCount = this.renderSpawnCount();

			return <div className="d-block bg-white">
				{caption && <div className="px-3 py-2"><b>{caption}</b></div>}
				{this.renderContent()}
				<div className="d-flex align-items-center px-3 py-2 bg-light">
				 	{divFrom}{divFrom&&<div className="small text-muted ml-3"></div>}
					{divToCount}{divToCount&&<div className="small text-muted ml-3"></div>}
					{divspawnCount}
					<div className="mr-auto" />
					{divChanged}
				</div>
			</div>;
		}));
	}
}
