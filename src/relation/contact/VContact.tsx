import React from "react";
import { CContact } from "./CContact";
import { VPage, UserView, Image, FA, Muted, User } from "tonva";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { Contact } from "model";

export class VEditAssigned extends VPage<CContact> {
	private contact:Contact;
	@observable private assigned:string;

	init(param:Contact) {
		this.contact = param;
		this.assigned = param?.assigned;
	}

	@computed protected get btnSaveDisabled():boolean {
		return this.assigned === this.contact.assigned;
	}

	header() {
		return '联系人';
	}


	content() {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <div className="py-2">
				<Image className="w-1-5c h-1-5c mr-2" src={icon} />
				{nick || name}
			</div>
		}
		return <div className="m-2">
			<UserView user={this.contact.contact as number} render={renderUser} />
		</div>;
	}
}