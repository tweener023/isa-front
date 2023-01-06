import React from 'react'
import {useState} from "react";
import axios from 'axios'
import { Component } from 'react';
import "./facilities.scss"

export default class Facilities extends Component {

  constructor(props){
    super(props)

    this.state = {
      facilityList : []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8080/api/facilities/all')
    .then(response => {
        this.setState({facilityList: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}
render() {
    const {facilityList} = this.state
    return (
        <div className='facilities' id='facilities' >
          <h1>Facilities</h1>
            {
                facilityList.length ?
                facilityList.map(facility => <div key={facility.centerId}>{facility.centerName}</div>)
                :
                null
            }
        </div>
    )
}
}