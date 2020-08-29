import React from 'react';
import { EasyTime, LMR, List } from 'tonva';
import { VRelatives } from '../../../noteBase';
import { Relative, RelativeKey, NoteItem } from '../../../model';
import { GetTaskStateContent } from '../TaskState';
import { CNoteTask } from '../CNoteTask';

export class VTaskRelatives extends VRelatives<CNoteTask> {
	protected arr:RelativeKey[] = ['comment'];

	render() {
		return super.render();
	}

	private renderSpawnState(type:number, state:number) {
		let ss = GetTaskStateContent(type, state);
		if (ss === undefined)
			return;
		let {content, isEnd} = ss;

		return this.renderStateSpan(content, isEnd);
	}

	private renderSpawnItem = (item:NoteItem, index:number):JSX.Element => {
		let {caption, $update, owner, assigned, type, state} = item;
		let divOwner = this.renderContact(owner as number, assigned);
		let right = <small className="text-muted"><EasyTime date={$update} /></small>;
		return <div className="px-3 py-2 d-block bg-white">
			<LMR right={right}>
				<span className="mr-3">{divOwner}</span>{caption}
				<span className="ml-3">{this.renderSpawnState(type, state)}</span>
			</LMR>
		</div>;
	}

	protected tabSpawn = (isActive:boolean) => {
		return <>派生</>;
	}
	protected renderSpawn = () => {
		let {spawn} = this.controller.noteModel;
		if (!spawn || spawn.length === 0) return;
		return <List
			items={spawn} 
			item={{render: this.renderSpawnItem,  className: "notes"}} />
	}

	protected getRelativeFromTab(key: RelativeKey):Relative {
		switch (key) {
			default: return super.getRelativeFromTab(key);
			case 'spawn': return {caption: this.tabSpawn, render: this.renderSpawn};
		}
	}
}
