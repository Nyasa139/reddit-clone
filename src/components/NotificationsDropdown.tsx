"use client"

import { useState, useEffect, useRef } from "react"
import { Bell } from "lucide-react"

type Notification = {
  id: string
  type: string
  isRead: boolean
  createdAt: string
  creator: { username: string }
  post?: { title: string }
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotifications(data)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen && unreadCount > 0) {
      // Mark as read in DB
      fetch("/api/notifications", { method: "PATCH" })
        .then(() => {
          setNotifications(notifications.map(n => ({ ...n, isRead: true })))
        })
        .catch(console.error)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleOpen}
        className="p-2 hover:bg-slate-800 rounded-full transition-colors relative"
      >
        <Bell className="h-5 w-5 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-slate-900"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-800 font-semibold">
            Notifications
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-400">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-3 border-b border-slate-800/50 text-sm hover:bg-slate-800/50 transition-colors ${!notif.isRead ? 'bg-slate-800/20' : ''}`}
                >
                  <span className="font-medium text-brand-light">u/{notif.creator.username}</span>
                  {notif.type === "COMMENT" ? " commented on your post" : " upvoted your post"}
                  {notif.post && (
                    <div className="mt-1 text-slate-400 truncate">
                      "{notif.post.title}"
                    </div>
                  )}
                  <div className="mt-1 text-xs text-slate-500">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
