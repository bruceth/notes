import React from 'react';
import { observer } from 'mobx-react';
import { VNoteBase } from "./VNoteBase";
import { CNoteBase } from "./CNoteBase";
import { computed } from 'mobx';

export class VNoteBaseEdit<T extends CNoteBase> extends VNoteBase<T> {
	@computed protected get changed(): boolean {return this.controller.captionChanged};

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
			{this.controller.cContent.renderInput()}
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
}
