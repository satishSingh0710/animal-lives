export default function Stray(props){
    
    return(
        <div className="stray-box">
            <img className="stray-img" 
               src={`data:image/jepg;base64,${props.imgsrc}`}
                alt="stray-photo" />
            <div className="about-stray">
                <h3>{props.location}</h3>
                <h5>{`+91 ${props.contact}`}</h5>
            </div>
        </div>
    )
}