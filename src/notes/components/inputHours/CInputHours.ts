//import { observable } from "mobx";
import { CUqBase } from "tapp";

export abstract class CInputHours extends CUqBase {
	hourminutes: number;

	protected async internalStart():Promise<void> {
		//this.openVPage(VSelectContact);
	}

	// async callSelectContact(options: SelectContactOptions): Promise<Contact[]> {
	// 	return await this.vCall(VSelectContact, options);
	// }
}
