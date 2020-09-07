import { observable } from "mobx";
import { CUqBase } from "../../../tapp";
import { Contact } from "../../../model";
import { VSent } from "./VSent";
import { VTo } from "./VTo";

export abstract class CTo extends CUqBase {
	protected currentGroupFolder: number
	@observable groupMembers: Contact[];
	@observable contacts: Contact[];

	constructor(cApp:any, currentGroupFolder: number) {
		super(cApp);
		this.currentGroupFolder = currentGroupFolder;
	}

	protected abstract sendOut(toList:number[]):Promise<void>;
	protected abstract afterContactsSelected(): Promise<void>;

	protected async internalStart():Promise<void> { 
		let ret = await this.uqs.notes.GetMyContacts.page(
			{
				groupFolder: this.currentGroupFolder
			}, 0, 50, true);
		this.groupMembers = ret.$page;
		this.startAction();
		this.openVPage(VTo);
	}

	onSendOut = async (): Promise<void> => {
		//let {contacts, noteItem, currentFold: currentFoldItem} = this.controller;
		let toList = this.contacts.map (v => {
			let {contact} = v;
			if (!contact) return undefined;
			if (typeof contact === 'object') return (contact as any).id;
			return contact;
		});
		//await this.controller.sendNoteTo(currentFoldItem.folderId, noteItem.note, toList);
		await this.sendOut(toList);
		this.popToTopPage();
		this.openVPage(VSent);
	}

	async onContactsSelected(contacts: Contact[]) {
		this.contacts = contacts;
		await this.afterContactsSelected();
	}
}
