import React from 'react';
import { CHome } from './CHome';
import { VPage, Page, DropdownActions, DropdownAction } from 'tonva';

export class VHome extends VPage<CHome> {
/*
	private actionAddNote = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId, 0);
	}

	private actionAddList = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId, 2);
	}

	private actionAddAssign = () => {
		let {cNode} = this.controller;
		cNode.showAddAssignPage(cNode.currentFold.folderId);
	}

	private actionAddFolder = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId, 3);
	}

	private actionAddGroup = () => {
		let {cNode} = this.controller;
		cNode.showAddGroupPage();
	}

	private dropdownActions: DropdownAction[] = [
		{icon:'file-o', caption:this.t('noteText'), action: this.actionAddNote, captionClass: 'text-primary'},
		{icon:'list', caption:this.t('noteList'), action: this.actionAddList},
		{icon:'check-square-o', caption:this.t('noteCheckable'), action: this.actionAddAssign},
		{icon:'hand-pointer-o', caption:this.t('noteTask'), action: this.actionAddAssign, iconClass: 'text-primary', },
		{icon:'folder', caption:this.t('noteFolder'), action: this.actionAddFolder, iconClass: 'text-warning'},
		{icon:'users', caption:this.t('noteSpace'), action: this.actionAddGroup, iconClass: 'text-danger'},
	];
*/
	render() {
		let {cNode} = this.controller;
		let right = this.controller.cNode.renderHomeDropDown();
		/*
		<>
			<DropdownActions actions={this.dropdownActions} icon="plus" itemIconClass="text-info"
				className="cursor-pointer btn btn-lg text-white p-1 mr-1"/>
		</>;*/

		return <Page header={this.t('home')} right={right}>
			{cNode.renderListView()}
		</Page>;

		/*
		<button onClick={()=>cNode.showAddNotePage(cNode.currentFoldItem.folderId)} 
		className="btn btn-success btn-sm mr-1">
		<FA name="plus" /> {this.t('notes')}
		</button>
		*/
	}
}
