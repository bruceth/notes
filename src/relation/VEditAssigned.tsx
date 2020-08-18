import React from "react";
import { CRelation } from "./CRelation";
import { VPage, UserView, Image, FA, Muted, User, Page } from "tonva";
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
		return ' ';
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

	private onEditAlias = () => {
		let right = React.createElement(observer(() => <>
			<button onClick={() => this.onButtonSave()}
				className="btn btn-sm btn-success mr-1" disabled={this.btnSaveDisabled}>
				保存
			</button>
		</>));
		this.openPageElement(<Page header="编辑" right={right}>
			<div className="border rounded">
				<div className="bg-white">
					<div className="px-3 py-2 bg-white d-flex align-items-center border-bottom">
						<div className="text-muted mr-3 w-4c">备注名</div>
						<input type="text" className="flex-fill w-100 border-0 form-control" maxLength={80}
							autoFocus={true}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown}
							defaultValue={this.assigned} />
					</div>
				</div>
			</div>
		</Page>);
	}

	content() {
		let renderUser = (user:User) => {
			let {id, name, nick, icon} = user;
			return <div className="p-3 d-flex">
				<Image className="w-3c h-3c mr-4" src={icon} />
				<div>
					<div className="h6"><b>{this.assigned || nick || name}</b></div>
					<div><Muted>id: </Muted>{id}</div>
					<div><Muted>用户名: </Muted>{name}</div>
					{nick && <div><Muted>别名: </Muted>{nick}</div>}
				</div>
			</div>
		}
		let cn = 'px-3 py-2 bg-white d-flex align-items-center border-bottom cursor-pointer';
		return <div>
			<UserView user={this.contact.contact as number} render={renderUser} />
			<div className={cn} onClick={this.onEditAlias}>
				<div className="text-muted mr-3 w-4c">备注名</div>
				<div className="flex-fill w-100 border-0 form-control mr-auto">{this.assigned || <Muted>[无]</Muted>}</div>
				<FA name="angle-right" />
			</div>
		</div>;
	}
}