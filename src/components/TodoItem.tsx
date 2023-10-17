import type { Todo } from '../context'
import { useEffect, useRef, useState } from 'react'
import { useTodo } from '../context'
import { Input } from './Input'
import { BsCheck2Square } from 'react-icons/bs'
import { TbRefresh } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import cn from 'classnames'
import { motion } from 'framer-motion'

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props

  const [editingTodoText, setEditingTodoText] = useState<string>('')
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

  const { deleteTodo, editTodo, updateTodoStatus } = useTodo()

  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTodoId])
  
  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId)
    setEditingTodoText(todoText)

    if (editInputRef.current) {
      editInputRef.current.focus()
    }
  }

  const handleUpdate = (todoId: string) => {
    if (editingTodoText.trim() !== '') {
      editTodo(todoId, editingTodoText)
      setEditingTodoId(null)
      setEditingTodoText('')
      toast.success('Todo updated successfully!')
    } else {
      toast.error('Please enter a valid todo!')
    }
  }

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId)
    toast.success('Todo deleted successfully!')
  }

  const handleStatusUpdate = (todoId: string) => {
    updateTodoStatus(todoId)
    toast.success('Todo status updated successfully!')
  }

  return (
    <motion.li
      layout
      key={todo.id}
      className={cn(
        'p-5 rounded-xl bg-zinc-900',
        todo.status === 'completed' && 'bg-opacity-50 text-zinc-500',
      )}
    >
      {editingTodoId === todo.id ? (
        <motion.div layout className='flex items-center gap-2'>
          <Input
            ref={editInputRef}
            type='text'
            value={editingTodoText}
            onChange={e => setEditingTodoText(e.target.value)}
          />

          <button
            className='px-5 py-2 text-sm text-green-300 bg-green-900 border-2 border-green-900 active:scale-105 active:bg-green-800 active:border-green-800 rounded-xl'
            onClick={() => handleUpdate(todo.id)}
          >
              Update
          </button>
        </motion.div>
      ) : (
        <div className='flex flex-col gap-5'>
          <motion.span
            layout
            className='text-xl font-bold'
            style={{
              textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
            }}
            >
              {todo.text}
            </motion.span>
            <div className='flex justify-between gap-2 text-white'>
              <button onClick={() => handleStatusUpdate(todo.id)}>
                {todo.status === 'incomplete' ? (
                  <span className='flex items-center gap-1 hover:text-green-300'>
                    <BsCheck2Square />
                    Mark as complete
                    </span>
                ) : (
                  <span className='flex items-center gap-1 hover:text-red-300'>
                    <TbRefresh />
                    Mark as incomplete
                    </span>
                    )}
                </button>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className='flex items-center gap-1 text-white hover:text-blue-300'
                  >
                    <FaRegEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className='flex items-center gap-1 text-red-300 hover:text-red-500'
                  >
                    <RiDeleteBin7Line />
                    Delete
                  </button>
                </div>
            </div>
        </div>
      )}
    </motion.li>
  )
}
