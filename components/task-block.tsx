"use client"

import type React from "react"

import { CheckCircle2, Circle, Grip as Grip2 } from "lucide-react"

interface TaskBlockProps {
  task: {
    id: string
    title: string
    category: string
    duration: number
    completed: boolean
  }
  color: string
  onDragStart: (e: React.DragEvent) => void
  onComplete: () => void
}

export default function TaskBlock({ task, color, onDragStart, onComplete }: TaskBlockProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onComplete}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg cursor-move select-none
        transition-all duration-200 hover:shadow-md transform hover:scale-105
        group min-w-max md:min-w-[180px]
        ${color} ${task.completed ? "opacity-60" : "opacity-100"}
        ${task.completed ? "line-through" : ""}
      `}
    >
      <Grip2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-medium truncate text-foreground/90">{task.title}</p>
        <p className="text-xs text-foreground/70">{task.duration}m</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onComplete()
        }}
        className="flex-shrink-0 transition-transform hover:scale-110"
      >
        {task.completed ? (
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-foreground/80" />
        ) : (
          <Circle className="w-4 h-4 md:w-5 md:h-5 text-foreground/60" />
        )}
      </button>
    </div>
  )
}
