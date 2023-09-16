import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'
import { User, profilePictureColors } from '../../../consts'

interface EditProfileDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  selectedIndex: number
}

const EditProfileDialog: FC<EditProfileDialogProps> = (props) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    profilePictureColors[0]
  )
  const [isSelectionValid, setIsSelectionValid] = useState(true)

  useEffect(() => {
    if (props.users.length === 0) return
    setSelectedColor(props.users[props.selectedIndex].profileColor)
  }, [props.open])

  const handleSelectedColor = (
    _: React.MouseEvent<HTMLElement>,
    newSelectedColor: string
  ) => {
    setSelectedColor(newSelectedColor)
  }

  const handleDialogSave = () => {
    const newUsers = [...props.users]
    newUsers[props.selectedIndex].profileColor = selectedColor
    props.setUsers(newUsers)
    props.setOpen(false)
  }

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const getUserInitials = () => {
    if (props.users.length === 0) return ''
    const user = props.users[props.selectedIndex]
    return `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleDialogCancel}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>Edit Profile Picture</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          className="flex flex-wrap items-center justify-center"
          value={selectedColor}
          onChange={handleSelectedColor}
          exclusive
        >
          {profilePictureColors.map((color, index) => (
            <ToggleButton value={color} key={index}>
              <Avatar sx={{ bgcolor: color }}>{getUserInitials()}</Avatar>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
          disabled={!isSelectionValid}
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

export default EditProfileDialog
