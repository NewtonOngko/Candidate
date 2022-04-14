import { ApiResponse } from "apisauce"
import { getRoot } from "mobx-state-tree"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class BlogApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getBlog(): Promise<any> {
    
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://private-b9a758-candidattest.apiary-mock.com/blogs"
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const blog = response.data.results

      return { kind: "ok", blog }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
