import { EmailModel } from "./email"

test("can be created", () => {
  const instance = EmailModel.create({})

  expect(instance).toBeTruthy()
})
