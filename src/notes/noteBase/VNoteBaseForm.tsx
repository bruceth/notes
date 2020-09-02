import React from 'react';
import { observer } from 'mobx-react';
import { VNoteBase } from "./VNoteBase";
import { CNoteBase } from "./CNoteBase";
import { computed } from 'mobx';
import { ConfirmOptions } from 'tonva';

export class VNoteBaseForm<T extends CNoteBase> extends VNoteBase<T> {
	@computed protected get changed(): boolean {return this.controller.captionChanged};

	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return this.t('notes')};

	protected renderBody() {
		return React.createElement(observer(() => {
			return <div className="d-block bg-white">
				{this.renderTopCaptionContent()}
				{this.renderEditBottom()}
			</div>;
		}));
	}

	protected renderTopCaptionContent():JSX.Element {
		return <div className="bg-white">
			{this.renderCaptionInput()}
			{this.controller.renderContentInput()}
		</div>;
	}

	protected renderCaptionInput() {
		return <div className="py-1 px-1 border-bottom">
			<input type="text" className="w-100 border-0 form-control font-weight-bold" placeholder="标题" maxLength={80}
				onChange={this.onCaptionChange} autoFocus={true}
				defaultValue={this.controller.caption} />
		</div>;
	}

	protected onCaptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.controller.caption = evt.target.value.trim();
	}

	protected renderEditBottom():JSX.Element {
		return;
	}

	protected async onDelete(): Promise<void> {
		let options: ConfirmOptions = {
			caption: '请确认',
			message: '真的要删除这个小单吗？',
			yes: '确认删除',
			no: '不删除'
		};
		if (await this.controller.confirm(options) === 'yes') {
			await this.controller.owner.hideNote(this.controller.noteItem.note, 1);
			this.closePage(2);
		}
	}

	protected renderDeleteButton() {
		return <button className="btn btn-outline-secondary mr-3" onClick={() => this.onDelete()}>
			删除
		</button>;
	}
}
