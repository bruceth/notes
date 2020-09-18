import React from 'react';
import { observer } from 'mobx-react';
import { VNoteBase } from "./VNoteBase";
import { CNoteBase } from "./CNoteBase";
//import { VRelatives } from '../note/VRelatives';

export class VNoteBaseView<T extends CNoteBase> extends VNoteBase<T> {
	header() {return this.t('notes')}

	protected renderBody() {
		return React.createElement(observer(() => {
			return <div className="d-block">
				{this.renderTopCaptionContent()}
				{this.renderViewBottom()}
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderTop():JSX.Element {
		let vEditButton:any;
		let isMe = this.isMe(this.controller.noteItem.owner);
		if (isMe === true) {
			vEditButton = <div className="ml-auto">{this.renderEditButton()}</div>;
		}
		return <div className="d-flex px-3 py-2 align-items-center border-top border-bottom bg-light">
			{this.renderIcon()}
			<span className="mr-4">{this.renderEditTime()}</span>
			{this.renderFrom()}
			{vEditButton}
		</div>;
	}

	protected renderViewBottom():JSX.Element {
		return <div className="h-1c"></div>;
	}

	protected renderRelatives():JSX.Element {
		return;
	}

	protected renderIcon(): JSX.Element {
		return <div className="mr-3">{this.controller.renderIcon()}</div>;
	}
}
