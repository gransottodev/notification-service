import { randomUUID } from "node:crypto"
import { Notification } from "./notification"
import { Content } from "./content"

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu um novo pedido de amizade'),
      recipientId: randomUUID(),
      category: 'social',
    })

    expect(notification).toBeTruthy()
  })
})