import React from "react";
import { VPage, User, Image, UserView, Page, EasyTime, FA } from "tonva";
import { CNoteBase } from "./CNoteBase";
import { observer } from "mobx-react";
import { EnumNoteType, NoteItem, CheckItem } from '../model';

type RenderIcon = (noteItem:NoteItem) => JSX.Element;

const itemIcons: {[key in EnumNoteType]: RenderIcon} = {
	[EnumNoteType.text]: (noteItem: NoteItem) => {
		let {toCount} = noteItem;
		let name = toCount>0? 'files-o': 'file-o';
		return <FA name={name} size="lg" className="text-info" fixWidth={true} />;
	},
	[EnumNoteType.task]: (noteItem: NoteItem) => {
		return <FA name="tasks" size="lg" className="text-success" fixWidth={true} />;
	},
	[EnumNoteType.folder]: (noteItem: NoteItem) => {
		return <FA name="folder" size="lg" className="text-warning" fixWidth={true} />;
	},
	[EnumNoteType.group]: (noteItem: NoteItem) => {
		return <FA name="folder" size="lg" className="text-warning" fixWidth={true} />;
	},
	[EnumNoteType.groupFolder]: (noteItem: NoteItem) => {
		return <FA name="folder" size="lg" className="text-warning" fixWidth={true} />;
	},
	[EnumNoteType.unit]: (noteItem: NoteItem) => {
		return <FA name="folder" size="lg" className="text-warning" fixWidth={true} />;
	},
	[EnumNoteType.assign]: (noteItem: NoteItem) => {
		return <FA name="tasks" size="lg" className="text-success" fixWidth={true} />;
	},
}
//<FA name="file-o" size="lg" className="text-info" />
//<FA name="folder" size="lg" className="text-warning mr-2" />

export abstract class VNoteBase<T extends CNoteBase> extends VPage<T> {
	protected renderContentBase(checkable:boolean) {
		let {checkType} = this.controller;
		return <div>
		{
			checkType === 0 || checkType === 3 ? 
				this.renderContentText()
				: 
				checkType === 1 ? 
					this.renderCheckItems(checkable)
					:
					this.renderContentList()
		}
		</div>;
	}

	protected renderContent() {
		return this.renderContentBase(false);
	}

	protected renderItemContent() {
		return this.renderContentBase(false);
	}

	protected renderItemTop() {
		let {noteItem} = this.controller;
		let {type, unread} = noteItem;
		let dot:any;
		if (unread>0) dot = <u/>;
		return <div className="d-flex px-3 py-2 align-items-center border-top">
			<div className="mr-3 unread-dot">{itemIcons[type](noteItem)}{dot}</div>
			{this.renderFrom()}
			<div className="ml-auto">{this.renderEditTime()}</div>
		</div>;
	}
	
	protected renderViewTop() {
		let {noteItem} = this.controller;
		let {type} = noteItem;
		let vEditButton:any;
		let isMe = this.isMe(this.controller.noteItem.owner);
		if (isMe === true) {
			vEditButton = <div className="ml-auto">{this.renderEditButton()}</div>;
		}
		return <div className="d-flex px-3 py-2 align-items-center border-top border-bottom bg-light">
			<div className="mr-3">{itemIcons[type](noteItem)}</div>
			<span className="mr-4">{this.renderEditTime()}</span>
			{this.renderFrom()}
			{vEditButton}
		</div>;
	}
	
	protected renderParagraphs(content:string):JSX.Element {
		if (!content) return;
		return <>{content.trimRight().split('\n').map((v, index) => {
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
			return <div key={index} className="pt-1 pb-2">{c}</div>;
		})}</>;
	}

	protected renderContentText() {
		return <div className="px-3 my-2">{this.renderParagraphs(this.controller.noteContent)}</div>;
	}

