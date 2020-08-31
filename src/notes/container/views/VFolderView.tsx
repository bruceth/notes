import React from 'react';
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { VNoteBase } from '../../noteBase';
import { CContainer } from '../CContainer';
import { VFolderRelatives } from './VFolderRelatives';

export class VFolderView extends VNoteBase<CContainer> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		let {noteItem} = this.controller;
		if (noteItem) {
			return noteItem.caption;
		}
		return this.t('notes')
	}

	/*
	content() {
		return React.createElement(observer(() => {
			return <div className="">
				<div className="bg-white">
					{this.renderViewTop()}
					{this.renderViewCaption()}
					{this.renderContent()}
				</div>
				{this.renderBottomCommands()}
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderRelatives() {
		return this.renderVm(VFolderRelatives);
	}
	*/

	protected renderBottomCommands() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-end">
			{this.renderShareButton()}
		</div>;
	}

	protected onEdit() {
		this.openVPage(VEdit);
	}
}
