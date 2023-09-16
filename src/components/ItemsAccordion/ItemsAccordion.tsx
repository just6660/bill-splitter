import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Button,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CalculateIcon from '@mui/icons-material/Calculate'
import React, { FC, useEffect, useState } from 'react'
import { Item, User } from '../../consts'
import {
  CreateItemDialog,
  EditItemDialog,
  EditItemUserDialog,
} from '../dialogs'
import CalculateDialog from '../dialogs/CalculateDialog/CalculateDialog'
import { grey } from '@mui/material/colors'

interface ItemsAccordionProps {
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  users: User[]
}

const isCalculateValid = (items: Item[]) => {
  let isCalculateValid = true

  items.forEach((item) => {
    if (item.userIds.length === 0) {
      isCalculateValid = false
    }
  })

  if (items.length === 0) {
    isCalculateValid = false
  }

  return isCalculateValid
}

const ItemsAccordion: FC<ItemsAccordionProps> = ({
  items,
  setItems,
  users,
}) => {
  const [openEditItem, setOpenEditItem] = useState(false)
  const [openEditItemUser, setOpenEditItemUser] = useState(false)
  const [openCreateItem, setOpenCreateItem] = useState(false)
  const [openCalculate, setOpenCalulate] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const calculateValid = isCalculateValid(items)

  const getUserFromUserId = (userId: string) => {
    const user = users.find((user) => user.id === userId)
    return user
      ? user
      : { id: '', firstName: '', lastName: '', profileColor: '' }
  }

  const getInitialsFromUserId = (userId: string) => {
    const user = getUserFromUserId(userId)
    return `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`
  }

  const handleEditItemUserDialogSave = (selectedUsers?: User[]) => {
    if (selectedUsers) {
      const newItems = [...items]
      newItems[selectedIndex].userIds = selectedUsers.map((user) => user.id)
      setItems(newItems)
    }
    setOpenEditItemUser(false)
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
            <Typography className="text-white">Items</Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-gray-light !rounded-b-none">
            <List>
              <ListItem>
                <ListItemButton
                  className="!bg-gray !text-white shadow-md"
                  onClick={() => setOpenCreateItem(true)}
                >
                  <ListItemText primary="Add Item" />
                  <AddCircleIcon />
                </ListItemButton>
              </ListItem>
              {items.map((item, index: number) => {
                return (
                  <ListItem key={index}>
                    <ListItemButton
                      sx={{ flexGrow: 0 }}
                      onClick={() => {
                        setSelectedIndex(index)
                        setOpenEditItemUser(true)
                      }}
                    >
                      <AvatarGroup
                        className="flex justify-center items-center w-[60px]"
                        max={2}
                        spacing="medium"
                      >
                        {item.userIds.map((userId, index) => {
                          return (
                            <Avatar
                              key={index}
                              sx={{
                                bgcolor: getUserFromUserId(userId).profileColor,
                              }}
                            >
                              {getInitialsFromUserId(userId)}
                            </Avatar>
                          )
                        })}
                        {item.userIds.length === 0 && (
                          <Avatar sx={{ bgcolor: grey[500] }}>N/A</Avatar>
                        )}
                      </AvatarGroup>
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        setSelectedIndex(index)
                        setOpenEditItem(true)
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price}`}
                      />
                    </ListItemButton>
                    <IconButton
                      onClick={() => {
                        setItems((prevItems) => {
                          return prevItems
                            .slice(0, index)
                            .concat(prevItems.slice(index + 1))
                        })
                        setSelectedIndex(0)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                )
              })}
            </List>
          </AccordionDetails>
          <AccordionActions className="flex !justify-center bg-gray-light !rounded-b-xl ">
            <Tooltip
              title={
                !calculateValid && items.length > 0
                  ? 'Select at least 1 payee for every item'
                  : ''
              }
            >
              <span>
                <Button
                  disabled={!calculateValid}
                  color="success"
                  variant="contained"
                  startIcon={<CalculateIcon />}
                  onClick={() => setOpenCalulate(true)}
                >
                  calculate
                </Button>
              </span>
            </Tooltip>
          </AccordionActions>
        </Accordion>
      </div>
      <CreateItemDialog
        open={openCreateItem}
        setOpen={setOpenCreateItem}
        users={users}
        items={items}
        setItems={setItems}
        selectedIndex={selectedIndex}
      />
      <EditItemDialog
        open={openEditItem}
        setOpen={setOpenEditItem}
        items={items}
        setItems={setItems}
        selectedIndex={selectedIndex}
      />
      <EditItemUserDialog
        open={openEditItemUser}
        setOpen={setOpenEditItemUser}
        users={users}
        dialogSaveAction={handleEditItemUserDialogSave}
        initSelectedUsers={
          items.length > 0
            ? items[selectedIndex].userIds.map((userId) => {
                return getUserFromUserId(userId)
              })
            : []
        }
      />
      <CalculateDialog
        open={openCalculate}
        setOpen={setOpenCalulate}
        items={items}
        users={users}
      />
    </>
  )
}

export default ItemsAccordion
