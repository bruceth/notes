import React, { ChangeEvent } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FA, List, VPage } from 'tonva';
import { EnumUnitRole, MemberItem, UnitItem } from "./CUnitNote";
import { CUnitAdmin } from './CUnitAdmin';
import { VBasePage } from 'notes/views/VBasePage';
import { VAddContact } from 'tool';

export class VUnitAdmin extends VBasePage<CUnitAdmin> {
	header() {return '管理 ' + this.controller.unit.caption};
	content() {
		let {unit, parent, units, members} = this.controller;
		let {id, caption, content} = unit;
		let vParent:any;
		if (parent) {
			vParent = <div className="m-3 small">
				<span className="text-muted">上级：</span>
				<b className="text-primary">{parent.caption}</b>
			</div>
		}
		return <div>
			{vParent}
			<div className="m-3">
				<div><b className="mr-5">{caption}</b> <small className="text-muted">ID={id}</small></div>
				{content && <div>content</div>}
			</div>

			<div className="d-flex align-items-end px-3 my-2">
				<div className="small text-muted">成员</div>
				<button className="ml-auto btn btn-sm btn-primary" onClick={this.onNewMember}>
					<FA name="plus" /> 成员
				</button>
			</div>
			<List items={members} item={{render: this.renderMemberRow}} />
			<div className="mt-5" />
			<div className="d-flex align-items-end px-3 my-2">
				<div className="small text-muted">下级单位</div>
				<button className="ml-auto btn btn-sm btn-primary" onClick={this.onNewUnit}>
					<FA name="plus" /> 单位
				</button>
			</div>
			<List items={units} item={{render: this.renderUnitRow, onClick: this.onUnitRow}} />
		</div>
	}

	private onNewUnit = () => {
		this.openVPage(VNewUnit);
	}

	private renderUnitRow = (unitItem: UnitItem, index: number) => {
		let {caption, memberCount} = unitItem;
		return <div className="px-3 py-2 align-items-center d-flex">
			<div>
				<FA className="text-warning mr-3" name="sitemap" />
				<span>{caption}</span>
			</div>

			{<span className="ml-auto small"><FA name="user-o" className="small text-info mr-2" /> {memberCount}</span>}
		</div>;
	}

	private onUnitRow = (unitItem: UnitItem) => {
		this.controller.showUnitAdmin(unitItem);
	}

	private onNewMember = () => {
		this.openVPage(VNewMember);
	}

	private renderMemberRow = (item: MemberItem, index: number) => {
		let {member, assigned, role} = item;
		let right = (role & EnumUnitRole.owner) === EnumUnitRole.owner?
			<FA className="text-danger" name="flag" />
			:
			<label className="mb-0">
				<input className="mr-1" type="checkbox" 
					defaultChecked={(role&EnumUnitRole.admin) === EnumUnitRole.admin}
					onChange={evt => this.onCheckChange(item, evt)} />
				管理员
			</label>;
		return <div className="px-3 py-2">
			<div>{this.renderContact(member, assigned)}</div>
			<span className="ml-auto">
				{right}
			</span>
		</div>;
	}

	private onCheckChange = async (item:MemberItem, evt: React.ChangeEvent<HTMLInputElement>) => {
		await this.controller.setUnitMemberAdmin(item, evt.currentTarget.checked);
	}

	private onMemberRow = (item: MemberItem) => {
		//this.controller.showUnitAdmin(unitItem);
		alert ('成员: ' +  item.member + ' ' + item.assigned)
	}	
}

class VNewUnit extends VPage<CUnitAdmin> {
	@observable private input: string;
	@observable private error: string;

	header() {return '新增单位'}
	content() {
		return React.createElement(observer(() => {
			let vError:any;
			if (this.error)
			vError = <div className="my-3 text-danger">{this.error}</div>;
			return <div className="m-3">
				<div className="">
					<input type="text" className="form-control" maxLength={100}
						placeholder="单位名称" onChange={this.onChange} onKeyDown={this.onKeyDown}/>
				</div>
				{vError}
				<div className="my-2">
					<button className="btn btn-primary" disabled={this.input?.trim().length===0}
						onClick={this.onCreate}>新建单位</button>
				</div>
			</div>;
		}));
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.input = evt.currentTarget.value;
	}

	private onKeyDown = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.keyCode === 13) {
			await this.onCreate();
		}
	}

	private onCreate = async () => {
		let unitId = await this.controller.createUnit(this.input.trim());
		if (unitId > 0) {
			this.closePage();
			return;
		}
		switch (unitId) {
			default: this.error = '错误编号：' + unitId; break;
			case -1: this.error = '无建单位权限'; break;
			case -2: this.error = '单位重名'; break;
		}
	}
}

class VNewMember extends VAddContact<CUnitAdmin> {
	protected async addContact(userId:number, assigned:string):Promise<void> {
		await this.controller.addMember(userId, assigned);
	}
}
