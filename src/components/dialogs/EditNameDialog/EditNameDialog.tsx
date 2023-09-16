import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'
import { User } from '../../../consts'

interface EditNameDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  selectedIndex: number
}

const EditNameDialog: FC<EditNameDialogProps> = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isFirstNameValid, setIsFirstNameValid] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (props.users.length === 0) return
    setFirstName(props.users[props.selectedIndex].firstName)
    setLastName(props.users[props.selectedIndex].lastName ?? '')
    setIsFirstNameValid(true)
    setIsFormValid(false)
  }, [props.open])

  useEffect(() => {
    checkFormValid()
  }, [isFirstNameValid])

  const handleDialogSave = () => {
    if (!firstName) return

    props.setUsers((prevUsers) => {
      const newItems = [...prevUsers]
      if (!lastName.trim()) {
        newItems[props.selectedIndex] = {
          id: newItems[props.selectedIndex].id,
          firstName: firstName.trim(),
          profileColor: newItems[props.selectedIndex].profileColor,
        }
        return newItems
      } else {
        newItems[props.selectedIndex] = {
          id: newItems[props.selectedIndex].id,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          profileColor: newItems[props.selectedIndex].profileColor,
        }
      }

      return newItems
    })
    props.setOpen(false)
  }

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const checkFormValid = () => {
    if (isFirstNameValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleDialogCancel}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            error={!isFirstNameValid}
            helperText={
              !isFirstNameValid
                ? 'First name must be greater than 0 charcters'
                : ''
            }
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
              setIsFirstNameValid(e.target.value !== '')
              checkFormValid()
            }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
              checkFormValid()
            }}
          />
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
          endIcon={<SendIcon />}
          onClick={handleDialogSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditNameDialog
