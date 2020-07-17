import { CUqBase } from "tapp";
import { VRelation } from "./VRelation";

export class CRelation extends CUqBase {
    protected async internalStart() {
	}

	tab = () => this.renderView(VRelation);

}
