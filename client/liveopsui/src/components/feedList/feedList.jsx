import "./feedList.css";
import axios from "axios";
const FeedList=(props)=>{
    const base64string=btoa(
        String.fromCharCode(...new Uint8Array((props.offer.offer_image.data.data)))
    )
    const deleteHandler=async(value)=>{
          await axios.delete(`http://localhost:3600/api/v1/offer?id=${value.offer_id}`)
          .then((res)=>{console.log("success");
          if(props.tooggle===true)
           {
            props.toogleHandler(false);
            props.inpu("");
           }
           else{
            props.toogleHandler(true);
            props.inpu("");
           }
        }).catch((err)=>{console.log(err)})
           
        }
    return(
        <>
        <div className="offerContainer">
                    <div className="offerContainerInfo">
                        <div>{props.offer.offer_id}</div>
                        <div className="priceingold">$ {JSON.parse(JSON.parse(props.offer.pricing)[0].cost)} </div>
                        <div>{props.offer.offer_title}</div>
                        <div className="priceingems"># {JSON.parse(JSON.parse(props.offer.pricing)[1].cost)}</div>
                    </div>
                    <img src={`data:image/png;base64,${base64string}`} alt="imageofOffer"/>
                    <div>
                        <p>{props.offer.offer_description}</p>
                    </div>
                    <div className="mainPageContainerbodyrightpartbuttonsection">
                        <button>Update</button>
                        <button onClick={()=>{deleteHandler(props.offer)}}>Delete</button>
                    </div>

        </div>
        
        </>
    )
}
export default FeedList;