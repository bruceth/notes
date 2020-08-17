import React from "react";
import { CRelation } from "./CRelation";
import { VPage, UserView, Image, FA, Muted, User } from "tonva";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { Contact } from "model";

export class VEditAssigned extends VPage<CRelation> {
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
		return '联系人备注名';
	}

	protected onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.assigned = evt.target.value.trim();
	}

	private onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			if (!this.btnSaveDisabled) {
				this.onButtonSave();
			}
		}
	}

	protected async onButtonSave(): Promise<void> {
		this.controller.SaveContactAssign(this.contact, this.assigned);
		this.closePage();
	}

	content() {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1-5c h-1-5c mr-2" src={icon} />
				{name} {nick}
			</>
		}
		return <div className="m-2">
			<UserView user={this.contact.contact as number} render={renderUser} />
			<div className="border rounded">
				<div className="bg-white">
					<div className="py-1 px-1 border-bottom">
						<input type="text" className="w-100 border-0 form-control" placeholder="备注名" maxLength={80}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown}
							defaultValue={this.assigned} />
					</div>
				</div>
				<div className="py-2 pl-3 bg-light border-top d-flex">
					<div className="mr-auto" />
					{React.createElement(observer(() => <>
						<button onClick={() => this.onButtonSave()}
							className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
							保存
						</button>
					</>))}
				</div>
			</div>
		</div>;
	}
}