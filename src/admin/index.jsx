const Welcome = () => {
    return(
        <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"200px"}}>
            <img 
            src="http://serverless-project-static-file123.oss-cn-beijing.aliyuncs.com/images/IBlog.png" alt="logo"
            style={{width:"200px",borderRadius:"10px",
            }}
            />
        </div><br/>
        <h2 style={{textAlign:"center"}}>Welcome, IBloger</h2>
        <a href="/" style={{textDecoration:"none",textAlign:"center",display:"block"}} >Click Here To Continue </a>
        </>
    )
}

export default Welcome;