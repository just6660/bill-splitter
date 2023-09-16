import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { FC, useState } from 'react'
import { Item, User } from '../../consts'
import { CreateUserDialog, EditNameDialog, EditProfileDialog } from '../dialogs'

interface UsersAccordionProps {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const UsersAccordion: FC<UsersAccordionProps> = ({
  users,
  setUsers,
  setItems,
}) => {
  const [openCreate, setOpenCreate] = useState(false)
  const [openEditName, setOpenEditName] = useState(false)
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const updateItemsAfterUserDelete = (userId: string) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        return {
          ...item,
          userIds: item.userIds.filter((user) => user !== userId),
        }
      })
    })
  }

  return (
    <>
      <div className="flex">
        <Accordion
          className="!bg-mat-blue w-[80vw] md:w-[500px]"
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <Typography className="text-white">Users</Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-gray-light">
            <List>
              <ListItem>
                <ListItemButton
                  className="!bg-gray !text-white shadow-md"
                  onClick={() => setOpenCreate(true)}
                >
                  <ListItemText primary="Add User" />
                  <AddCircleIcon />
                </ListItemButton>
              </ListItem>
              {users.map((user, index) => (
                <ListItem key={user.id}>
                  <IconButton
                    onClick={() => {
                      setSelectedIndex(index)
                      setOpenEditProfile(true)
                    }}
                  >
                    <Avatar sx={{ bgcolor: user.profileColor }}>
                      {`${user.firstName[0]}${
                        user.lastName ? user.lastName[0] : ''
                      }`}
                    </Avatar>
                  </IconButton>
                  <ListItemButton
                    onClick={() => {
                      setSelectedIndex(index)
                      setOpenEditName(true)
                    }}
                  >
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName ?? ''}`}
                    />
                  </ListItemButton>
                  <IconButton
                    onClick={() => {
                      updateItemsAfterUserDelete(user.id)
                      setUsers((prevUsers) => {
                        return prevUsers
                          .slice(0, index)
                          .concat(prevUsers.slice(index + 1))
                      })
                      setSelectedIndex(0)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
      <EditProfileDialog
        open={openEditProfile}
        setOpen={setOpenEditProfile}
        users={users}
        setUsers={setUsers}
        selectedIndex={selectedIndex}
      />
      <EditNameDialog
        open={openEditName}
        setOpen={setOpenEditName}
        users={users}
        setUsers={setUsers}
        selectedIndex={selectedIndex}
      />
      <CreateUserDialog
        open={openCreate}
        setOpen={setOpenCreate}
        users={users}
        setUsers={setUsers}
      />
    </>
  )
}

export default UsersAccordion
