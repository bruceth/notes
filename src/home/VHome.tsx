import React from 'react';
import { CHome } from './CHome';
import { VPage, Page, DropdownActions, DropdownAction } from 'tonva';

export class VHome extends VPage<CHome> {
	private actionAddNote = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId);
	}

	private actionAddList = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId);
	}

	private actionAddTask = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId);
	}

	private actionAddFolder = () => {
		let {cNode} = this.controller;
		cNode.showAddNotePage(cNode.currentFold.folderId);
	}

	private actionAddGroup = () => {
		let {cNode} = this.controller;
		cNode.showAddGroupPage();
	}

	private dropdownActions: DropdownAction[] = [
		{icon:'file', caption:this.t('notes'), action: this.actionAddNote, iconClass: 'text-primary', captionClass: 'text-primary'},
		{icon:'list', caption:'列表', action: this.actionAddList},
		{icon:'check-square-o', caption:'任务', action: this.actionAddTask},
		{icon:'folder', caption:'小单夹', action: this.actionAddFolder, iconClass: 'text-warning'},
		{icon:'users', caption:'群', action: this.actionAddGroup, iconClass: 'text-danger'},
	];

	render() {
		let {cNode} = this.controller;
		let right = <>
			<DropdownActions actions={this.dropdownActions} icon="plus" itemIconClass="text-info"
				className="cursor-pointer btn btn-lg text-white p-1 mr-1"/>
		</>;

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
