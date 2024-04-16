import ClipLoader from "react-spinners/ClipLoader";


const override= {CSSProperties :{
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  }};


  export default function LoadingScreen({ isLoading}){
    return <div style={{width:"100%", height:"50rem",backgroundColor:"#222", display:"flex", alignItems:"center", justifyContent:"center"}}><ClipLoader
    color={"white"}
    loading={isLoading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  /></div> ;
  }