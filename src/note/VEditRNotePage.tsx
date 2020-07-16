import React from 'react';
import { CNote } from "./CNote";
import { VPage, Page, tv } from "tonva";
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { runInThisContext } from 'vm';

export class VEditRNotePage extends VPage<CNote> {
	private param:any;
	init(param?:any):void {this.param = param;}

	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		let {rNote} = this.param;
		return tv(rNote, (values) => {
			let {caption, content} = values;
			this.initTitle = caption;
			this.initNoteContent = content;
			let button = observer(() => <button onClick={this.onSetRNote} 
				className="btn btn-primary" disabled={this.buttonDisabled}>
				保存
			</button>);
			return <div className="m-2 border rounded">
				<div className="bg-white">
					<div className="py-1 border-bottom">
						<input type="text" className="w-100 border-0 p-1" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange} defaultValue={caption} />
					</div>
					<textarea rows={10} className="w-100  border-0 p-1" placeholder="记事" maxLength={20000}
						onChange={this.onContentChange} defaultValue={content} />
				</div>
				<div className="py-2 px-3 bg-light border-top">
						{React.createElement(button)}
				</div>
			</div>;
		});
	}

	private initTitle: string;
	@observable private title: string;
	private onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.title = evt.target.value.trim();
	}

	private initNoteContent: string;
	@observable private noteContent: string;
	private onContentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.noteContent = evt.target.value;
	}

	@computed get buttonDisabled():boolean {
		return (this.title === undefined && this.noteContent === undefined);
    }

	private onSetRNote = async () => {
		let {rNote} = this.param;
		await this.controller.setRNote(
			rNote,
			this.title || this.initTitle, 
			this.noteContent || this.initNoteContent);
		this.closePage();
	}
}
