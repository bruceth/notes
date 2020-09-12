import React from 'react';
import { VFolderView } from '../views';
import { CSpace } from './CSpace';

export class VSpaceView extends VFolderView<CSpace> {
	header() {
		let {noteItem} = this.controller;
		if (noteItem) {
			return noteItem.caption;
		}
		return this.t('noteSpace')
	}

}
