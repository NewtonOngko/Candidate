import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { CandidateStoreModel } from "../candidate/candidate-store"
import { AppStoreModel } from "../app-store/app-store"
import { BlogsStoreModel } from "../blogs-store/blogs-store"
import { UserStoreModel } from "../user-store/user-store"


/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  appStore : types.optional(AppStoreModel,{} as any),
  blogStore : types.optional(BlogsStoreModel,{} as any),
  userStore : types.optional(UserStoreModel,{} as any),
  characterStore: types.optional(CharacterStoreModel, {} as any),
  candidateStore: types.optional(CandidateStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
