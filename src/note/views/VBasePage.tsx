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
				{name} {nick} {assigned}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}

	protected renderContactItem = (item:Contact, index:number) => {
		let {contact, assigned} = item;
		return <div className="px-3 py-2">
			{this.renderContact(contact, assigned)}
		</div>;
		/*
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <div className="px-3 py-2">
				<Image className="w-2c h-2c mr-3" src={icon} />
				{name} {nick} {assigned}
			</div>
		}
		return <UserView user={contact} render={renderUser} />;
		*/
	}
}
