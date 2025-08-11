"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, ImageIcon, FileText, Download, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "psicologo" | "paciente" | "system"
  content: string
  timestamp: Date
  type: "text" | "file" | "image" | "system"
  fileUrl?: string
  fileName?: string
  fileSize?: number
  replyTo?: string
  reactions?: { emoji: string; users: string[] }[]
}

interface AdvancedChatProps {
  sessionId: string
  currentUserId: string
  currentUserName: string
  currentUserType: "psicologo" | "paciente"
}

export function AdvancedChat({ sessionId, currentUserId, currentUserName, currentUserType }: AdvancedChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "system",
      senderName: "Sistema",
      senderType: "system",
      content: "Sesión iniciada. Chat habilitado.",
      timestamp: new Date(),
      type: "system",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const emojis = ["😊", "👍", "❤️", "😂", "😢", "😮", "😡", "🤔", "👏", "🙏"]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      replyTo: replyingTo?.id,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setReplyingTo(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: currentUserType,
      content: `Archivo compartido: ${file.name}`,
      timestamp: new Date(),
      type: file.type.startsWith("image/") ? "image" : "file",
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
    }

    setMessages((prev) => [...prev, message])
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            if (existingReaction.users.includes(currentUserId)) {
              // Remover reacción
              existingReaction.users = existingReaction.users.filter((id) => id !== currentUserId)
              if (existingReaction.users.length === 0) {
                return { ...msg, reactions: reactions.filter((r) => r.emoji !== emoji) }
              }
            } else {
              // Agregar reacción
              existingReaction.users.push(currentUserId)
            }
          } else {
            // Nueva reacción
            reactions.push({ emoji, users: [currentUserId] })
          }

          return { ...msg, reactions }
        }
        return msg
      }),
    )
  }

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Chat de Sesión</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages.map((message) => (
            <div key={message.id} className="group">
              {/* Mensaje al que se responde */}
              {message.replyTo && (
                <div className="ml-12 mb-1 p-2 bg-gray-100 rounded text-xs text-gray-600 border-l-2 border-blue-500">
                  Respondiendo a: {messages.find((m) => m.id === message.replyTo)?.content.slice(0, 50)}...
                </div>
              )}

              <div
                className={`flex items-start space-x-3 ${
                  message.senderType === "system"
                    ? "justify-center"
                    : message.senderId === currentUserId
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                }`}
              >
                {message.senderType !== "system" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-5wpwq.png?key=t7d4s&height=32&width=32`} />
                    <AvatarFallback>
                      {message.senderName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex-1 max-w-xs ${message.senderType === "system" ? "text-center" : ""}`}>
                  {message.senderType === "system" ? (
                    <Badge variant="secondary" className="text-xs">
                      {message.content}
                    </Badge>
                  ) : (
                    <div
                      className={`p-3 rounded-lg ${
                        message.senderId === currentUserId
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium opacity-75">{message.senderName}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => setReplyingTo(message)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => setReplyingTo(message)}>Responder</DropdownMenuItem>
                              {message.senderId === currentUserId && (
                                <DropdownMenuItem onClick={() => deleteMessage(message.id)} className="text-red-600">
                                  Eliminar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {message.type === "text" && <p className="text-sm">{message.content}</p>}

                      {message.type === "image" && (
                        <div className="space-y-2">
                          <ImageIcon
                            src={message.fileUrl || "/placeholder.svg"}
                            alt={message.fileName}
                            className="max-w-full h-auto rounded"
                          />
                          <p className="text-xs opacity-75">{message.fileName}</p>
                        </div>
                      )}

                      {message.type === "file" && (
                        <div className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                          <FileText className="h-4 w-4" />
                          <div className="flex-1">
                            <p className="text-xs font-medium">{message.fileName}</p>
                            <p className="text-xs opacity-75">{message.fileSize && formatFileSize(message.fileSize)}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-50">{formatTime(message.timestamp)}</span>

                        {/* Reacciones */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex space-x-1">
                            {message.reactions.map((reaction, index) => (
                              <button
                                key={index}
                                onClick={() => addReaction(message.id, reaction.emoji)}
                                className={`text-xs px-1 py-0.5 rounded ${
                                  reaction.users.includes(currentUserId)
                                    ? "bg-blue-200 text-blue-800"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {reaction.emoji} {reaction.users.length}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selector de emojis para reacciones */}
              {message.senderType !== "system" && (
                <div className="flex justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1 bg-white border rounded-full px-2 py-1 shadow-sm">
                    {emojis.slice(0, 5).map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(message.id, emoji)}
                        className="hover:bg-gray-100 rounded p-1 text-sm"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Respuesta activa */}
        {replyingTo && (
          <div className="px-4 py-2 bg-blue-50 border-t flex items-center justify-between">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Respondiendo a {replyingTo.senderName}:</span>
              <p className="truncate">{replyingTo.content.slice(0, 50)}...</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
              ✕
            </Button>
          </div>
        )}

        {/* Input de mensaje */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>

            <Button size="sm" variant="ghost" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile className="h-4 w-4" />
            </Button>

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribir mensaje..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />

            <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Selector de emojis */}
          {showEmojiPicker && (
            <div className="mt-2 p-2 bg-white border rounded-lg shadow-lg">
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setNewMessage((prev) => prev + emoji)
                      setShowEmojiPicker(false)
                    }}
                    className="p-2 hover:bg-gray-100 rounded text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </CardContent>
    </Card>
  )
}
