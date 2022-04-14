import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export interface Candidates {
  id: number
  name: string
  gender : string
  photo : string
  birthday : string 
  expired : string
}

export type GetCandidateResult = { kind: "ok"; candidate: Candidates[] } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
