import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CandidateModel = types.model("Candidate").props({
  id: types.identifierNumber,
  name: types.maybeNull(types.string),
  gender : types.maybeNull(types.string),
  photo : types.maybeNull(types.string),
  birthday: types.maybeNull(types.number),
  expired: types.maybeNull(types.number),
})

type CandidateType = Instance<typeof CandidateModel>
export interface Candidate extends CandidateType {}
type CandidateSnapshotType = SnapshotOut<typeof CandidateModel>
export interface CandidateSnapshot extends CandidateSnapshotType {}
export const createCandidateDefaultModel = () => types.optional(CandidateModel, {})
