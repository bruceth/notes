import React from "react";
import { VPage, User, Image, UserView, Page, EasyTime, FA } from "tonva";
import { CNoteBase } from "./CNoteBase";

//type RenderIcon = (noteItem:NoteItem) => JSX.Element;

export function renderIcon(name:string, cn:string) {
	return <FA name={name} size="lg" className={cn} fixWidth={true} />;
}

export abstract class VNoteBase<T extends CNoteBase> extends VPage<T> {
	protected renderContentBase() {
		return this.controller.cContent.renderContent();
	}

	protected renderContent() {
		return this.renderContentBase();
	}

	protected renderItemContent() {
		return this.renderContentBase();
	}

	protected renderItemTop() {
		return <div className="d-flex px-3 py-2 align-items-center border-top">
			{this.controller.renderItemIcon()}
			{this.renderFrom()}
			<div className="ml-auto">{this.renderEditTime()}</div>
		</div>;
		//<div className="mr-3 unread-dot">{this.controller.renderItemIcon()}{dot}</div>
	}

	protected renderViewCaption() {
		let {title} = this.controller;
		if (title) {
			return <div className="px-3 py-2">
				<div><b>{title}</b></div>
			</div>;
		}
	}

	protected renderItemCaption() {
		
	}
	
	protected renderViewTop() {
		let vEditButton:any;
		let isMe = this.isMe(this.controller.noteItem.owner);
		if (isMe === true) {
			vEditButton = <div className="ml-auto">{this.renderEditButton()}</div>;
		}
		return <div className="d-flex px-3 py-2 align-items-center border-top border-bottom bg-light">
			{this.controller.renderViewIcon()}
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

	/*
	protected renderContentText() {
		return <div className="px-3 my-2">{this.renderParagraphs(this.controller.noteContent)}</div>;
	}
	*/

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

	protected onSendNote = async () => {
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
