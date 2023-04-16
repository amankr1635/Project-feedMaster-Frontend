import { create } from 'zustand'

export const useAppState = create((set) => ({
    token:"",
    setToken(token){
        set({token})
    },
    unSetToken(){
        set({token:""})
    }
}))

