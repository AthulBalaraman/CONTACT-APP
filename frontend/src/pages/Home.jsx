import {useEffect} from 'react'
import LogoHeading from '../components/LogoHeading'
import AddContact from '../components/AddContact'
import SearchBar from '../components/SearchBar'
import ContactCard from '../components/ContactCard'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
  const location = useLocation()
  const userID = location.state?.userID
  console.log("THis is user from home page",userID)
  let myContacts
  useEffect(()=>{
    const fetchContacts = async(userID)=>{
      console.log("his ==========",userID)
      myContacts = await axios.get('http://localhost:5000/getMyContacts',userID)
      console.log("this is myconntacts of the user ", myContacts)
    }
    fetchContacts(userID)
  },[])
  
  return (
    <>
    <LogoHeading/>
    <AddContact userID={userID}/>
    <SearchBar/>
    <ContactCard/>
    </>
  )
}

export default Home
