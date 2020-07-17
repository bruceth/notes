import { CUqBase } from "tapp";
import { VDiscover } from "./VDiscover";

export class CDiscover extends CUqBase {
    protected async internalStart() {
	}

	tab = () => this.renderView(VDiscover);

}
