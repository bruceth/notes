import React from 'react';
import { computed } from 'mobx';
import { VNoteEditor } from './VNoteEditor';

export class VAddNotePage extends VNoteEditor {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事';}
	content() {
		return <div className="m-2 border rounded">
			<div className="bg-white">
				<div className="py-1 border-bottom">
					<input type="text" className="w-100 border-0 p-1" placeholder="标题" maxLength={80}
						onChange={this.onTitleChange} />
				</div>
				<textarea rows={10} className="w-100  border-0 p-1" placeholder="记事" maxLength={20000}
					onChange={this.onContentChange} />
			</div>
			{this.renderEditBoxBottom()}
		</div>;
	}

	@computed get saveDisabled():boolean {
		if (this.title !== undefined) {
			return this.title.length === 0;
		}
		if (this.noteContent !== undefined) {
			return this.noteContent.length === 0;
		}
		return true;
    }

	getSendDisabled():boolean {return this.saveDisabled;}

	protected async saveNote() {
		let ret = await this.controller.addNote(this.title, this.noteContent);
		return ret.note;
	}
}
