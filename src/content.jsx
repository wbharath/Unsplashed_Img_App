import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const AppProvider = ({children})=>{
    //This one tell us whether the system has dark mode or not
    const getInitialDarkMode = ()=>{
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
        
        // console.log(localStorage.getItem('darkTheme'))
        //extra layer of flexibility--> user can control the theme even after refreshing
        const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
        // console.log(prefersDarkMode)
        // return prefersDarkMode
        return storedDarkMode || prefersDarkMode
    }
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    // Method 1
    // const body = document.querySelector('body')
    // // console.log(body)
    // body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

//   ensures that it updates the state of isDarktheme and then run the useeffect where as in above 
// method we are directly updating DOM(manipluation) 
// which isn't ideal in react-> only state driven UI updates

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])



  return (
    <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme,  searchTerm, setSearchTerm}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = ()=>{
return useContext(AppContext)
}