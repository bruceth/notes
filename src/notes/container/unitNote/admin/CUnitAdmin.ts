import { observable } from "mobx";
import { EnumNoteType } from "notes/model";
import { renderIcon } from "notes/noteBase";
import { CUqBase } from "tapp";
import { EnumUnitRole, MemberItem, UnitItem } from "../CUnitNote";
import { VProjectsAdmin } from "./VProjectsAdmin";
import { VReportsAdmin } from "./VReportsAdmin";
import { VAdminBase, VUnitAdmin, VRootAdmin } from "./VUnitAdmin";

export class CAdminBase  extends CUqBase {
	isChanged: boolean = false;
	parent: UnitItem;
	@observable unit: UnitItem;
	@observable units:UnitItem[];
	@observable members:MemberItem[];

	protected async internalStart() {}
	init(parent:UnitItem, unit:UnitItem) {
		this.parent = parent;
		this.unit = unit;
	}

	get type():EnumNoteType { return EnumNoteType.unitNote }
	renderIcon(): JSX.Element {return renderIcon('sitemap', 'text-primary');}
	renderDirItem(index: number): JSX.Element {return;}
	showAddPage() {}
	showEditPage() {}

	protected getVUnitAdmin(): new (controller: any) => VAdminBase<any> { return VUnitAdmin; }

	async showViewPage(afterBack: (isChanged:boolean) => void) {
		let unitNote = -this.unit.id;
		let result = await this.uqs.notes.GetUnit.query({unitNote});
		this.unit = result.ret[0];
		if (this.unit === undefined) {
			debugger;
			throw new Error('not unit for note=' + unitNote);
		}
		this.units = result.units;
		this.members = this.moveOwnerMemberToTop(result.members);
		this.openVPage(this.getVUnitAdmin(), undefined, afterBack);
	}

	private moveOwnerMemberToTop(members: MemberItem[]):MemberItem[] {
		let ret:MemberItem[] = [];
		let pOwner = 0, pAdmin = 0;
		for (let member of members) {
			let {role} = member;
			if ((role & EnumUnitRole.owner) === EnumUnitRole.owner) {
				ret.splice(pOwner, 0, member);
				pOwner++;
				pAdmin++;
				continue;
			}
			if ((role & EnumUnitRole.admin) === EnumUnitRole.admin) {
				ret.splice(pAdmin, 0, member);
				pAdmin++;
				continue;
			}
			ret.push(member);
		}
		return ret;
	}

	async showUnitAdmin(unitItem: UnitItem) {
		let cUnitAdmin = new CUnitAdmin(this.cApp);
		cUnitAdmin.init(this.unit, unitItem);
		await cUnitAdmin.showViewPage(() => {
			let {isChanged} = cUnitAdmin;
			if (isChanged) this.isChanged = isChanged;
		});
	}

	async createUnit(unitName: string):Promise<number> {
		let result = await this.uqs.notes.CreateUnit.submit({
			parent: this.parent.id, //.unitNoteId, 
			name: unitName,
			content: undefined,
		});
		let {id} = result;
		if (id > 0) {
			this.units.push({
				id,
				caption: unitName,
				content: undefined,
				role: 7,
				memberCount: 0,
			})
		}
		this.isChanged = true;
		return id;
	}

	async setUnitName(unitName:string) {
		await this.uqs.notes.SetUnitName.submit({unit: this.unit.id, name: unitName});
		this.parent.caption = unitName;
		this.isChanged = true;
	}

	async addMember(userId:number, assigned:string, discription:string) {
		await this.uqs.notes.AddUnitMember.submit({
			unit: this.unit.id,
			member: userId,
			assigned,
			discription
		});
		this.members.push({
			member: userId,
			assigned,
			discription,
			role: 0,
		});
		this.isChanged = true;
	}

	async setUnitMemberAdmin(member:MemberItem, isAdmin: boolean) {
		let roleMask = EnumUnitRole.admin | EnumUnitRole.unitAdmin;
		let role = isAdmin ? roleMask : 0;
		await this.uqs.notes.SetUnitMemberRole.submit({
			unit:this.unit.id, member:member.member, roleMask, role
		});
		member.role &= ~roleMask;
		member.role |= role;
		this.isChanged = true;
	}

	async setUnitMemberProp(member:MemberItem, prop:string, value:string) {
		await this.uqs.notes.SetUnitMemberProp.submit({
			unit:this.unit.id, member:member.member, prop, value
		});
		(member as any)[prop] = value;
		this.isChanged = true;
	}

	showAdminReports = () => {
		this.openVPage<CAdminBase>(VReportsAdmin);
	}
}

export class CUnitAdmin extends CAdminBase {
}

export class CRootAdmin extends CAdminBase {
	protected getVUnitAdmin(): new (controller: any) => VAdminBase<any> { return VRootAdmin; }

	showAdminProjects = () => {
		this.openVPage(VProjectsAdmin);
	}	
}
