import profilepic from "./assets/20260519_010640.jpg"
function Card(){
    return(
        <div className="card">
            <img src={profilepic} alt="Profile Picture" />
            <h2 className="card-title">Victor Shelby</h2>
            <p className="card-text">i am a mathematical student</p>
        </div>
    );
}

export default Card