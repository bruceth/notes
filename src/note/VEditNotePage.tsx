import React from 'react';
import { tv } from "tonva";
import { VNoteEditor } from './VNoteEditor';

export class VEditNotePage extends VNoteEditor {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		let {note} = this.param;
		return tv(note, (values) => {
			let {caption, content} = values;
			this.initTitle = caption;
			this.initNoteContent = content;
			return <div className="m-2 border rounded">
				<div className="bg-white">
					<div className="py-1 border-bottom">
						<input type="text" className="w-100 border-0 p-1" placeholder="标题" maxLength={80}
							onChange={this.onTitleChange} defaultValue={caption} />
					</div>
					<textarea rows={10} className="w-100  border-0 p-1" placeholder="记事" maxLength={20000}
						onChange={this.onContentChange} defaultValue={content} />
				</div>
				{this.renderEditBoxBottom()}
			</div>;
		});
	}

	getSendDisabled():boolean {return false;}

	protected async saveNote():Promise<number> {
		let {note} = this.param;
		await this.controller.setNote(
			note,
			this.title || this.initTitle, 
			this.noteContent || this.initNoteContent);
		return note;
	}
}
