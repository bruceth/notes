import { CUqBase } from "tapp";
import { CNotes } from "../notes";
import { VHome } from "./VHome";

export class CHome extends CUqBase {
	cNode: CNotes;

  	protected async internalStart() {
	}

	async refresh() {
		await this.cNode.refresh();
	}

	init() {
		this.cNode = this.newC(CNotes);
	}

	tab = () => this.renderView(VHome);

	async load() {
		await this.cNode.load();
	}
}
