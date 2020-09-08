import React from 'react';
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
		return this.renderFooter();
	}

	protected renderFooter() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			{this.controller.cComments.renderWriteComment()}
		</div>;
	}

	protected renderContent() {
		return this.controller.cContent.renderViewContent();
	}

	protected renderViewBottom():JSX.Element {
		if (this.isMe(this.controller.noteItem.owner) === false) return;
		return <div className="px-3 py-2 bg-light">
			<button className="btn btn-primary" onClick={this.controller.showAssignTo}>分派</button>
		</div>;
	}
}
