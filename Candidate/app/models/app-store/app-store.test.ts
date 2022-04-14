import { AppStoreModel } from "./app-store"

test("can be created", () => {
  const instance = AppStoreModel.create({})

  expect(instance).toBeTruthy()
})
