'use client'

import { useEffect, useState, type PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import SearchIcon from '@mui/icons-material/Search'

import { ScrollArea } from '@/components/ScrollArea'

type Contact = {
  id: number
  name: string
  lastMessage: string
  img?: string
}

function getContacts() {
  return [
    { id: 12345, name: 'Gawin Griffith', lastMessage: 'I will purchase it for sure. 👍', img: '5.png' },
    {
      id: 23456,
      name: 'Harriet McBride',
      lastMessage: 'If it takes long you can mail me at my mail address.',
      img: '2.png'
    },
    {
      id: 34567,
      name: 'Danny Conner',
      lastMessage:
        'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.'
    },
    {
      id: 45678,
      name: 'Janie West',
      lastMessage:
        'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.'
    },
    {
      id: 56789,
      name: 'Bryan Murray',
      lastMessage: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      img: '5.png'
    },
    {
      id: 67890,
      name: 'Albert Underwood',
      lastMessage:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      img: '6.png'
    },
    {
      id: 78901,
      name: 'Adele Ross',
      lastMessage:
        'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.'
    },
    {
      id: 89012,
      name: 'Mark Berry',
      lastMessage:
        'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      img: '3.png'
    },
    {
      id: 90123,
      name: 'Joseph Evans',
      lastMessage:
        'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      img: '8.png'
    },
    {
      id: 91234,
      name: 'Blake Carter',
      lastMessage: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      img: '4.png'
    }
  ]
}

const StyledPaper = styled(Paper)`
  background-color: var(--mui-palette-background-paper);
  box-shadow: var(--mui-customShadows-sm);
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 100%;
  display: flex;
`

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const StyledAvatarDiv = styled.div`
  border-bottom: 1px solid var(--border-color);
`

export default function Layout({ children }: PropsWithChildren) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const contacts = getContacts()

    setContacts(contacts)
  }, [])

  return (
    <StyledPaper>
      <Box className='min-w-[370px] h-full border-r border-[var(--border-color)]'>
        <StyledAvatarDiv className='h-[76px] py-5 px-4 flex'>
          <Badge
            overlap='circular'
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            className='mis-2'
          >
            <Avatar alt='John Doe' src='/images/avatars/1.png' className='cursor-pointer bs-[40px] is-[40px]' />
          </Badge>
          <TextField
            className='ml-4 w-full pr-3'
            placeholder='Search...'
            size='small'
            variant='outlined'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }
            }}
          />
        </StyledAvatarDiv>
        <ScrollArea className='h-[483px]'>
          <List sx={{ bgcolor: 'background.paper' }}>
            <h3 className='py-2 mb-1 ml-7 text-primary'>Chats</h3>
            <Link href='/chat/54321'>
              <ListItem
                className={`${pathname === `/chat/54321` ? 'bg-primary' : 'hover:bg-gray-100'} p-2 mb-1 mx-3 max-w-[345px] rounded-md`}
              >
                <ListItemAvatar>
                  <Avatar
                    alt='Gawin Griffith'
                    src='/images/avatars/5.png'
                    className='cursor-pointer bs-[38px] is-[38px] ml-1'
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
                      color: pathname === '/chat/54321' ? 'white' : ''
                    }
                  }}
                  primary='Gawin Griffith'
                  secondary='I will purchase it for sure. 👍'
                />
              </ListItem>
            </Link>
            <Link href='/chat/65432'>
              <ListItem
                className={`${pathname === `/chat/65432` ? 'bg-primary' : 'hover:bg-gray-100'} p-2 mb-1 mx-3 max-w-[345px] rounded-md`}
              >
                <ListItemAvatar>
                  <Avatar
                    alt='Harriet McBride'
                    src='/images/avatars/2.png'
                    className='cursor-pointer bs-[38px] is-[38px] ml-1'
                  />
                </ListItemAvatar>
                <ListItemText
                  className='truncate'
                  sx={{
                    '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
                      color: pathname === '/chat/65432' ? 'white' : ''
                    }
                  }}
                  primary='Harriet McBride'
                  secondary='If it takes long you can mail me at my mail address.'
                />
              </ListItem>
            </Link>
            <h3 className='py-2 mb-1 mt-2 ml-7 text-primary'>Contacts</h3>
            {contacts.map(contact => (
              <Link key={contact.id} href={`/chat/${contact.id}`}>
                <ListItem
                  className={`${pathname === `/chat/${contact.id}` ? 'bg-primary' : 'hover:bg-gray-100'} p-2 mb-1 mx-3 max-w-[345px] rounded-md`}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={contact.name}
                      src={`/images/avatars/${contact.img}`}
                      className='cursor-pointer bs-[38px] is-[38px] ml-1'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
                        color: pathname === `/chat/${contact.id}` ? 'white' : ''
                      }
                    }}
                    className='truncate'
                    primary={contact.name}
                    secondary={contact.lastMessage}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </ScrollArea>
      </Box>
      {children}
    </StyledPaper>
  )
}