	protected renderContentList() {
		return React.createElement(observer(() => {
			let items = this.controller.items;
			return <ul className="note-content-list px-3 my-2">
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
			let doneItems:any;			
			let checkedCount = checkedItems.length;
			if (checkedCount > 0) {
				let cn:string, doneTop:any;
				if (checkable===true) {
					cn = 'border-top py-2';
					doneTop = <div className="px-3 pt-2 small text-muted">{checkedCount}项完成</div>;
				}
				doneItems = <div className={cn}>
					{doneTop}
					{checkedItems.map((v, index) => this.renderCheckItem(v, checkable))}
				</div>;
			}
			return <div className="mb-2">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, checkable))}
				{doneItems}
			</div>;
		}));
	}

	protected renderCheckItem(v:CheckItem, checkable:boolean) {
		let {key, text, checked} = v;
		let cn = 'ml-3 ';
		let content: any;
		let icon: string;
		if (checked === true) {
			cn += 'text-muted ';
			content = <del>{text}</del>;
			icon = 'check-square';
		}
		else {
			content = text;
			icon = 'square-o';
		}
		if (checkable === true) {
			return <div key={key} className="d-flex mx-3 align-items-center form-check">
				<input className="form-check-input mr-3 mt-0" type="checkbox"
					defaultChecked={checked}
					data-key={key} />
				<div className={'form-control-plaintext ' + cn}>{content}</div>
			</div>;
		}
		else {
			return <div key={key} className="d-flex mx-3 align-items-center">
				<FA name={icon} />
				<div className={'py-1 ' + cn}>{content}</div>
			</div>;
		}
	}

	protected renderFrom = () => {
		let {noteItem, disableFrom: disableOwnerFrom} = this.controller;
		if (!noteItem) return <div>noteItem undefined in renderFrom</div>;
		let {owner, assigned, from} = noteItem;
		let contact:number; //, contactAssigned:string;
		if (from) {
			contact = from as number;
			//contactAssigned = fromAssigned;
		}
		else {
			contact = owner as number;
			//contactAssigned = assigned;
		}
		if (disableOwnerFrom === false && this.isMe(contact) === false) {
			let renderUser = (user:User) => {
				let {name, nick, icon} = user;
				let vImage:any, cnName:string = 'font-weight-bolder';
				if (icon) {
					cnName += ' small'
					vImage = <Image className="w-1c h-1c mr-1" src={icon} />;
				}
				return <>
					{vImage} <b className={cnName}>{assigned || nick || name}</b>
				</>
			}
			return <UserView user={contact} render={renderUser} />;
		}
	}

	protected renderEditTime() {
		let {$create, $update} = this.controller.noteItem;
		let create:Date = $create;
		let update:Date = $update;
		if (create && update) {
			let time:Date, action:any;
			if (update.getTime() - create.getTime() > 60*1000) {
				action = <FA className="ml-1" name="pencil" />;
				time = update;
			}
			else {
				time = create;
			}
			return <small className="text-muted">
				<span><EasyTime date={time} /></span>
				{action}
			</small>
		}
	}

	protected renderToCount = () => {
		let {toCount} = this.controller.noteItem;
		if (toCount === undefined || toCount <= 0)
			return;
		return <span className="mr-5 text-muted">
			<FA className="mr-2" name="share"/><small className="">{toCount}</small> 
		</span>;
	}

	protected renderSpawnCount = () => {
		let {spawnCount} = this.controller.noteItem;
		if (spawnCount === undefined || spawnCount <= 0)
			return;
		return  <span className="mr-5 text-muted">
			<FA className="mr-2" name="hand-pointer-o"/><small className="">{spawnCount}</small>
		</span>;
	}

	protected renderCommentFlag = () => {
		let {commentCount, commentUnread} = this.controller.noteItem;
		if (commentCount === undefined || commentCount <= 0)
			return;
		let vCU:any;
		if (commentUnread > 0) {
			let cu:any = commentUnread>99? <>99<sup>+</sup></> : commentUnread;
			vCU = <div className="unread-num">{cu}</div>;
		};
		return  <span className="mr-5 text-muted position-relative">
			<FA className="mr-2" name="comment-o"/><small className="">{commentCount}</small>
			{vCU}
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

	protected renderShareButton() {
		return <span onClick={this.onSendNote} className="cursor-pointer text-primary mr-5">
			<FA name="share" />
		</span>;
	}

	private onSendNote = async () => {
		await this.controller.cApp.loadRelation();
		this.controller.showTo(2);
	}

	protected renderEditButton() {
		return <span onClick={()=>this.onEdit()} className="cursor-pointer text-primary">
			<FA name="pencil-square-o" />
		</span>;
	}
	
	protected renderStateSpan(content: string, isEnd: boolean = false) {
		if (isEnd === true) {
			return <span className="small text-danger"><FA className="small mr-1" name="stop" />{content}</span>;
		}
		return <span className="small text-success border border-success rounded px-2">{content}</span>;
	}

	protected onEdit() {}

	protected renderCommentButton() {
		return <span className="cursor-pointer text-primary mr-5" onClick={this.onComment}><FA name="comment-o" /></span>;
	}

	protected onComment = () => {
		let right = <button className="btn btn-sm btn-success mr-1" onClick={this.onCommentSubmit}>提交</button>;
		this.openPageElement(<Page header="评论" right={right}>
			<textarea rows={10} 
				className="w-100 border-0 form-control"
				placeholder="请输入" maxLength={20000}
				onChange={this.onCommentChange} />
		</Page>);
	}
	private comment:string;
	private onCommentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.comment = evt.target.value;
	}

	private onCommentSubmit = async () => {
		await this.controller.AddComment(this.comment);
		this.controller.relativeKey = 'comment';
		this.closePage();
	}
}
