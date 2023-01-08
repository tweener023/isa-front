import React from 'react'
import "./menu.scss"


export default function Menu({menuOpen, setMenuOpen}) {
  return (
    <div className={'menu ' + (menuOpen && "active")}>
        <ul>
            
            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#login"> Login </a>
            </li>
        
            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#registrationForm"> Registration </a>
            </li>

            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#profile"> Profile </a>
            </li>

            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#myAppointments"> My appointments </a>
            </li>


            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#availableAppointments"> Available appointments </a>
            </li>

            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#customAppointment"> Custom appointment </a>
            </li>

            <li onClick={() =>setMenuOpen(false)}>
                <a href = "#facilities"> Facilities </a>
            </li>

        </ul>
    </div>
  )
}
