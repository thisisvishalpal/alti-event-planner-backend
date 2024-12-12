const mockNotifications = [
  {
    id: 1,
    type: "Message",
    content: "You received a new message from Alice",
    isRead: false,
    timestamp: "2024-12-09T10:30:00Z",
  },
  {
    id: 2,
    type: "Connection",
    content: "Bob sent you a connection request",
    isRead: true,
    timestamp: "2024-12-08T14:20:00Z",
  },
  {
    id: 3,
    type: "Event",
    content: "Reminder: Team meeting at 3 PM",
    isRead: false,
    timestamp: "2024-12-09T09:00:00Z",
  },
];

module.exports = mockNotifications;
