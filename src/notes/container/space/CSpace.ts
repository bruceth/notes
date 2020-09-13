import { CContainer } from "../CContainer";
import { VSpaceDir } from "./VSpaceDir";
import { VSpaceView } from "./VSpaceView";
import { renderIcon } from "../../noteBase";
import { EnumNoteType } from "notes/model";
import { observable } from "mobx";
import { Contact } from "model";
import { VSpaceMembers } from "./VSpaceMembers";
import { VContacts } from "./VContacts";

export class CSpace extends CContainer {
	groupId: number;
	@observable memberCount: number;
	@observable members:Contact[];
	@observable contacts:Contact[];

	get type():EnumNoteType { return EnumNoteType.groupFolder }
	showFolder() {
		this.load();
		this.loadSpace();		 
		this.openVPage(VSpaceView);
	}

	async loadSpace() {
		let resulte = await this.uqs.notes.GetGroupFolderMemberCount.query({folder: this.folderId});
		let {group, count} = resulte.ret[0];
		this.groupId = group;
		this.memberCount = count;
	}

	async loadMembers() {
		let result = await this.uqs.notes.GetGroupMembers.query({group: this.groupId});
		let ret:any[] = result.ret;
		let index = ret.findIndex(v => this.isMe(v.contact));
		if (index >= 0) ret.splice(index, 1);
		this.members = ret;
	}

	async loadContacts() {
		let result = await this.uqs.notes.GetGroupMembers.query({group: this.groupId});
		this.contacts = result.ret;
	}

	renderIcon(): JSX.Element {
		return renderIcon('folder', 'text-warning');
	}
	renderDirItem():JSX.Element {
		let item = new VSpaceDir(this);
		return item.render();
	}
	showAddPage() {}
	showEditPage() {}

	showMembers = async () => {
		await this.loadMembers();
		this.openVPage(VSpaceMembers);
	}

	showAddMember = async () => {
		await this.loadContacts();
		//this.openVPage(VContacts);
		this.owner.callSelectContact(undefined);
	}
}
