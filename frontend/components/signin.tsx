import { FC } from "react"

export const SignIn:FC=()=>{
    return(
        <div className="form-container">
      <form className="form">
        <div className="form-group">
          <label id="email">Email</label>
          <input type="text" id="email" name="email" required/>
        </div>
        <div className="form-group">
          <label id="email">Password</label>
          <input type="text" id="email" name="email" required/>
        </div>
        <button className="form-submit-btn" type="submit">Sign In</button>
      </form>
    </div>
    )
}