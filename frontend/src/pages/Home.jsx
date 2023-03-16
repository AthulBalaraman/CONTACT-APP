import React from 'react'
import LogoHeading from '../components/LogoHeading'
import AddContact from '../components/AddContact'
import SearchBar from '../components/SearchBar'
import ContactCard from '../components/ContactCard'
const Home = () => {
  return (
    <>
    <LogoHeading/>
    <AddContact/>
    <SearchBar/>
    <ContactCard/>
    </>
  )
}

export default Home
