import React from 'react';
import { VPage, Page } from "tonva";
import { CNote } from "./CNote";
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';

export class VAddRNotePage extends VPage<CNote> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事';}
	content() {
		let button = observer(() => <button onClick={this.onAddRNote} 
			className="btn btn-primary" disabled={this.buttonDisabled}>
			新增
		</button>);
		return <div className="m-2 border rounded">
			<div className="bg-white">
				<div className="py-1 border-bottom">
					<input type="text" className="w-100 border-0 p-1" placeholder="标题" maxLength={80}
						onChange={this.onTitleChange} />
				</div>
				<textarea rows={10} className="w-100  border-0 p-1" placeholder="记事" maxLength={20000}
					onChange={this.onContentChange} />
			</div>
			<div className="py-2 px-3 bg-light border-top">
					{React.createElement(button)}
			</div>
		</div>;
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
}
