import React from 'react';
import { VPage, User, Image, UserView } from "tonva";
import { CNote } from "../CNote";
import { Contact } from 'model';

export abstract class VBasePage extends VPage<CNote> {
	protected renderContact = (userId:number, assigned:string) => {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1-5c h-1-5c mr-2" src={icon} />
				{assigned || nick || name}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}

	protected renderContactItem = (item:Contact, index:number) => {
		let {contact, assigned} = item;
		return <div className="px-3 py-2">
			{this.renderContact(contact, assigned)}
		</div>;
	}
}
