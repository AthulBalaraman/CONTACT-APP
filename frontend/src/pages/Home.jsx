import { useState } from "react";
import { useEffect } from "react";
import LogoHeading from "../components/LogoHeading";
import AddContact from "../components/AddContact";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const userID = location.state?.userID;

  return (
    <>
      <LogoHeading />
      <AddContact userID={userID} />
      <SearchBar userID={userID} />
      <ContactCard userID={userID} />
    </>
  );
};

export default Home;
