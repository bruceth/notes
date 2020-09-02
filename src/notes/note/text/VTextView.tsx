import React from 'react';
import { VNoteBaseView } from '../../noteBase';
import { CNoteText } from './CNoteText';
import { VTextRelatives } from './VTextRelatives';

export class VTextView extends VNoteBaseView<CNoteText> {
	protected renderRelatives() {
		return this.renderVm(VTextRelatives);
	}

	footer() {
		return this.renderBottomCommands();
	}

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			{this.controller.renderWriteComment()}
		</div>;
	}
}
