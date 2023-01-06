import React from 'react'
import "./topbar.scss"
import {Person, Mail} from "@material-ui/icons"

export default function Topbar({menuOpen, setMenuOpen}) {
  return (
    <div className={'topbar ' +  (menuOpen && "active")}>
        <div className="wrapper">
            <div className="left">
                <a href = "#intro" className='logo' > ⌘  </a>
                <div className="itemContainerName">
                    <span>Blood transfusion </span>
                </div>
                <div className="itemContainer">
                    <span> There will be blood. </span>
                </div>
            </div>
            <div className="right">
                <div className="hamburger" onClick = {() => setMenuOpen(!menuOpen)}>
                    <span className = "line1"> </span>
                    <span className = "line2"> </span>
                    <span className = "line3"> </span>
        

                </div>
            </div>
        </div>
    </div>
  )
}
