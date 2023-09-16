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
import { Item, priceRegex } from '../../../consts'

interface EditItemDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  selectedIndex: number
}

const EditItemDialog: FC<EditItemDialogProps> = (props) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const [isPriceValid, setIsPriceValid] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (props.items.length === 0) return
    setName(props.items[props.selectedIndex].name)
    setPrice(props.items[props.selectedIndex].price.toString())
    setIsNameValid(true)
    setIsPriceValid(true)
    setIsFormValid(false)
  }, [props.open])

  useEffect(() => {
    checkFormValid()
  }, [isNameValid, isPriceValid])

  const handleDialogSave = () => {
    if (!name || !price) return

    props.setItems((prevItems) => {
      const newItems = [...prevItems]
      newItems[props.selectedIndex] = {
        name: name.trim(),
        price: Number(price.trim()),
        userIds: newItems[props.selectedIndex].userIds,
      }
      return newItems
    })
    props.setOpen(false)
  }

  const handleDialogCancel = () => {
    props.setOpen(false)
  }

  const checkFormValid = () => {
    if (isNameValid && isPriceValid) {
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
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            error={!isNameValid}
            helperText={
              !isNameValid ? 'Item name must be greater than 0 charcters' : ''
            }
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setIsNameValid(e.target.value !== '')
              checkFormValid()
            }}
          />
          <TextField
            error={!isPriceValid}
            helperText={
              !isPriceValid ? 'Price must be a number up to 2 decimals' : ''
            }
            label="Price ($)"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
              setIsPriceValid(priceRegex.test(e.target.value))
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

export default EditItemDialog
