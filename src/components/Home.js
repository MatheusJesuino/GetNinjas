import React from 'react'
import styled from "styled-components"
import img from "./img.png"

const AllHome = styled.div`
background-color: #F5F4FC;
height: 85vh;
width: 99vw;
`

const ContainerHome = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: #F5F4FC;
width: 100%;
height: 100%;

`
const ButtonCadastro = styled.div`
display: flex;
justify-content: center;
`

const Buttons  = styled.button`
  &:hover {
    background: #7165bf;
    color:white;
  }
margin:10px;
margin-left: 40px;
margin-right: 40px;
padding: 10px;
background: #F5F4FC;
font-family: 'Montserrat', sans-serif;
font-weight: bold;
font-size: 18px;
line-height: 18px;
display: flex;
align-items: center;
text-align: center;
color: #9F96D9;
border: solid #9F96D9 2px ;
cursor: pointer;
border-radius: 12px;

`



const ImgHome = styled.img`
   text-align: center;
max-height: 400px;
`

export default class Home extends React.Component {

  render() {

    return (
      <AllHome>
    
        <ContainerHome>
        < ImgHome src={img} />
        </ContainerHome>

        <ButtonCadastro>
          <Buttons onClick={this.props.irParaCadastro}>Quero ser um ninja</Buttons>
          <Buttons onClick={this.props.irParaProdutos}>Quero contratar um ninja</Buttons>
        </ButtonCadastro>

      </AllHome>
    )
  }
}