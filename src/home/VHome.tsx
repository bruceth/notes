import React from 'react';
import { CHome } from './CHome';
import { VPage, Page, FA } from 'tonva';

export class VHome extends VPage<CHome> {
	render() {
		let {cNode} = this.controller;
		let right = <button onClick={cNode.showAddRNotePage} className="btn btn-success btn-sm mr-1">
			<FA name="plus" /> 记事
		</button>;
		return <Page header="首页" right={right}>
			{cNode.renderListView()}
		</Page>;
	}
}
