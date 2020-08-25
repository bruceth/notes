import { CUqBase } from "tapp";
import { VBook } from "./VBook";
import { QueryPager } from "tonva";
import { VFlow } from "./VFlow";

export interface ProjectSum {
	id: number;
	name: string;
	debitYear: number;
	creditYear: number;
	debitMonth: number;
	creditMonth: number;
	debitWeek: number;
	creditWeek: number;
	debitDay: number;
	creditDay: number;
}

export class CBook extends CUqBase {
	projectSums: ProjectSum[];
	projectDetailPager: QueryPager<any>;

    protected async internalStart() {
	}

	async loadBookProjects() {
		let ret = await this.uqs.notes.GetBookProjects.query({user: this.user.id, at: undefined}, true);
		this.projectSums = ret.ret;
	}

	renderBook() {
		return this.renderView(VBook);
	}

	async showProjectFlow(projectSum: ProjectSum) {
		this.projectDetailPager = new QueryPager(this.uqs.notes.GetProjectFlow);
		this.projectDetailPager.first({project: projectSum.id});
		this.openVPage(VFlow, projectSum);
	}
}
