import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { CandidateApi } from "../../services/api/candidate-api"
import { AddressModel } from "../address/address"
import { EmailModel, EmailSnapshot } from "../email/email"
import { ExperiencesModel } from "../experiences/experiences"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    email: types.optional(types.array(EmailModel), []),
    address: types.optional(types.array(AddressModel), []),
    experiences: types.optional(types.array(ExperiencesModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (EmailSnapshots: EmailSnapshot[]) => {
      self.email.replace(EmailSnapshots)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getUser: async () => {
      const{appStore}=getRoot(self)
      appStore.handleState("isLoading", true)
      const candidateApi = new CandidateApi(self.environment.api)
      const resultUser = await candidateApi.getUser()
      appStore.handleState("isLoading", false)

      return resultUser
      // if (resultUser.kind === "ok") {
      //   self.saveUser(resultUser.candidate)
      // } else {
      //   __DEV__ && console.tron.log(resultUser.kind)
      // }
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
