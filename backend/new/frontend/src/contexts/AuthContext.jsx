import React from 'react'

const AuthContext = React.createContext()

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null) 
    
    const login = async ({email, password}) => {
        try {
            const response = await axios.post('#', {email, password})
            const {access_token, username, user_id} = response.data
            setUser({email, username, access_token, user_id})
            localStorage.setItem('access_token', access_token)
            return response
          } catch (error) {
            if (error.response) {
                return error.response
            } else {
                throw error;
            }
          }
    }
    const register = async ({first_name, last_name, email, password}) => {
        try {
            const response = await axios.post('#', {first_name, last_name, email, password})
            const {access_token, username, user_id} = response.data
            setUser({email, username, access_token, user_id})
            localStorage.setItem('access_token', access_token)
            return response
        } catch(error){
            if (error.response) {
                return error.response
            } else {
                throw error;
            }
        }

    }
    const patchUser = async (userData) => {
        try {
            const token = localStorage.getItem('access_token')
            const headers = {
                "Content_Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const response = await axios.patch('/auth/update', userData, {headers})
            return response
        } catch(error){
            if (error.response) {
                return error.response;
            } else {
                throw error;
            }
        }
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('access_token')
    }
    return (
        <AuthContext.Provider value={{user, login, register, logout, patchUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext} 