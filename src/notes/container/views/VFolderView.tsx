import React from 'react';
import { VEdit } from './VEdit';
import { VNoteBase } from '../../noteBase';
import { CContainer } from '../CContainer';

export class VFolderView extends VNoteBase<CContainer> {
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
}
