import React from 'react';
import { VEdit } from './VEdit';
import { VNoteBaseView } from '../../noteBase';
import { CContainer } from '../CContainer';
import { VFolderRelatives } from './VFolderRelatives';

export class VFolderView extends VNoteBaseView<CContainer> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		let {noteItem} = this.controller;
		if (noteItem) {
			return noteItem.caption;
		}
		return this.t('notes')
	}

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-end">
			{this.renderShareButton()}
		</div>;
	}

	protected onEdit() {
		this.openVPage(VEdit);
	}

	protected renderRelatives() {
		return this.renderVm(VFolderRelatives);
	}

	protected renderContent() {
		return this.controller.cContent.renderViewContent();
	}
}
