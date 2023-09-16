import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Item, User, priceRegex } from '../../../consts'
import { grey } from '@mui/material/colors'
import EditItemUserDialog from '../EditItemUserDialog/EditItemUserDialog'

interface CreateItemDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  selectedIndex: number
}

const CreateItemDialog: FC<CreateItemDialogProps> = (props) => {
  const [openEditItemUser, setOpenEditItemUser] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [payees, setPayees] = useState<User[]>()
  const [isNameValid, setIsNameValid] = useState(false)
  const [isPriceValid, setIsPriceValid] = useState(false)
  const [isNameTouched, setIsNameTouched] = useState(false)
  const [isPriceTouched, setIsPriceTouched] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setName('')
    setPrice('')
    setPayees(undefined)
    setIsNameValid(false)
    setIsPriceValid(false)
    setIsNameTouched(false)
    setIsPriceTouched(false)
    setIsFormValid(false)
  }, [props.open])

  useEffect(() => {
    if (isNameTouched && isPriceTouched && payees) {
      checkFormValid()
    }
  }, [isNameValid, isPriceValid, payees])

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const handleDialogCreate = () => {
    const newItem = {
      name: name,
      price: parseFloat(price),
      userIds: payees ? payees.map((user) => user.id) : [],
    }
    props.setItems((prevItems) => [...prevItems, newItem])
    props.setOpen(false)
  }

  const checkFormValid = () => {
    if (isNameValid && isPriceValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const handleEditItemUserDialogSave = (selectedUsers?: User[]) => {
    if (selectedUsers) {
      setPayees(selectedUsers)
    }
    setOpenEditItemUser(false)
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleDialogCancel}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle>Create Item</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 mt-2">
            <TextField
              error={isNameTouched && !isNameValid}
              helperText={
                isNameTouched && !isNameValid
                  ? 'Item name must be greater than 0 characters'
                  : ''
              }
              label="Item Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setIsNameTouched(true)
                setIsNameValid(e.target.value !== '')
              }}
            />
            <TextField
              error={isPriceTouched && !isPriceValid}
              helperText={
                isPriceTouched && !isPriceValid
                  ? 'Item price must be a number up to 2 decimals'
                  : ''
              }
              label="Item Price ($)"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
                setIsPriceTouched(true)
                setIsPriceValid(priceRegex.test(e.target.value))
              }}
            />
            <div className="flex items-center gap-4 p-3">
              <Typography variant="subtitle1" sx={{ color: grey[600] }}>
                Item Payees:
              </Typography>
              {payees ? (
                <ListItemButton
                  sx={{ flexGrow: 0 }}
                  onClick={() => {
                    setOpenEditItemUser(true)
                  }}
                >
                  <AvatarGroup>
                    {payees.map((user, index) => {
                      return (
                        <Avatar
                          key={index}
                          sx={{ bgcolor: user.profileColor }}
                        >{`${user.firstName[0]}${
                          user.lastName ? user.lastName[0] : ''
                        }`}</Avatar>
                      )
                    })}
                  </AvatarGroup>
                </ListItemButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setOpenEditItemUser(true)
                  }}
                >
                  <Avatar>N/A</Avatar>
                </IconButton>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleDialogCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={!isFormValid}
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={handleDialogCreate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <EditItemUserDialog
        open={openEditItemUser}
        setOpen={setOpenEditItemUser}
        users={props.users}
        dialogSaveAction={handleEditItemUserDialogSave}
      />
    </>
  )
}

export default CreateItemDialog
