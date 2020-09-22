import { observable } from "mobx";
import { EnumNoteType } from "notes/model";
import { renderIcon } from "notes/noteBase";
import { CContainer } from "../CContainer";
import { CUnitAdmin } from "./CUnitAdmin";
import { VUnitNoteDir } from "./VUnitNoteDir";
import { VUnitNoteView } from "./VUnitNoteView";

export enum EnumUnitRole {owner=1, admin=2, unitAdmin=4};
export interface UnitItem {
	id:number; 
	caption:string; 
	content:string;
	role: EnumUnitRole;
	memberCount: number;
}
export interface MemberItem {
	member: number;
	assigned: string;
	role: EnumUnitRole;
}

export class CUnitNote extends CContainer {
	unit: UnitItem;
	@observable units:UnitItem[];
	cUnitAdmins: CUnitAdmin[] = [];
	curUnitAdmin: CUnitAdmin;

	get type():EnumNoteType { return EnumNoteType.unitNote }
	renderIcon(): JSX.Element {
		return renderIcon('sitemap', 'text-primary');
	}

	renderDirItem(index: number): JSX.Element {
		let vNoteItem = new VUnitNoteDir(this);
		return vNoteItem.render();
	}

	showAddPage() {
		//this.openVPage(VFolderMyAdd);
	}
	showEditPage() {
		//this.openVPage(VFolderMyEdit);
	}

	async showFolder() {
		let unitNote = this.noteItem.note;
		let result = await this.uqs.notes.GetUnit.query({unitNote});
		this.unit = result.ret[0];
		if (this.unit === undefined) {
			debugger;
			throw new Error('not unit for note=' + unitNote);
		}
		this.units = result.units
		this.openVPage(VUnitNoteView);
	}

	async showAdmin() {
		this.curUnitAdmin = new CUnitAdmin(this.cApp);
		this.curUnitAdmin.init(this.noteItem.note);
		await this.curUnitAdmin.showViewPage();
	}

	async createUnit(unitName: string):Promise<number> {
		let result = await this.uqs.notes.CreateUnit.submit({
			parent: this.noteItem.note, 
			name: unitName,
			content: undefined,
		});
		return result.id;
	}
}