export interface Item {
  name: string
  price: number
  userIds: string[]
}

export interface User {
  id: string
  firstName: string
  profileColor: string
  lastName?: string
}
