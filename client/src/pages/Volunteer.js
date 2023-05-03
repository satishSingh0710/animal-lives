import { useState, useEffect} from "react"
import axios from "axios"
import Volunteers from '../components/Volunteers'

export default function Volunteer(){
    const dataContent= {name:'',contact:'',about:'',image:{name:'',file:null}} 
    const [display, setDisplay]= useState([])
    const [data, setData] = useState(dataContent)

    const fetchData = async () => {
        try{
            const data = await axios.get('https://safe-stray-life.herokuapp.com/volunteer');
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
        axios.post('https://safe-stray-life.herokuapp.com/volunteer', {
            name: data.name,
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
        return <Volunteers  key={id++} imgsrc={base64} name={datauni.name} contact={datauni.contact}/> 
    });
    
    return(
        <>
        <div className="help-top">
            <h1>Be a change maker.</h1>
            <p>"If you take in a starving dog and make sure it thrives, it will not bite you - This is the fundamental difference between dogs and humans."</p>
        </div>
        <div className="all-stray">
        {displayData}
        </div>
        <div className="help-end">
            <form onSubmit={submitdata}>
                <label>Name
                <input type='text' name="name" placeholder="Name" value={data.name} onChange={update} required/>
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
                    <h2>Be a Volunteer.</h2>
                    <p>If you care for animals and other creatures that we share this earth with and would like to contribute your efforts that could have a multiplier effect in building a compassionate society in India, come join us as a volunteer.</p>
                </div>
            </div>
    </>
    )
}