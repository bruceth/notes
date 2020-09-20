import { CUqBase } from "tapp";
import { User } from "tonva";
import { VAdmin } from "./VAdmin";
import { VEditMe } from "./VEditMe";
import { VMe } from "./VMe";

export class CMe extends CUqBase {
	role: number;
	unitOwner: User;

    protected async internalStart() {
	}

	tab = () => this.renderView(VMe);

	showEditMe = async () => {
		let result = await this.uqs.notes.GetSystemRole.query({});
		this.role = result.ret[0]?.role;
		this.openVPage(VEditMe);
	}

	showAdmin = async () => {
		this.openVPage(VAdmin);
	}

	async createUnit(param: {name:string; content:string; owner:number}): Promise<number> {
		let result = await this.uqs.notes.CreateUnit.submit(param);
		return result.id;
	}
}
