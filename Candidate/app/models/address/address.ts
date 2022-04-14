import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AddressModel = types
  .model("Address")
  .props({  id: types.identifierNumber,
    address: types.maybeNull(types.string),
    city : types.maybeNull(types.string),
    state : types.maybeNull(types.string),
    zip_code: types.maybeNull(types.number),
    })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AddressType = Instance<typeof AddressModel>
export interface Address extends AddressType {}
type AddressSnapshotType = SnapshotOut<typeof AddressModel>
export interface AddressSnapshot extends AddressSnapshotType {}
export const createAddressDefaultModel = () => types.optional(AddressModel, {})
