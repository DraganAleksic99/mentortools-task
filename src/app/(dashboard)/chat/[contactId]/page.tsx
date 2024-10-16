'use client'
import { useState, useRef, useEffect } from 'react'

import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

import { useChat } from 'ai/react'
import { type Message } from 'ai'

import { ScrollArea } from '@/components/ScrollArea'

const StyledPaper = styled(Paper)`
  background-color: var(--mui-palette-background-paper);
  box-shadow: var(--mui-customShadows-sm);
  border-radius: var(--border-radius);
  height: 53px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;
`

interface ExtendedMessage extends Message {
  scrollId: number
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
    onFinish(message) {
      ;(message as ExtendedMessage).scrollId = messages.length - 1
    }
  })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleSearch = () => setIsOpen(!isOpen)

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text

    const regex = new RegExp(`(${term})`, 'gi')

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className='bg-yellow-200'>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const matchingMessages = messages.filter(message => message.content.toLowerCase().includes(searchTerm.toLowerCase()))

  const scrollToMessage = (index: number) => {
    if (matchingMessages.length > 0) {
      const messageId = (matchingMessages[index] as ExtendedMessage).scrollId
      const messageElement = messageRefs.current[messageId - 1]

      if (messageElement && scrollAreaRef.current) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    if (messages && messages.length !== 0) {
      ;(messages[messages.length - 1] as ExtendedMessage).scrollId = messages.length
    }
  }, [messages])

  useEffect(() => {
    if (searchTerm && matchingMessages.length > 0) {
      setCurrentMatchIndex(0)
      scrollToMessage(0)
    }
    // eslint-disable-next-line
  }, [searchTerm])

  const handleNavigation = (direction: 'up' | 'down') => {
    if (matchingMessages.length > 0) {
      const newIndex =
        direction === 'up'
          ? (currentMatchIndex - 1 + matchingMessages.length) % matchingMessages.length
          : (currentMatchIndex + 1) % matchingMessages.length

      setCurrentMatchIndex(newIndex)
      scrollToMessage(newIndex)
    }
  }

  return (
    <div className='w-full bg-[#F8F7FA]'>
      <Box className='w-full border-b border-[var(--border-color)] h-[76px] flex align-middle justify-between bg-white'>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt='Gawin Griffith'
              src='/images/avatars/5.png'
              className='cursor-pointer bs-[38px] is-[38px] ml-1'
            />
          </ListItemAvatar>
          <ListItemText primary='Gawin Griffith' secondary='Frontend Developer' />
        </ListItem>
        <div className='h-full flex'>
          <div className='flex items-center gap-x-1 mr-1'>
            <div className='flex h-fit items-center cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
              <i className='tabler-phone w-[22px] h-[22px] text-gray-500'></i>
            </div>
            <div className='flex h-fit items-center cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
              <i className='tabler-video w-[22px] h-[22px] text-gray-500'></i>
            </div>
          </div>
          <div className='flex items-center mr-1'>
            <div
              className={`relative flex items-center transition-all duration-500 ease-in-out ${isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
            >
              <input
                type='text'
                placeholder='Search...'
                className={`w-40 h-[22px] pl-1 ml-1 mr-11 focus:outline-none focus:ring-0 border border-gray-500 rounded-sm transition-all duration-500 ease-in-out ${isOpen ? 'visible' : 'invisible'}`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {isOpen && searchTerm && (
                <p className='absolute left-2 top-[26px] text-sm text-gray-500'>
                  {matchingMessages.length > 0
                    ? `Showing ${currentMatchIndex + 1} of ${matchingMessages.length} matches`
                    : 'No matches found'}
                </p>
              )}
              {isOpen && (
                <div className='absolute right-0 flex h-fit items-center cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
                  <i
                    className='tabler-x w-[22px] h-[22px] text-gray-500'
                    onClick={() => {
                      toggleSearch()
                      setSearchTerm('')
                    }}
                  ></i>
                </div>
              )}
            </div>
            {!isOpen && (
              <div
                className='flex h-fit items-center cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'
                onClick={toggleSearch}
              >
                <i className='tabler-search w-[22px] h-[22px] text-gray-500'></i>
              </div>
            )}
          </div>
          <div className='flex items-center pr-5'>
            <div className='flex h-fit items-center cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
              <i className='tabler-dots w-[22px] h-[22px] text-gray-500'></i>
            </div>
          </div>
        </div>
      </Box>
      <Box className='bg-[#F8F7FA] relative'>
        {searchTerm && matchingMessages.length > 1 && (
          <div className='absolute right-5 bottom-5 flex flex-col gap-2 z-10'>
            <button className='cursor-pointer w-10 h-10 rounded-lg' onClick={() => handleNavigation('up')}>
              <KeyboardArrowUp fontSize='large' />
            </button>
            <button className='cursor-pointer w-10 h-10 rounded-lg' onClick={() => handleNavigation('down')}>
              <KeyboardArrowDown fontSize='large' />
            </button>
          </div>
        )}
        <ScrollArea className='h-[410px] px-5' ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div
              className={`first:pt-5 mb-6 flex ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              key={message.id}
              ref={el => {
                messageRefs.current[index] = el
              }}
            >
              <Avatar
                alt='Gawin Griffith'
                src='/images/avatars/5.png'
                className={`cursor-pointer bs-[38px] is-[38px] ml-1 ${message.role === 'assistant' ? 'mr-4' : 'ml-4'}`}
              />
              <div
                className={`rounded-lg px-4 py-2 ${message.role === 'assistant' ? 'bg-white rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}
              >
                {highlightSearchTerm(message.content, searchTerm)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </Box>
      <form onSubmit={handleSubmit}>
        <StyledPaper className='flex'>
          <div className='flex-grow'>
            <input
              className='w-full h-full pl-4 pr-2 py-2 focus:outline-none focus:ring-0 text-[15px]'
              type='text'
              placeholder='Type your message...'
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className='h-full flex items-center mr-2 gap-x-3'>
            <div className='flex cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
              <i className='tabler-microphone w-[22px] h-[22px] text-gray-500'></i>
            </div>
            <div className='flex cursor-pointer hover:rounded-full hover:bg-gray-100 p-2'>
              <i className='tabler-paperclip w-[22px] h-[22px] text-gray-500'></i>
            </div>
            <Button type='submit' variant='contained' endIcon={<i className='tabler-send'></i>}>
              Send
            </Button>
          </div>
        </StyledPaper>
      </form>
    </div>
  )
}
