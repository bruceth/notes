import React from 'react';
import { observer } from 'mobx-react';
import { User, Image, UserView, FA } from "tonva";
import { CNote } from "../CNote";
import { VNoteBase } from '../../noteBase';

export interface TabRelative {
	name: string;
	caption: (isAction:boolean) => JSX.Element;
	render: () => JSX.Element;
}

export class VRelativesBase<T extends CNote> extends VNoteBase<T> {
	protected tabComment:TabRelative = {
		name: 'comment',
		caption: (isAction:boolean) => {
			let {commentCount} = this.controller.noteItem;
			let vCount:any;
			if (commentCount > 0) vCount = <small>{commentCount}</small>;
			return <>
				<FA className="mr-2" name="comment-o" /> 
				{vCount}
			</>
		},
		render: () => this.controller.renderCommentsList()
	}

	protected tabShare:TabRelative = {
		name: 'share',
		caption: (isAction:boolean) => {
			let {toCount} = this.controller.noteItem;
			let vCount:any;
			if (toCount > 0) vCount = <small>{toCount}</small>;
			return <>
				<FA className="mr-2" name="share" /> 
				{vCount}
			</>;
		},
		render: () => {
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

	protected tabFlow:TabRelative = {
		name: 'flow',
		caption: (isAction:boolean) => {
			return <>流程</>;
		},
		render: () => {
			let {flow} = this.controller.noteModel;
			if (!flow || flow.length === 0) return;
			return <div>flow: {flow.length}</div>
		}
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
	/*
	protected getRelativeFromTab(key: RelativeKey):TabRelative {
		switch (key) {
			case 'comment': return {caption: this.tabComment, render: this.renderComments};
			case 'to': return {caption: this.tabShare, render: this.renderShare};
			case 'flow': return {caption: this.tabFlow, render: this.renderFlow};
			case 'contain': return {caption: this.tabContain, render: this.renderContain};
			//case 'spawn': return {caption: this.tabSpawn, render: this.renderSpawn};
		}
	}*/

	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare, this.tabFlow] };

	protected renderTabs():JSX.Element {
		let render = observer(() => {
			let {activeRelativeTab} = this.controller;
			let tabs = this.tabs;
			let tab = tabs.find(v => v.name === activeRelativeTab);
			if (!tab) tab = tabs[0];
			return <div className="bg-white">
				<div className="d-flex px-3 pt-3">
					{tabs.map(v => {
						let {name, caption} = v;
						let isActive = name === activeRelativeTab;
						return this.renderTab(isActive, name, caption(isActive));
					})}
				</div>
				<div className="border-top" style={{marginTop: '-1px'}}>
					{tab.render() || <div className="p-3 text-muted small">[无]</div>}
				</div>
			</div>
		});
		return React.createElement(render);
	}

	render():JSX.Element {
		return this.renderTabs();
	}

	private renderTab(isAction:boolean, tabName:string, tabContent:any) {
		let cn:string;
		if (isAction === true) {
			cn = ' bg-white border-left border-top border-right rounded-top';
		}
		else {
			cn = ' bg-light text-muted';
		}
		return <div key={tabName}
			className={'px-3 py-2 cursor-pointer' + cn}
			onClick={()=>this.controller.activeRelativeTab = tabName}>
			{tabContent}
		</div>;
	}

	/*
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
	*/
}

export class VNoteRelatives extends VRelativesBase<CNote> {
}