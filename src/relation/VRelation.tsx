import React from 'react';
import { CRelation } from './CRelation';
import { VPage, FA, List, UserView, User, Image } from 'tonva';
import { VAdd } from './VAdd';
import { Contact } from 'model';

export class VRelation extends VPage<CRelation> {
	header() {return '关系'}

	right() {
		return <button className="btn btn-sm btn-primary mr-1" onClick={()=>this.openVPage(VAdd)}>
			<FA name="user-plus" />
		</button>;
	}

	content() {
		return <div className="">
			<List items={this.controller.contacts} item={{render: this.renderContact}} />
		</div>
	}

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
}
