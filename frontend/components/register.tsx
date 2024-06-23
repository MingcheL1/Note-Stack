import Link from "next/link"
import { FC } from "react"

export const Register:FC=()=>{
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
        <button className="form-submit-btn" type="submit">Register</button>
      </form>
      
    </div>
    )
}