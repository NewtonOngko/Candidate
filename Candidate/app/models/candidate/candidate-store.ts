import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { CandidateModel, CandidateSnapshot } from "../candidate/candidate"
import { CandidateApi } from "../../services/api/candidate-api"
import { withEnvironment } from "../extensions/with-environment"
export const CandidateStoreModel = types
  .model("CandidateStore")
  .props({
    candidate: types.optional(types.array(CandidateModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCandidate: (candidateSnapshots: CandidateSnapshot[]) => {
      self.candidate.replace(candidateSnapshots)
    },
  }))
  .views((self)=>({
    getData:(text : string)=>{
      return self.candidate.filter(item => item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase
        ().trim()))
    }
  }))
  .actions((self) => ({
    getCandidate: async () => {
      const{appStore}=getRoot(self)
      appStore.handleState("isLoading", true)
      const candidateApi = new CandidateApi(self.environment.api)
      const result = await candidateApi.getCandidate()
      const resultUser = await candidateApi.getUser()
      console.log('user',resultUser)
      appStore.handleState("isLoading", false)
      if (result.kind === "ok") {
        self.saveCandidate(result.candidate)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type CandidateStoreType = Instance<typeof CandidateStoreModel>
export interface CandidateStore extends CandidateStoreType {}
type CandidateStoreSnapshotType = SnapshotOut<typeof CandidateStoreModel>
export interface CandidateStoreSnapshot extends CandidateStoreSnapshotType {}
export const createCandidateStoreDefaultModel = () => types.optional(CandidateStoreModel, {})
