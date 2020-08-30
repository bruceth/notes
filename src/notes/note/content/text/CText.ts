import { VInput } from "./VInput";
import { VView } from "./VView";
import { CTextBase } from "../textBase";

export class CText extends CTextBase {
	renderInput():JSX.Element {return this.renderView<this>(VInput)}
	renderContent():JSX.Element {return this.renderView<this>(VView)}
}

