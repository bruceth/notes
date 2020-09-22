import { observable } from "mobx";
import { EnumNoteType } from "notes/model";
import { renderIcon } from "notes/noteBase";
import { CUqBase } from "tapp";
import { EnumUnitRole, MemberItem, UnitItem } from "./CUnitNote";
import { VUnitAdmin } from "./VUnitAdmin";

export class CUnitAdmin  extends CUqBase {
	unitNoteId: number;
	unit: UnitItem;
	parent: UnitItem;	
	@observable units:UnitItem[];
	@observable members:MemberItem[];

	protected async internalStart() {}
	init(unitNoteId: number) {this.unitNoteId = unitNoteId;}

	get type():EnumNoteType { return EnumNoteType.unitNote }
	renderIcon(): JSX.Element {return renderIcon('sitemap', 'text-primary');}
	renderDirItem(index: number): JSX.Element {return;}
	showAddPage() {}
	showEditPage() {}

	async showViewPage() {
		let unitNote = this.unitNoteId;
		let result = await this.uqs.notes.GetUnit.query({unitNote});
		this.unit = result.ret[0];
		if (this.unit === undefined) {
			debugger;
			throw new Error('not unit for note=' + unitNote);
		}
		this.units = result.units;
		this.parent = result.parent[0];
		this.members = this.moveOwnerMemberToTop(result.members);
		this.openVPage(VUnitAdmin);
	}

	private moveOwnerMemberToTop(members: MemberItem[]):MemberItem[] {
		let ret:MemberItem[] = [];
		let pOwner = 0;
		for (let member of members) {
			let {role} = member;
			if ((role & EnumUnitRole.owner) === EnumUnitRole.owner) {
				ret.splice(pOwner, 0, member);
				pOwner++;
			}
			else {
				ret.push(member);
			}
		}
		return ret;
	}

	async showUnitAdmin(unitItem: UnitItem) {
		let cUnitAdmin = new CUnitAdmin(this.cApp);
		cUnitAdmin.init(-unitItem.id);
		await cUnitAdmin.showViewPage();
	}

	async createUnit(unitName: string):Promise<number> {
		let result = await this.uqs.notes.CreateUnit.submit({
			parent: this.unitNoteId, 
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
		return id;
	}

	async addMember(userId:number, assigned:string) {
		await this.uqs.notes.AddUnitMember.submit({
			unit: this.unit.id,
			member: userId,
			assigned
		});
		this.members.push({
			member: userId,
			assigned,
			role: 0,
		});
	}

	async setUnitMemberAdmin(member:MemberItem, isAdmin: boolean) {
		let roleMask = EnumUnitRole.admin | EnumUnitRole.unitAdmin;
		let role = isAdmin ? roleMask : 0;
		await this.uqs.notes.SetUnitMemberRole.submit({
			unit:this.unit.id, member:member.member, roleMask, role
		});
		member.role &= ~roleMask;
		member.role |= role;
	}
}