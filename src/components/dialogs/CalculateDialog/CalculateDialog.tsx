import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Item, User } from '../../../consts'

interface CalculateDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  items: Item[]
}

const CalculateDialog: FC<CalculateDialogProps> = (props) => {
  const [payeeToAmount, setPayeeToAmount] = useState<{
    [key: string]: number
  }>({})

  useEffect(() => {
    const newPayeeToAmount: { [key: string]: number } = {}

    props.users.forEach((user) => {
      newPayeeToAmount[user.id] = 0
    })

    props.items.forEach((item) => {
      const amount = item.price / item.userIds.length
      item.userIds.forEach((userId) => {
        newPayeeToAmount[userId] += amount
      })
    })

    setPayeeToAmount(newPayeeToAmount)
  }, [props.open])

  const handleDialogClose = () => {
    props.setOpen(false)
  }

  return (
    <Dialog open={props.open} onClose={handleDialogClose}>
      <DialogTitle>Summary</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} className="mt-2">
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ fontWeight: 'bold' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'inherit' }}>Payee</TableCell>
                <TableCell sx={{ fontWeight: 'inherit' }} align="right">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(payeeToAmount).map((payeeId) => {
                const payee = props.users.find((user) => user.id === payeeId)
                return (
                  <TableRow key={payeeId}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar sx={{ bgcolor: payee?.profileColor }}>
                          {`${payee?.firstName[0]}${
                            payee?.lastName ? payee?.lastName[0] : ''
                          }`}
                        </Avatar>
                        {payee?.firstName} {payee?.lastName}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      ${Math.round(payeeToAmount[payeeId] * 100) / 100}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleDialogClose()}
          variant="outlined"
          endIcon={<CloseIcon />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CalculateDialog
