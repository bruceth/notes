import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { VBasePage } from './VBasePage';
import { List, User, Image, UserView, FA } from 'tonva';
import { Contact } from 'model';
import { VActions } from './VActions';
import { CNote } from 'note/CNote';

export class VTo extends VBasePage<CNote> {
	protected backPageCount = 2;

	init(param?:any):void {
		if (param) {
			this.backPageCount = Number(param);
		}	
	}

	@observable private anySelected:boolean = false;
	private list: List;

	protected get back(): 'close' | 'back' | 'none' {return 'close'}

	header() {return '收件人'}
	right():any {
		let c = observer(() => <button className="btn btn-sm btn-primary mr-1" onClick={this.onNext} disabled={!this.anySelected}>
			下一步 <FA name="angle-right" />
		</button>);
		return React.createElement(c);
	}
	content() {
		let items = this.controller.cApp.contacts;
		return <div className="">
			<List ref={v => this.list = v}
				items={items} 
				item={{render:this.renderContactItem, onSelect:this.onContactSelect}} />
		</div>
	}

/*
	private renderContact = (item:Contact, index:number) => {
		let {contact, assigned} = item;
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <div className="px-3 py-2">
				<Image className="w-2c h-2c mr-3" src={icon} />
				{name} {nick} {assigned}
			</div>
		}
		return <UserView user={contact} render={renderUser} />;
	}
*/
	private onContactSelect = (item:Contact, isSelected:boolean, anySelected:boolean):void => {
		this.anySelected = anySelected;
	}

	private onNext = () => {
		let contacts = this.list.selectedItems;
		this.controller.contacts = contacts;
		this.openVPage(VActions, this.backPageCount + 1); //, {contacts, noteId: this.currentNoteId});
	}
}
