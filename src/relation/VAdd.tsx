import React from "react";
import { CRelation } from "./CRelation";
import { VPage, SearchBox, userApi, Image, FA, Muted } from "tonva";
import { observable } from "mobx";
import { observer } from "mobx-react";

export class VAdd extends VPage<CRelation> {
	@observable private hasError = false;
	@observable private user:{id:number, name:string, nick:string, icon:string};

	header() {
		return <div className="w-100 mr-1 d-flex">
			<SearchBox className="flex-fill" 
				onSearch={this.onSearch} 
				onFocus={this.onFocus}
				placeholder="搜索联系人" />
			<button className="btn btn-sm btn-outline-info ml-1" onClick={()=>this.closePage()}>取消</button>
		</div>;
	}

	private onSearch = async (key:string) => {
		this.user = await userApi.fromKey(key);
		if (!this.user) {
			this.hasError = true;
			return;
		}
	}

	private onFocus = () => {
		this.hasError = false;
	}

	private onAddContact = async () => {
		await this.controller.AddContact(this.user.id);
		this.closePage();
	}

	content() {
		let c = observer(() => {
			if (this.hasError === true) {
				return <div className="p-4">
					<FA className="text-danger mr-2" name="times-circle" />
					<Muted>账号不存在或者不接受邀请</Muted>
				</div>
			}
			if (!this.user) return;

			let {name, nick, icon} = this.user;
			let div:any;
			if (nick) {
				div =  <div>
					<div><b>{nick}</b></div>
					<div>{name}</div>
				</div>;
			}
			else {
				div = <div><b>{name}</b></div>
			}
			return <div className="my-3 mx-3 border rounded">
				<div className="p-4 d-flex bg-white rounded-top">
					<Image className="w-3c h-3c mr-3" src={icon || '.user-o'} />
					{div}
				</div>
				<div className="py-3 px-4">
					<button className="btn btn-primary" onClick={this.onAddContact}>增加</button>
				</div>
			</div>;
		});
		return React.createElement(c);
	}
}