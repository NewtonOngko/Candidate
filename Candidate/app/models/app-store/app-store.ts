import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .props({
    isLoading : types.optional(types.boolean,false),
    isError : types.optional(types.boolean,false)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    handleState(field:string , value:any){
      self[field]=value
    },
    handleStateGlobal(data:any){
      applySnapshot(self,{...self,...data})
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AppStoreType = Instance<typeof AppStoreModel>
export interface AppStore extends AppStoreType {}
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>
export interface AppStoreSnapshot extends AppStoreSnapshotType {}
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {})
