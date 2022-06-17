import React from "react";
import axios from "axios";
import styled from "styled-components";
import { headers } from "../constants/variaveisApi";
import { urlBase } from "../constants/variaveisApi";

const ContainerInputs = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  #E9E5FF;
  width:50%;
  margin:0 auto;
  box-shadow: 0 4px 9px 0 #9F96D9, 0 5px 10px 0 rgb(0 0 0 / 19%);
  border-radius: 16px;
  padding: 16px;
  margin-top:10px;
  font-family: 'Montserrat', sans-serif;

  input {
    margin-top: 5px;    
    background: #FFFFFF;
    border-radius: 10px;
    margin: 10px;
    height: 23px;
    text-align: center;
    border: #7265BF;
    color: #7265BF;
    width: 100%;
    display: flex;
  }

  select {
    margin-top: 5px;
    width: 100%;
  }

  button {
    &:hover {
      background: #7165bf;
      color:white;
    }
  margin:10px;
  margin-left: 40px;
  margin-right: 40px;
  padding: 10px;
  background: #F5F4FC;
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
  }
  `
  

//background-color: #E9E5FF;
  ;

export default class Cadastro extends React.Component {
  state = {
    titulo: "",
    descricao: "",
    preco: "",
    pagamento: [],
    data: "",
  };

  criarCadastros = () => {
    const bodyCadatros = {
      title: this.state.titulo,
      description: this.state.descricao,
      price: Number(this.state.preco),
      paymentMethods: this.state.pagamento,
      dueDate: this.state.data,
    };

    axios
      .post(`${urlBase}/jobs`, bodyCadatros, headers)
      .then((res) => {
        this.setState({
          titulo: "",
          descricao: "",
          preco: "",
          pagamento: "",
          data: "",
        });
        alert("cadastro com sucesso !");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  onChangeInputTitulo = (e) => {
    this.setState({ titulo: e.target.value });
  };
  onChangeInputDescricao = (e) => {
    this.setState({ descricao: e.target.value });
  };

  onchangeInputPreco = (e) => {
    this.setState({ preco: e.target.value });
  };
  onChangeData = (e) => {
    this.setState({ data: e.target.value });
  };
  onChangeInputPagamento = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value)
    this.setState({ pagamento: valor })
  };

  render() {
    return (
     
        
        <ContainerInputs>
          <h1>Cadastre seu Serviço</h1>
          <input
            placeholder="Titulo do Serviço"
            onChange={this.onChangeInputTitulo}
            value={this.state.titulo}
          />
          <input
            placeholder="Descrição"
            onChange={this.onChangeInputDescricao}
            value={this.state.descricao}
          />
          <input
            type="number"
            placeholder="Preço"
            onChange={this.onchangeInputPreco}
            value={this.state.preco}
          />

          <select
            multiple
            onChange={this.onChangeInputPagamento}
            value={this.state.pagamento}
          >
            <option value={'credito'}>Cartão de credito </option>
            <option value={'debito'}>Cartão de debito </option>
            <option value={'pix'}>Pix </option>
            <option value={'boleto'}>Boleto bancario</option>
            <option value={'paypal'}>paypal </option>
          </select>

          <input
            type="date"
            value={this.state.data}
            onChange={this.onChangeData}
          />
          <button onClick={this.criarCadastros}>Cadastrar</button>
        </ContainerInputs>
        
    );
  }
}