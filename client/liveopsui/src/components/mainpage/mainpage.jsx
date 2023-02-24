import Asidebar from "../asideBar/aside";
import axios from "axios";
import { useState } from "react";
import {useEffect} from "react";

import "./mainpage.css"
import FeedList from "../feedList/feedList";
const MainPage=()=>{
    const [data,setData]=useState([]);
    const [input,setInput]=useState("");
    const [arr,setArr]=useState([]);
    const [toggle,setToggle]=useState(true);
    
 
    useEffect(()=>{
        axios.get("http://localhost:3600/api/v1/offer").then((response)=>{setData(response.data.data)}).catch((err)=>{console.log(err)});
    },[toggle]);
    const filterHandler=(value)=>{
        setInput(value);
      let urr=data.filter((values,index)=>{
            return values.offer_title.includes(input);
            })
            setArr([...urr]);
        console.log(arr);
    }
    console.log(data);
    return(
        <div className="mainPageContainer">
        <div className="mainPageContainerTopBar">
            <h1>Offer4U....</h1>
            <input type="text" placeholder="search by title" onChange={(e)=>{filterHandler(e.target.value)}} value={input}/>
        </div>
        <div className="mainPageContainerbody">
            <Asidebar className="mainPageContainerbodyleftpart"/>
            <div className="mainPageContainerbodyrightpart">
              {!input?
              data.map((value,index)=>{
                return(
                    <FeedList key={index} offer={value} toogleHandler={setToggle} tooggle={toggle} inpu={setInput}/>
                )
              }):  arr.map((value,index)=>{
                return(
                    <FeedList key={index} offer={value} toogleHandler={setToggle} tooggle={toggle} inpu={setInput}/>
                )
              })}
              
            </div>
            
        </div>

    </div>
      
    )
}
export default MainPage;