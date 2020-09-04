import React from 'react';
import { VNoteBaseView } from '../../noteBase';
import { CNoteText } from './CNoteText';
import { VTextRelatives } from './VTextRelatives';
//import { VTextHeader } from './VTextHeader';
import { observer } from 'mobx-react';

export class VTextView extends VNoteBaseView<CNoteText> {
	/*
	header() {
		return this.renderVm(VTextHeader);
	}
*/
	protected renderRelatives() {
		return this.renderVm(VTextRelatives);
	}

	footer() {
		return this.renderBottomCommands();
	}

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			{this.controller.cComments.renderWriteComment()}
		</div>;
	}

	protected renderContent() {
		return this.controller.cContent.renderViewContent();
		/*
		return React.createElement(observer(() => {
			let {noteType, cContent} = this.controller;
			return <>
				<span className="d-none">{noteType}</span>
				{cContent.renderViewContent()}
			</>;
		}));
		*/
	}
}
