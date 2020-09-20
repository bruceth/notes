import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { VPage, userApi, User, Image, Page } from "tonva";
import { CMe } from "./CMe";

export class VAdmin extends VPage<CMe> {
	header() {return '管理员'}
	content() {
		return <div>
			<div className="px-3 py-3 bg-white border-bottom">
				<div><b className="text-info">为用户创建机构</b></div>
				<div>
					给指定用户创建机构。机构下面的部门和成员，由机构所有者创建。
				</div>
				<div className="my-2">
					<button className="btn btn-primary" onClick={()=>this.openVPage(VUser)}>创建</button>
				</div>
			</div>
		</div>;
	}
}

class VUser extends VPage<CMe> {
	@observable private hasError = false;
	@observable private user:{id:number, name:string, nick:string, icon:string};
	@observable private inputName: string;

	header() {return '机构所有者'}
	content() {
		return React.createElement(observer(() => {
			let vError:any;
			if (this.hasError===true)
				vError = <div className="my-3 text-danger">用户不存在！</div>;
			return <div className="m-3">
				<div>
					<input type="text" className="form-control"  maxLength={100}
						placeholder="用户"
						onFocus={()=>this.hasError = false}
						onKeyDown={this.onKeyDown}
						onChange={this.onChange}/>
				</div>
				{vError}
				<div className="my-2">
					<button className="btn btn-primary" disabled={this.inputName?.trim().length===0}
						onClick={this.onNext}>下一步</button>
				</div>
			</div>;
		}));
	}

	private onKeyDown = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
		this.hasError = false;
		if (evt.keyCode === 13) {
			await this.onNext();
		}
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.inputName = evt.currentTarget.value;
	}

	private onNext = async () => {
		await this.search(this.inputName.trim());
		if (this.hasError === false) {
			this.controller.unitOwner = this.user as User;
			this.openVPage(VUnit);
		}
	}

	private search = async (key:string) => {
		let ret = await userApi.fromKey(key);
		if (!ret) {
			this.hasError = true;
			return;
		}
		// if (this.controller.isMe(ret.id)) {
		//	return;
		//}
		this.user = ret;
	}
}

class VUnit extends VPage<CMe> {
	@observable private input: string;

	header() {return '新建机构'}
	content() {
		return React.createElement(observer(() => {
			let {unitOwner} = this.controller;
			let {icon, name, nick} = unitOwner;
			return <div className="m-3">
				<div className="my-2">所有者: <Image className="w-2c h-2c" src={icon} /> {nick ?? name} </div>
				<div>
					<input type="text" className="form-control" maxLength={100}
						placeholder="机构名称" onChange={this.onChange}/>
				</div>
				<div className="my-2">
					<button className="btn btn-primary" disabled={this.input?.trim().length===0}
						onClick={this.onCreate}>创建机构</button>
				</div>
			</div>;
		}));
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.input = evt.currentTarget.value;
	}

	private onCreate = async () => {
		let unitId = await this.controller.createUnit({
			name: this.input.trim(),  
			content: undefined,
			owner: this.controller.user.id
		});
		if (unitId > 0) {
			this.openPageElement(<Page header="成功" afterBack={()=>this.closePage(3)} back="close">
				<div className="m-3 text-success">机构创建成功！</div>
			</Page>)
		}
		else {
			this.openPageElement(<Page header="错误" afterBack={()=>this.closePage(3)} back="close">
				<div className="m-3 text-danger">机构创建时错误！</div>
			</Page>)
		}
	}
}
