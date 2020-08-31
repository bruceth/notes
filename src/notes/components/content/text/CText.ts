import { VInput } from "./VInput";
import { VView } from "./VView";
import { CTextBase } from "../textBase";
import { EnumContentType } from "../createCContent";

export class CText extends CTextBase {
	get contentType(): EnumContentType {return EnumContentType.text;}
	renderInput():JSX.Element {return this.renderView<this>(VInput)}
	renderContent():JSX.Element {return this.renderView<this>(VView)}
}

