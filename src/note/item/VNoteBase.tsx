import React from "react";
import classNames from 'classnames';
import { VPage, User, Image, UserView, Page, List, LMR, EasyTime, FA } from "tonva";
import { CNoteItem, CheckItem } from "./CNoteItem";
import { observer } from "mobx-react";
import { NoteItem } from "note/model";

export abstract class VNoteBase<T extends CNoteItem> extends VPage<T> {
	protected renderContent() {
		let {checkType} = this.controller;
		return <div>
		{
			checkType === 0 ? 
				this.renderContentText()
				: 
				checkType === 1 ? 
					this.renderCheckItems(true)
					:
					this.renderContentList()
		}
		</div>;
	}

	protected renderContentText() {
		return <div className="px-3 py-3">{this.controller.noteContent?.split('\n').map((v, index) => {
			let c = !v? <>&nbsp;</>: v;
			return <div key={index}>{c}</div>;
		})}</div>;
	}

	protected renderContentList() {
		return React.createElement(observer(() => {
			let items = this.controller.items;
			return <ul className="note-content-list px-3">
				{items.map((v, index) => {
					let {key, text} = v;
					return <li key={key} className="ml-3 py-2 align-items-center">
						{text}
					</li>
				})}
			</ul>;
		}));
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
				{assigned || nick || name}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}

	protected renderFrom = (className?:string) => {
		let {owner, assigned, from, fromAssigned} = this.controller.noteItem;
		let contact:number, contactAssigned:string;
		if (from) {
			contact = from as number;
			contactAssigned = fromAssigned;
		}
		else {
			contact = owner as number;
			contactAssigned = assigned;
		}
		if (this.isMe(contact) === true) return;
		return <div className={classNames('d-flex assign-items-center small text-muted', className)}>
			来自：{this.renderSmallContact(contact, contactAssigned)}
		</div>;
	}

	protected renderToCount = (className?:string) => {
		let {toCount} = this.controller;
		if (toCount === undefined || toCount <= 0)
			return;
		return <div className={classNames('d-flex assign-items-center small text-muted', className)}>
			分享:{toCount}
		</div>;
	}

	protected renderSpawnCount = (className?:string) => {
		let {spawnCount} = this.controller;
		if (spawnCount === undefined || spawnCount <= 0)
			return;
		return <div className={classNames('d-flex assign-items-center small text-muted', className)}>
			任务:{spawnCount}
		</div>;
	}

	private renderSmallContact = (userId:number, assigned:string) => {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1c h-1c mr-2" src={icon || '.user-o'} />
				{assigned || nick || name}
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
		this.controller.showTo(2);
	}

	protected renderEditButton() {
		return <div onClick={()=>this.onEdit()} className="px-1 py-2 cursor-pointer text-primary mr-3">
			<FA name="pencil-square-o" />
		</div>;
	}

	protected onEdit() {}

	protected renderCommentButton() {
		return <span className="cursor-pointer text-primary" onClick={this.onComment}><FA name="comment-o" /></span>;
	}

	private onComment = () => {
		let right = <button className="btn btn-sm btn-success mr-1" onClick={this.onCommentSubmit}>提交</button>;
		this.openPageElement(<Page header="说明" right={right}>
			<textarea rows={10} 
				className="w-100 border-0 form-control" 
				placeholder="请输入" maxLength={20000}
				defaultValue={this.controller.noteContent}
				onChange={this.onCommentChange} />
		</Page>);
	}

	private comment:string;
	private onCommentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.comment = evt.target.value;
	}

	private onCommentSubmit = async () => {
		await this.controller.AddComment(this.comment);
		this.closePage();
	}

	protected renderComments() {
		let {comments} = this.controller.noteModel;
		return <div className="py-3">{
			comments.map((v, index) => {
				let {owner, assigned, content} = v;
				let renderUser = (user:User) => {
					let {name, nick, icon} = user;
					return <div key={index} className="mt-1 d-flex bg-white py-2">
						<Image className="w-2c h-2c mx-3" src={icon || '.user-o'} />
						<div className="mr-3">
							<div>{assigned || nick || name}</div>
							<div className="mt-2">{
								content?.split('\n').map((v, index) => {
										let c = !v? <>&nbsp;</>: v;
										return <div key={index}>{c}</div>;
									})}
							</div>
						</div>
					</div>
				}
				return <UserView key={index} user={owner} render={renderUser} />;
			})
		}</div>;
	}
}
