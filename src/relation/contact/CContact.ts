import { CUqSub } from "tapp"
import { observable } from "mobx";
import { Contact } from "model";
import { CRelation } from "../CRelation";

export class CContact extends CUqSub<CRelation> {
	protected async internalStart() {}
	@observable contact: Contact;

	init(param:Contact):void {
		this.contact = {...param};
	}
}