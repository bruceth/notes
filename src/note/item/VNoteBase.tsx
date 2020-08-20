import React from "react";
import { VPage, User, Image, UserView, Page, EasyTime, FA } from "tonva";
import { CNoteItem, CheckItem } from "./CNoteItem";
import { observer } from "mobx-react";

export abstract class VNoteBase<T extends CNoteItem> extends VPage<T> {
	protected renderContent() {
		let {checkType} = this.controller;
		return <div>
		{
			checkType === 0 || checkType === 3 ? 
				this.renderContentText()
				: 
				checkType === 1 ? 
					this.renderCheckItems(true)
					:
					this.renderContentList()
		}
		</div>;
	}
	
	protected renderParagraphs(content:string):JSX.Element {
		if (!content) return;
		return <>{content.split('\n').map((v, index) => {
			let c:any;
			if (!v) {
				c = '\u00A0'; //<>&nbsp;</>;
			}
			else {
				c = '';
				let len = v.length, i=0;
				for (; i<len; i++) {
					switch(v.charCodeAt(i)) {
						case 0x20: c +='\u2000'; continue;
					}
					break;
				}
				c += v.substr(i);
			}
			return <div key={index} className="mb-3">{c}</div>;
		})}</>;
	}

	protected renderContentText() {
		return <div className="px-3 py-3">{this.renderParagraphs(this.controller.noteContent)}</div>;
	}

	protected renderContentList() {
		return React.createElement(observer(() => {
			let items = this.controller.items;
			return <ul className="note-content-list px-3 pb-2">
				{items.map((v, index) => {
					let {key, text} = v;
					return <li key={key} className="ml-3 pt-1 pb-2 align-items-center">
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
					checkedItems.length > 0 && <div className="border-top py-2">
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

	protected renderFrom = () => {
		let {owner, assigned, from, fromAssigned, $create, $update} = this.controller.noteItem;
		let contact:number, contactAssigned:string;
		if (from) {
			contact = from as number;
			contactAssigned = fromAssigned;
		}
		else {
			contact = owner as number;
			contactAssigned = assigned;
		}
		if (this.isMe(contact) === true) {
			return <div className="px-3 pt-2 pb-1 small">{this.renderEditTime()}</div>
		}

		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <div className="d-flex pt-2 pb-3">
				<div className="px-3 pt-1">
					<Image className="w-2-5c h-2-5c" src={icon || '.user-o'} />
				</div>
				<div>
					<div><b className="small font-weight-bolder">{assigned || nick || name}</b></div>
					<div className="small">{this.renderEditTime()}</div>
				</div>
			</div>
		}
		return <UserView user={contact} render={renderUser} />;
	}

	protected renderEditTime() {
		let {$create, $update} = this.controller.noteItem;
		let create:Date = $create;
		let update:Date = $update;
		if (create && update) {
			let time:Date, action:any;
			if (update.getTime() - create.getTime() > 60*1000) {
				action = <FA className="mr-1" name="pencil-square-o" />;
				time = update;
			}
			else {
				time = create;
			}
			return <small className="text-muted">
				{action}
				<span><EasyTime date={time} /></span>
			</small>
		}
	}

	protected renderToCount = () => {
		let {toCount} = this.controller;
		if (toCount === undefined || toCount <= 0)
			return;
		return <span className="mr-5 text-muted">
			<FA className="mr-2" name="share"/><small className="">{toCount}</small> 
		</span>;
	}

	protected renderSpawnCount = () => {
		let {spawnCount} = this.controller;
		if (spawnCount === undefined || spawnCount <= 0)
			return;
		return  <span className="mr-5 text-muted">
			<FA className="mr-2" name="hand-pointer-o"/><small className="">{spawnCount}</small>
		</span>;
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
		return <span onClick={this.onSendNote} className="cursor-pointer text-primary mr-5">
			<FA name="share" />
		</span>;
	}

	private onSendNote = async () => {
		await this.controller.cApp.loadRelation();
		this.controller.showTo(2);
	}

	protected renderEditButton() {
		return <span onClick={()=>this.onEdit()} className="cursor-pointer text-primary mr-3">
			<FA name="pencil-square-o" />
		</span>;
	}

	protected onEdit() {}

	protected renderCommentButton() {
		return <span className="cursor-pointer text-primary mr-5" onClick={this.onComment}><FA name="comment-o" /></span>;
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
}
