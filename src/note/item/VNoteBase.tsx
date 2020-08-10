import React from "react";
import classNames from 'classnames';
import { VPage, User, Image, UserView, Page } from "tonva";
import { CNoteItem, CheckItem } from "./CNoteItem";
import { observer } from "mobx-react";

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
				<Image className="w-1-5c h-1-5c mr-2" src={icon} />
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
}
