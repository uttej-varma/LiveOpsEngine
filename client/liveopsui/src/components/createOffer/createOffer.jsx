import "./createOffer.css"
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateOffer=()=>{
    const navigate=useNavigate();
   const [file,setFile]=useState("");
   
    
   const offer_title=useRef();
   const offer_description=useRef();
   const target=useRef();
   const priceCoins=useRef();
   const priceGems=useRef();
   const submitHandler=(e)=>{
      e.preventDefault();
      if(file&&offer_title.current.value&&offer_description.current.value&&target.current.value&&priceCoins.current.value&&priceGems.current.value)
       { const data=new FormData();
       
        data.append("presentImage",file);
        data.append("offer_title",offer_title.current.value);
        data.append("offer_description",offer_description.current.value);
        data.append("target",target.current.value);
        data.append("pricing",JSON.stringify([{ currency: "coins", cost: priceCoins.current.value }, {currency: "gems", cost: priceGems.current.value}]))
        axios.post("http://localhost:3600/api/v1/offer",data).then((res)=>{console.log("success")}).catch((err)=>{console.log("failed")});
       
        alert("posted successfully");
        navigate("/main");

        
      }
      else{
        alert("all fields are manidatory");
      }
      
      
   }
   const goBackHandler=()=>{
    navigate("/main");
   }
    return(
        < >
        <div className="formContainer">
        <form>
            <div>
                <label htmlFor="formTitleField">offer_title:</label>
                <input type="text" id="formTitleField" ref={offer_title}/>
            </div>
            <div>
                <label htmlFor="formDescriptionField">offer_description:</label>
                <input type="text" id="formDescriptionField" ref={offer_description}/>
            </div>
            <div>
                <label htmlFor="formImageField">offer_Image:</label>
                <input type="file" id="formImageField" accept=".jpeg" onChange={(e) => {setFile(e.target.files[0])}}/>
            </div>
            <div>
                <label htmlFor="formTargetField">target:</label>
                <input type="text" id="formTargetField" ref={target}/>
            </div>
            <div>
                <label htmlFor="formCoinsField">Price in coins:</label>
                <input type="number" id="formCoinsField" ref={priceCoins}/>
            </div>
            <div>
                <label htmlFor="formGemsField">Price in gems:</label>
                <input type="number" id="formGemsField" ref={priceGems}/>
            </div>
        </form>
        <button onClick={submitHandler}>Create</button>
        <button className="goBackButton" onClick={goBackHandler}>GoBack</button>
        </div>
        </>
    )
}
export default CreateOffer;