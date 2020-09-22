import { CRelation } from "./CRelation";
import { VAddContact } from "tool";

export class VAdd extends VAddContact<CRelation> {
	protected async addContact(userId:number):Promise<void> {
		await this.controller.AddContact(userId);
	}
}
