import { Notification } from "@application/entities/notification"
import { CancelNotification } from "./cancel-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { Content } from "@application/entities/content"
import { randomUUID } from "crypto"
import { NotificationNotFound } from "./errors/notification-not-found"



describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: randomUUID(),
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})