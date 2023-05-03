import { useState, useEffect} from "react"
import axios from "axios"
import Stray from "../components/Stray"
import '../styles/Help.css'

export default function Help(){
    const dataContent= {location:'',contact:'',about:'',image:{name:'',file:null}} 
    const [display, setDisplay]= useState([])
    const [data, setData] = useState(dataContent) // FORM DATA

    const fetchData = async () => {
        try{
            const data = await axios.get('https://safe-stray-life.herokuapp.com/help');
            return data.data;
        } catch(err){
            console.log('err')
        }
      }

    useEffect(()=>{
          fetchData()
            .then(data=> setDisplay(data))
            .catch(err=> console.log('ERROR OCCURED'));
    },[])

    function update(event){

        const {name, value, files} = event.target
        setData(prev=> {
           if(files) return {...prev, [name]: { file: files[0], name: value }}
           return {...prev, [name]: value}})
        
    }

    function submitdata(e){ 
        e.preventDefault()

        const config= {headers:{ "content-type": 'multipart/form-data'},}
        axios.post('https://safe-stray-life.herokuapp.com/help', {
            location: data.location,
            contact:data.contact,
            about:data.about,
            image: data.image.file }
        , config) 
         .then(res => setDisplay(res.data))
         .catch((err) => console.log(err));
    }
    let id=0;
    const displayData= display.map(datauni => {
        let base64= btoa([].reduce.call(new Uint8Array(datauni.img.data.data),function(p,c){return p+String.fromCharCode(c)},''))
        return <Stray  key={id++} imgsrc={base64} location={datauni.location} contact={datauni.contact} name={display.name}/> 
    });

    return(
        <>
            <div className="help-top">
                <h1>Save a Stray.</h1>
                <p className="quote">Saving one Voiceless will not change the world, but surely for that one,
the world will change forever.</p>
            </div>
            
            <div className="all-stray">
                {displayData}
             </div>
            
            <div className="help-end">
            <form id="form" onSubmit={submitdata} method='post' encType="multipart/form-data">
                <label>Location
                <input type='text' name="location" placeholder="Location of your Locality" value={data.location} onChange={update} required/>
                </label>
                
                <label>Contact
                <input type='number' name="contact" placeholder="+91 93898xxx89" onChange={update} value= {data.contact} required/>
                </label>
                
                <label>About
                <input type='textarea' name="about" value={data.about} placeholder="Additonal information about animal." onChange={update} />                    
                </label>

                <label className="upload">Upload Photo
                <input name="image" type='file' className="upload" onChange={update} required/>
                </label>
                
                <input type='submit' className="submit" />
            </form>
                <div className="form-aside">
                    <h2>Help the needy from your Locality.</h2>
                    <p>Upload details of stray animal you see in your surrondings who need any help. Someone from the community will reach out to you via. contact you provide.</p>
                </div>
            </div>
        </>
    )
}