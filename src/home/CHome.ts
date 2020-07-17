import { CUqBase } from "tapp";
import { VHome } from "./VHome";
import { CNote } from "note";


export class CHome extends CUqBase {
	cNode: CNote;

    protected async internalStart() {
	}

	init() {
		this.cNode = this.newC(CNote);
	}

	tab = () => this.renderView(VHome);

	async load() {
		await this.cNode.load();
	}
}
