import { CUqBase } from "tapp";
import { CNotes } from "../notes";
import { VHome } from "./VHome";

export class CHome extends CUqBase {
	cNodes: CNotes;

  	protected async internalStart() {
	}

	async refresh() {
		await this.cNodes.refresh();
	}

	init() {
		this.cNodes = this.newC(CNotes);
	}

	tab = () => this.renderView(VHome);

	async load() {
		await this.cNodes.load();
	}
}
