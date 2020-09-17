import React from 'react';
import { VPage, Page } from 'tonva';
import { CHome } from './CHome';

export class VHome extends VPage<CHome> {
	render() {
		let {cNodes} = this.controller;
		let right = this.controller.cNodes.renderHomeDropDown();
		return <Page header={this.t('home')} right={right}>
			{cNodes.renderNotesView()}
		</Page>;
	}
}
