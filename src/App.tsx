import React, { useState } from 'react'
import './App.css'
import { Item, User } from './consts'
import { ImageInput, ItemsAccordion, UsersAccordion } from './components'

function App() {
  const [receiptImg, setReceiptImg] = useState<File | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [items, setItems] = useState<Item[]>([])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-4">
      <UsersAccordion users={users} setUsers={setUsers} setItems={setItems} />
      <ItemsAccordion items={items} setItems={setItems} users={users} />
      {/* <ImageInput handleImg={setReceiptImg} /> */}
    </div>
  )
}

export default App
