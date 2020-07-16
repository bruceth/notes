import React from 'react';
import { CHome } from './CHome';
import { VPage, Page, List, tv, FA } from 'tonva';

export class VHome extends VPage<CHome> {
	render() {
		let {cNode} = this.controller;
		let right = <button onClick={cNode.showAddRNotePage} className="btn btn-success btn-sm mr-1">
			<FA name="plus" /> 记事
		</button>;
		return <Page header="首页" right={right}>
			{cNode.renderListView()}
		</Page>;
		// <List items={this.controller.notesPager} item={{render: this.renderNote, key: this.anchorKey}} />

	}
	/*
	private showAddRNotePage = () => {
		let button = observer(() => <button onClick={this.onAddRNote} 
			className="btn btn-primary" disabled={this.buttonDisabled}>
			新增
		</button>);
		this.openPage(() => <Page header="记事">
			<div className="m-2 border rounded bg-white">
				<div className="py-1 border-bottom">
					<input type="text" className="w-100 border-0 p-1" placeholder="标题" maxLength={80}
						onChange={this.onTitleChange} />
				</div>
				<textarea rows={10} className="w-100  border-0 p-1 my-1" placeholder="记事" maxLength={20000}
					onChange={this.onContentChange} />
				<div className="py-2 px-3">
					{React.createElement(button)}
				</div>
			</div>
		</Page>);
	}

	@observable private title: string;
	private onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.title = evt.target.value.trim();
	}

	@observable private noteContent: string;
	private onContentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.noteContent = evt.target.value;
	}

	@computed get buttonDisabled():boolean {
		if (this.title !== undefined) {
			return this.title.length === 0;
		}
		if (this.noteContent !== undefined) {
			return this.noteContent.length === 0;
		}
		return true;
    }

	private onAddRNote = async () => {
		await this.controller.addRNote(this.title, this.noteContent);
		this.closePage();
	}

	private anchorKey = (item:any) => item.anchor;

	private renderNote = (item:any, index:number) => {
		let {anchor, owner, note} = item;
		let tvRenderNote = (values:any) => {
			let {caption, content} = values;
			return <div className="px-3 py-2 d-block border rounded m-2 bg-transparent">
				{caption && <div className="pb-2"><b>{caption}</b></div>}
				<div>{content}</div>
			</div>;
		}
		//return <div className="px-3 py-2">anchor={tv(anchor)} owner={tv(owner)} note={tv(note)}</div>;
		return tv(note, tvRenderNote);
	}
	*/
}
