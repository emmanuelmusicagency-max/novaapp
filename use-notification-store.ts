import { create } from "zustand";
import type { NotificationItem } from "@/types";

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  setNotifications: (notifications: NotificationItem[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

/** Client-side cache of in-app notifications, hydrated from `/api/notifications`. */
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) =>
    set({ notifications, unreadCount: notifications.filter((n) => !n.read).length }),
  markAsRead: (id) => {
    const updated = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    set({ notifications: updated, unreadCount: updated.filter((n) => !n.read).length });
  },
  markAllAsRead: () => {
    const updated = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: updated, unreadCount: 0 });
  },
}));
