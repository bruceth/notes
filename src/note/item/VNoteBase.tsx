import React from "react";
import classNames from 'classnames';
import { VPage, User, Image, UserView, Page, List, LMR, EasyTime, FA } from "tonva";
import { CNoteItem, CheckItem } from "./CNoteItem";
import { observer } from "mobx-react";
import { NoteItem } from "note/model";
import { VEdit } from "note/text/VEdit";

export abstract class VNoteBase<T extends CNoteItem> extends VPage<T> {
	protected renderContent() {
		return <div className="px-3">{this.controller.noteContent?.split('\n').map((v, index) => {
			let c = !v? <>&nbsp;</>: v;
			return <div key={index}>{c}</div>;
		})}</div>;
	}

	protected renderCheckItems(checkable:boolean) {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.controller.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, checkable))}
				{
					checkedItems.length > 0 && <div className="border-top pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderCheckItem(v, checkable))}
					</div>
				}
			</div>;
		}));
	}

	protected renderCheckItem(v:CheckItem, checkable:boolean) {
		let {key, text, checked} = v;
		let cn = 'form-control-plaintext ml-3 ';
		let content: any;
		if (checked === true) {
			cn += 'text-muted';
			content = <del>{text}</del>;
		}
		else {
			content = text;
		}
		return <div key={key} className="d-flex mx-3 my-0 align-items-center form-group form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				data-key={key}
				disabled={!checkable} />
			<div className={cn}>{content}</div>
		</div>;
	}

	protected renderContact = (userId:number, assigned:string) => {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1-5c h-1-5c mr-2" src={icon || '.user-o'} />
				{name} {nick} {assigned}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}

	protected renderFrom = (className?:string) => {
		let {owner, assigned, from} = this.controller.noteItem;
		let contact = (from? from : owner) as number;
		return <div className={classNames('d-flex assign-items-center small text-muted', className)}>
			来自：{this.renderSmallContact(contact, assigned)}
		</div>;
	}

	private renderSmallContact = (userId:number, assigned:string) => {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1c h-1c mr-2" src={icon} />
				{name} {nick} {assigned}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}

	protected renderTo() {
		let {to} = this.controller.noteModel;
		if (!to || to.length === 0) return;
		return <div className="px-3 py-2">
			<small className="text-muted mr-3">已分享给: </small>
			{to.map((t, index) => {
				let {user, assigned} = t;
				return <span key={index} className="mr-3">{this.renderContact(user, assigned)}</span>;
			})}
		</div>
	}

	protected renderFlow() {
		let {flow} = this.controller.noteModel;
		if (!flow || flow.length === 0) return;
		return <div>flow: {flow.length}</div>
	}

	private renderSpawnItem = (item:NoteItem, index:number):JSX.Element => {
		let {caption, $create, $update, owner, assigned} = item;
		let divOwner = this.renderContact(owner as number, assigned);
		let right = <small className="text-muted"><EasyTime date={$update} /></small>;
		return <div className="px-3 py-2 d-block">
			<LMR right={right}>
				<span className="mr-3">{divOwner}</span>{caption}
			</LMR>
		</div>;
	}

	protected renderSpawn() {
		let {spawn} = this.controller.noteModel;
		if (!spawn || spawn.length === 0) return;
		return <div className="pb-3">
			<div className="px-3 pt-2 pb-1 text-muted small">已派发任务</div>
			<List
				items={spawn} 
				item={{render: this.renderSpawnItem,  className: "notes"}} />
		</div>
	}

	protected renderContain() {
		let {contain} = this.controller.noteModel;
		if (!contain || contain.length === 0) return;
		return <div>contain: {contain.length}</div>
	}

	protected renderRelatives() {
		return <div>
			{this.renderTo()}
			{this.renderFlow()}
			{this.renderSpawn()}
			{this.renderContain()}
		</div>
	}

	protected showActionEndPage({content, onClick}:{content:any; onClick?:()=>void}) {
		this.openPage(() => {
			onClick = onClick || (()=>this.closePage());
			let {title} = this.controller;
			return <Page header={title} back="close">
				<div className="border bg-white rounded m-5">
					<div className="py-5 text-center">
						{content}
					</div>
					<div className="border-top text-center py-3">
						<button className="btn btn-outline-info" onClick={onClick}>返回</button>
					</div>
				</div>
			</Page>;
		});
	}

	protected renderSendToButton() {
		return <button onClick={this.onSendNote}
			className="btn btn-outline-primary mr-3">
			发给
		</button>;
	}

	private onSendNote = async () => {
		await this.controller.cApp.loadRelation();
		this.closePage();
		this.controller.showTo();
	}

	protected renderEditButton() {
		return <div onClick={()=>this.onEdit()} className="px-1 py-2 cursor-pointer text-primary mr-3">
			<FA name="pencil-square-o" />
		</div>;
	}

	protected onEdit() {}
}
