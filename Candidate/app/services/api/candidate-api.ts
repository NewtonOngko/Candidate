import { ApiResponse } from "apisauce"
import { getRoot } from "mobx-state-tree"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class CandidateApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getCandidate(): Promise<any> {
    
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://private-b9a758-candidattest.apiary-mock.com/candidates"
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const candidate = response.data.results

      return { kind: "ok", candidate }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getUser() : Promise<any> {
    try{
        const responseAddress : ApiResponse<any> = await this.api.apisauce.get(
          "https://private-b9a758-candidattest.apiary-mock.com/address"
        )
        const responseEmail : ApiResponse<any> = await this.api.apisauce.get(
          "https://private-b9a758-candidattest.apiary-mock.com/emails"
        ) 
        const responseExperiences : ApiResponse<any> = await this.api.apisauce.get(
          "https://private-b9a758-candidattest.apiary-mock.com/experiences"
        ) 

        // the typical ways to die when calling an api
      if (!responseAddress.ok) {
        const problem = getGeneralApiProblem(responseAddress)
        if (problem) return problem
      }
      if (!responseEmail.ok) {
        const problem = getGeneralApiProblem(responseEmail)
        if (problem) return problem
      }
      if (!responseExperiences.ok) {
        const problem = getGeneralApiProblem(responseExperiences)
        if (problem) return problem
      }
        const address = responseAddress.data.results
        const emails = responseEmail.data.results
        const experiences = responseExperiences.data.results

        return { kind: "ok", address,emails,experiences }
    }
    catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
