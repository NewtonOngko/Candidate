import { ExperiencesModel } from "./experiences"

test("can be created", () => {
  const instance = ExperiencesModel.create({})

  expect(instance).toBeTruthy()
})
