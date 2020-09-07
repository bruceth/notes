import React from 'react';
import { observer } from 'mobx-react';
//import { observable } from 'mobx';
import { VPage, FA, UserView, Image, User } from "tonva";
import { none } from 'tool';
import { Contact } from '../../../model';
import { SelectContactOptions } from '../../views';
import { CNoteAssign } from "./CNoteAssign";
import { CAssignTo } from './CAssignTo';
//import { TaskParam } from './VTaskView';

export interface Row {
	label: string;
	values?: any;
	onClick?: () => void;
}

//const none = <small className="text-muted">[无]</small>;

export class VAssignParams extends VPage<CAssignTo> {
	private cNoteAssign: CNoteAssign;

	init() {
		this.cNoteAssign = this.controller.cNoteAssign;
	}

	header() {return '分派任务'}
	get back(): 'close'|'back'|'none' {return 'close';}

	private renderParam(param: Row) {
		let {label, values, onClick} = param;
		return <div key={label} className="px-3 py-2 bg-white d-flex cursor-pointer align-items-center border-bottom" onClick={onClick}>
			<div className="text-muted mr-3 w-5c">{label}</div>
			<div className="flex-fill mr-3 ">{values || none}</div>
			<FA className="ml-auto" name="angle-right" />
		</div>
	}

	content() {
		let rows: Row[] = [
			//{label: '执行人', values: this.renderContacts(), onClick: this.onClickContacts}, 
			{label: '分值', values: this.renderPoint()}, 
			{label: '工时', values: this.renderHours()}, 
			{label: '检查人', values: this.renderChecker(), onClick: this.onClickChecker}, 
			{label: '评价人', values: this.renderRater(), onClick: this.onClickRater}, 
		];
		//let {owner} = this.controller;
		return <div className="py-2">
			{this.cNoteAssign.renderDirItem(0)}
			{rows.map(v => this.renderParam(v))}
			<div className="px-3 py-2"><button className="btn btn-primary" onClick={this.controller.onSendOut}>发送</button></div>
		</div>;
	}

	/*
	private onSendTask = async () => {
		await this.controller.assignTask({
			contacts: this.contacts,
			checker: this.checker,
			rater: this.rater,
			point: this.point,
			hours: this.hours,
		});
		this.closePage(2);
		this.controller.owner.showSentPage();
	}
	*/

	private renderContact = (item:Contact, index?:number) => {
		if (!item) return none;
		let {contact, assigned} = item;
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1c h-1c mr-1" src={icon || '.user-o'} />
				<span className="mr-3">{assigned || nick || name}</span>
			</>;
		}
		return <UserView user={contact} render={renderUser} />;
	}

	/*
	private renderContacts() {
		return React.createElement(observer(() => {
			let contacts = this.contacts;
			if (!contacts || contacts.length === 0) return <small className="text-muted">请选择</small>;
			return <>{contacts.map((v, index) => {
				return <React.Fragment key={index}>{this.renderContact(v, index)}</React.Fragment>;
			})}</>;	
		}));
	}

	private onClickContacts = async () => {
		let options: SelectContactOptions = undefined; // {title: 'a', action: 'b', single: true};
		let contacts = await this.controller.owner.callSelectContact(options);
		this.closePage();
		this.contacts = contacts;
	}
	*/

	private renderPoint() {
		return <input className="flex-fill form-control border-0"
				type="number" step="1" min="1" defaultValue={this.cNoteAssign.point}
				onChange={this.onItemChange}
				onKeyDown={this.onItemKeyDown}/>;
	}

	private renderHours() {
		return <input className="flex-fill form-control border-0"
				type="number" step="1" min="1" defaultValue={this.cNoteAssign.hours}
				onChange={this.onHoursChange}
				onKeyDown={this.onHoursKeyDown}/>;
	}

	private onItemChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		this.cNoteAssign.point = Number(evt.currentTarget.value);
	}

	private onItemKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
	}

	private onHoursChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
		this.cNoteAssign.hours = Number(evt.currentTarget.value);
	}

	private onHoursKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
	}

	private renderChecker() {
		return React.createElement(observer(() => this.renderContact(this.cNoteAssign.checker)));
	}

	private onClickChecker = async () => {
		let options: SelectContactOptions = {title: '检查人', single: true};
		let contacts = await this.cNoteAssign.owner.callSelectContact(options);
		this.closePage();
		this.cNoteAssign.checker = contacts[0];

	}

	private renderRater() {
		return React.createElement(observer(() => this.renderContact(this.cNoteAssign.rater)));
	}

	private onClickRater = async () => {
		let options: SelectContactOptions = {title: '评价人', single: true};
		let contacts = await this.cNoteAssign.owner.callSelectContact(options);
		this.closePage();
		this.cNoteAssign.rater = contacts[0];
	}
}
