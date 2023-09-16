import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'
import { User } from '../../../consts'

interface EditItemUserDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  dialogSaveAction: (selectedUsers?: User[]) => void
  initSelectedUsers?: User[]
}

const EditItemUserDialog: FC<EditItemUserDialogProps> = ({
  initSelectedUsers = [],
  ...props
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  useEffect(() => {
    setSelectedUsers(initSelectedUsers)
  }, [props.open])

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const handleDialogSave = () => {
    props.dialogSaveAction(selectedUsers)
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleDialogCancel}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>Edit Payees</DialogTitle>
      <DialogContent>
        <List>
          {props.users.map((user, index) => (
            <ListItem key={index}>
              <ListItemButton
                selected={selectedUsers?.includes(user)}
                onClick={() => {
                  setSelectedUsers((prev) => {
                    if (prev?.includes(user)) {
                      return prev.filter((prevUser) => prevUser !== user)
                    } else {
                      return prev ? [...prev, user] : [user]
                    }
                  })
                }}
              >
                <div className="flex justify-center items-center gap-4">
                  <Avatar sx={{ bgcolor: user.profileColor }}>{`${
                    user.firstName[0]
                  }${user.lastName ? user.lastName[0] : ''}`}</Avatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName ?? ''}`}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
          disabled={selectedUsers.length === 0}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleDialogSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditItemUserDialog
