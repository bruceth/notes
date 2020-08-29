import React from 'react';
import { observer } from 'mobx-react';
import { EasyTime, User, Image, UserView, FA, Page, List, LMR } from "tonva";
import { CNoteBase } from "./CNoteBase";
import { CommentItem, RelativeKey, Relative, NoteItem } from '../model';
import { VNoteBase } from './VNoteBase';
import { GetTaskStateContent } from 'notes/note/task/TaskState';

export class VRelatives<T extends CNoteBase> extends VNoteBase<T> {
	private renderTab(isAction:boolean, key:RelativeKey, tabContent:any) {
		let cn:string;
		if (isAction === true) {
			cn = ' bg-white border-left border-top border-right rounded-top';
		}
		else {
			cn = ' bg-light text-muted';
		}
		return <div key={key} className={'px-3 py-2 cursor-pointer' + cn} onClick={()=>this.controller.relativeKey = key}>
			{tabContent}
		</div>;
	}

	protected tabComment = (isAction:boolean) => {
		let {commentCount} = this.controller.noteItem;
		let vCount:any;
		if (commentCount > 0) vCount = <small>{commentCount}</small>;
		return <>
			<FA className="mr-2" name="comment-o" /> 
			{vCount}
		</>;
	}
	protected renderComments = () => {
		let {comments} = this.controller.noteModel;
		let {length} = comments;
		if (length === 0) return;
		return <div className="py-3">
			{comments.map(v => this.renderComment(v))}
			{
				length >= 10 && <div className="px-3 pt-3 cursor-pointer text-primary text-right small"
				onClick={this.showMoreComments}>更多评论...</div>
			}
		</div>;
	}
	private showMoreComments = () => {
		this.openPageElement(<Page header="评论">
			<div className="text-muted p-3">更多评论正在开发中...</div>
		</Page>);
	}

	protected tabShare = (isAction:boolean) => {
		let {toCount} = this.controller.noteItem;
		let vCount:any;
		if (toCount > 0) vCount = <small>{toCount}</small>;
		return <>
			<FA className="mr-2" name="share" /> 
			{vCount}
		</>;
	}
	protected renderShare = () => {
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

	protected tabFlow = (isAction:boolean) => {
		return <>流程</>;
	}
	protected renderFlow = () => {
		let {flow} = this.controller.noteModel;
		if (!flow || flow.length === 0) return;
		return <div>flow: {flow.length}</div>
	}

	protected tabSpawn = (isActive:boolean) => {
		return <>派生</>;
	}
	protected renderSpawn = () => {
		let {spawn} = this.controller.noteModel;
		if (!spawn || spawn.length === 0) return;
		return <List
			items={spawn} 
			item={{render: this.renderSpawnItem,  className: "notes"}} />
	}

	protected renderSpawnState(type:number, state:number) {
		let ss = GetTaskStateContent(type, state);
		if (ss === undefined)
			return;
		let {content, isEnd} = ss;

		return this.renderStateSpan(content, isEnd);
	}

	protected renderSpawnItem = (item:NoteItem, index:number):JSX.Element => {
		let {caption, $update, owner, assigned, type, state} = item;
		let divOwner = this.renderContact(owner as number, assigned);
		let right = <small className="text-muted"><EasyTime date={$update} /></small>;
		return <div className="px-3 py-2 d-block bg-white">
			<LMR right={right}>
				<span className="mr-3">{divOwner}</span>{caption}
				<span className="ml-3">{this.renderSpawnState(type, state)}</span>
			</LMR>
		</div>;
	}

	protected tabContain = (isActive:boolean) => {
		return <>包含</>;
	}
	protected renderContain = () => {
		let {contain} = this.controller.noteModel;
		if (!contain || contain.length === 0) return;
		return <div>contain: {contain.length}</div>
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
	/*
	protected tabs:{[key in RelativeKey]:Relative} = {
		'comment': {caption: this.tabComment, render: this.renderComments},
		'to': {caption: this.tabShare, render: this.renderShare},
		'flow': {caption: this.tabFlow, render: this.renderFlow},
		'spawn': {caption: this.tabSpawn, render: this.renderSpawn},
		'contain': {caption: this.tabContain, render: this.renderContain},
	}
	*/
	protected getRelativeFromTab(key: RelativeKey):Relative {
		switch (key) {
			case 'comment': return {caption: this.tabComment, render: this.renderComments};
			case 'to': return {caption: this.tabShare, render: this.renderShare};
			case 'flow': return {caption: this.tabFlow, render: this.renderFlow};
			case 'contain': return {caption: this.tabContain, render: this.renderContain};
			case 'spawn': return {caption: this.tabSpawn, render: this.renderSpawn};
		}
	}

	protected arr:RelativeKey[] = ['comment', 'to', 'flow', 'spawn', 'contain'];

	render():JSX.Element {
		let render = observer(() => {
			let {relativeKey} = this.controller;
			if (relativeKey === undefined) {relativeKey = 'comment'}
			let relative = this.getRelativeFromTab(relativeKey);
			if (!relative) debugger;
			return <div className="bg-white">
				<div className="d-flex px-3 pt-3">
					{this.arr.map(v => {
						let tabRelative = this.getRelativeFromTab(v);
						if (!tabRelative) debugger;
						let {caption} = tabRelative;
						let isActive = v === relativeKey;
						return this.renderTab(isActive, v, caption(isActive));
					})}
				</div>
				<div className="border-top" style={{marginTop: '-1px'}}>
					{relative.render() || <div className="p-3 text-muted small">[无]</div>}
				</div>
			</div>
		});
		return React.createElement(render);
	}

	protected renderComment(comment:CommentItem) {
		let {id, owner, assigned, content, $update} = comment;
		let renderUser = (user:User) => {
			let {id, name, nick} = user;
			let isMe = this.isMe(id);
			let userName:string, cn:string;
			if (isMe === true) {
				cn = 'text-success';
				userName = '[我]';
			}
			else {
				cn = 'text-primary-dark';
				userName = assigned || nick || name;
			}
			let divUserName = <span className={cn + ' mr-2'}>{userName}:</span>;
			// <Image className="w-1-5c h-1-5c mx-3" src={icon || '.user-o'} />
			// <div className="small mb-3">{divUserName}</div>
			return <div className="mt-1 d-flex bg-white pt-2">
				<div className="mx-3">
					<div className="small text-muted"><EasyTime date={$update} /></div>
					<div className="">{this.renderCommentContent(divUserName, content)}</div>
				</div>
			</div>
		}
		return <UserView key={id} user={owner} render={renderUser} />;
	}
	
	protected renderCommentContent(vUser:any, content:string):JSX.Element {
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
			if (index === 0) c = <>{vUser}{c}</>;
			return <div key={index} className="pb-1">{c}</div>;
		})}</>;
	}
}
