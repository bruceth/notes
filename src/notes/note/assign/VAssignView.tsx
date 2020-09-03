import React from 'react';
import { VAssignEdit } from './VAssignEdit';
import { VNoteBaseView } from '../../noteBase';
import { CNoteAssign } from './CNoteAssign';
import { VAssignRelatives } from './VAssignRelatives';

export class VAssignView extends VNoteBaseView<CNoteAssign> {
	header() {
		return this.t('noteTask')
	}

	protected renderRelatives() {
		return this.renderVm(VAssignRelatives);
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
	}

	protected onEdit() {
		this.openVPage(VAssignEdit);
	}
}
