import React from 'react';
import { EasyTime, LMR, List, User, Image, UserView } from "tonva";
import { CNoteItem } from "./CNoteItem";
import { observable } from 'mobx';
import { NoteItem, CommentItem } from 'note/model';
import { observer } from 'mobx-react';
import { VNoteBase } from './VNoteBase';

type RelativeKey = 'comment'|'to'|'flow'|'spawn'|'contain';
interface Relative {
	caption: string;
	render: () => JSX.Element;
}

export class VRelatives<T extends CNoteItem> extends VNoteBase<T> {
	protected renderComments = () => {
		let {comments} = this.controller.noteModel;
		if (comments.length === 0) return;
		return <div className="py-3">{
			comments.map(v => this.renderComment(v))
		}</div>;
	}

	protected renderTo = () => {
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

	protected renderFlow = () => {
		let {flow} = this.controller.noteModel;
		if (!flow || flow.length === 0) return;
		return <div>flow: {flow.length}</div>
	}

	private renderSpawnItem = (item:NoteItem, index:number):JSX.Element => {
		let {caption, $create, $update, owner, assigned} = item;
		let divOwner = this.renderContact(owner as number, assigned);
		let right = <small className="text-muted"><EasyTime date={$update} /></small>;
		return <div className="px-3 py-2 d-block bg-white">
			<LMR right={right}>
				<span className="mr-3">{divOwner}</span>{caption}
			</LMR>
		</div>;
	}

	protected renderSpawn = () => {
		let {spawn} = this.controller.noteModel;
		if (!spawn || spawn.length === 0) return;
		return <List
			items={spawn} 
			item={{render: this.renderSpawnItem,  className: "notes"}} />
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

	private tabs:{[key in RelativeKey]:Relative} = {
		'comment': {caption: '评论', render: this.renderComments},
		'to': {caption: '分享', render: this.renderTo},
		'flow': {caption: '流程', render: this.renderFlow},
		'spawn': {caption: '派生', render: this.renderSpawn},
		'contain': {caption: '包含', render: this.renderContain},
	}
	private arr:RelativeKey[] = ['to', 'flow', 'spawn', 'contain', 'comment'];
	@observable private relativeCur: RelativeKey = 'to';
	render():JSX.Element {
		let render = observer(() => {
			return <div className="bg-white">
				<div className="d-flex px-3 pt-3 border-bottom">
					{this.arr.map(v => {
						let {caption} = this.tabs[v];
						let cn:string;
						if (v === this.relativeCur) {
							cn = ' bg-white border-left border-top border-right';
						}
						else {
							cn = ' bg-light text-muted';
						}
						return <div key={v} className={'px-3 py-2 cursor-pointer' + cn} onClick={()=>this.relativeCur = v}>
							{caption}
						</div>;
					})}
				</div>
				<div className="py-3">
					{this.tabs[this.relativeCur].render() || <small className="px-3 text-muted">[无]</small>}
				</div>
			</div>
		});
		return React.createElement(render);
	}

	protected renderComment(comment:CommentItem) {
		let {id, owner, assigned, content, $update} = comment;
		let renderUser = (user:User) => {
			let {id, name, nick, icon} = user;
			let isMe = this.isMe(id);
			let divUserName:any;
			if (isMe === true) {
				divUserName = <span className="text-success">[自己]</span>
			}
			else {
				divUserName = assigned || nick || name;
			}
			return <div className="mt-1 d-flex bg-white pt-2">
				<Image className="w-1-5c h-1-5c mx-3" src={icon || '.user-o'} />
				<div className="mr-3">
					<div className="small mb-3">{divUserName}</div>
					<div className="mt-2">{this.renderParagraphs(content)}</div>
					<div className="py-1 small text-muted"><EasyTime date={$update} /></div>
				</div>
			</div>
		}
		return <UserView key={id} user={owner} render={renderUser} />;
	}
}
