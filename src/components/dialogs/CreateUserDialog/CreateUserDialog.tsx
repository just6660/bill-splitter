import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { User, profilePictureColors } from '../../../consts'
import { uniqueId } from 'lodash'

interface CreateUserDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const CreateUserDialog: FC<CreateUserDialogProps> = (props) => {
  const [firstName, setFirstName] = useState('')
  const [isFirstNameValid, setIsFirstNameValid] = useState(false)
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false)
  const [lastName, setLastName] = useState('')
  const [isLastNameValid, setIsLastNameValid] = useState(false)
  const [isLastNameTouched, setIsLastNameTouched] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setFirstName('')
    setLastName('')
    setIsFirstNameValid(false)
    setIsLastNameValid(false)
    setIsFirstNameTouched(false)
    setIsLastNameTouched(false)
    setIsFormValid(false)
  }, [props.open])

  useEffect(() => {
    if (isFirstNameTouched) {
      checkFormValid()
    }
  }, [isFirstNameValid, isLastNameValid])

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const handleDialogCreate = () => {
    props.setUsers((prevUsers) => {
      if (!lastName.trim()) {
        return [
          ...prevUsers,
          {
            id: uniqueId(),
            firstName: (
              firstName.charAt(0).toUpperCase() + firstName.slice(1)
            ).trim(),
            profileColor: profilePictureColors[0],
          },
        ]
      } else {
        return [
          ...prevUsers,
          {
            id: uniqueId(),
            firstName: (
              firstName.charAt(0).toUpperCase() + firstName.slice(1)
            ).trim(),
            lastName: (
              lastName.charAt(0).toUpperCase() + lastName.slice(1)
            ).trim(),
            profileColor: profilePictureColors[0],
          },
        ]
      }
    })
    props.setOpen(false)
  }

  const checkFormValid = () => {
    if (isFirstNameValid && (isLastNameValid || !isLastNameTouched)) {
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
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            error={!isFirstNameValid && isFirstNameTouched}
            helperText={
              !isFirstNameValid && isFirstNameTouched
                ? 'First name must be greater than 0 characters'
                : ''
            }
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setIsFirstNameTouched(true)
              setFirstName(e.target.value)
              setIsFirstNameValid(e.target.value !== '')
              checkFormValid()
            }}
          />
          <TextField
            error={!isLastNameValid && isLastNameTouched}
            helperText={
              !isLastNameValid && isLastNameTouched
                ? 'Last name must be greater than 0 characters'
                : ''
            }
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setIsLastNameTouched(true)
              setLastName(e.target.value)
              setIsLastNameValid(e.target.value !== '')
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
          endIcon={<AddCircleIcon />}
          onClick={handleDialogCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUserDialog
