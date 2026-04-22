import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    role: null, // 'volunteer' | 'organization' | null
    name: '',
    hours: 48, // for rewards demo
  })
  const [formData, setFormData] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser, formData, setFormData }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
