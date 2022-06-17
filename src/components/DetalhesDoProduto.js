import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import { headers, urlBase } from '../constants/variaveisApi'

const ContainerPagina = styled.div`
  display: flex;
  justify-content: center;
  background-color: #F5F4FC;
  min-height: 100vh;
  padding-top: 50px;
`

const ContainerDetalhes = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  background-color: #E9E5FF;
  padding: 30px;
  border-radius: 16px;
  width: 500px;
  height: 500px;
  justify-content: space-around;
  box-shadow: 0 4px 9px 0 #9F96D9, 0 5px 10px 0 rgb(0 0 0 / 19%);

  h1 {
    font-size: 3em;
    text-align: center;
    margin: 0;
  }

`

const Preco = styled.h2`
  font-size: 2.5em;
  font-weight: bold;
  color: #7265BF;
  text-align: center;
  margin: 0;
  padding-top: 20px;
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  margin: 0;
  padding: 20px 0;
  row-gap: 25px;

  p {
    margin: 0;
  }
`

const ContainerBotoes = styled.div`
  display: flex;
  justify-content: space-between;
`

const Botao = styled.button`
  background-color: #FFFFFF;
  height: 40px;
  width: 200px;
  border: 1px solid #9F96D9;
  color: #9F96D9;
  border-radius: 5px;
  font-size: 1.1em;

  :hover {
    cursor: pointer;
    background-color: #9F96D9;
    background-color: #7165BF;
    color: #FFFFFF;
  }
`
const BotaoCarrinho = styled.button`
  background-color: #9F96D9;
  height: 40px;
  width: 200px;
  border: 1px solid #9F96D9;
  color: #FFFFFF;
  border-radius: 5px;
  font-size: 1.1em;
  :hover {
    cursor: pointer;
    background-color: #7265BF;
    color: #FFFFFF;
  }
`
const ContainerPagamentos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`
const ContainerOpcoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`

const Opcao = styled.p`
  display: flex;
  border-radius: 10px;
  min-width: 10px;
  padding: 5px 10px;
  background-color: #B3ADD9;
  color: #FFFFFF;
  margin: 0;
`

export default class DetalheDeProduto extends React.Component {

  state = {
    detalhes: [],
    metodosDePagamento: []
  }

  componentDidMount() {
    this.mostraDetalhesDoServico()
  }

  mostraDetalhesDoServico = () => {
    axios
      .get(`${urlBase}/jobs/${this.props.id}`, headers)
      .then((res) => {
        this.setState({
          detalhes: [res.data],
          metodosDePagamento: res.data.paymentMethods
        })
      })
      .catch((err) => alert(err.response))
  }

  render() {

    const Detalhes = this.state.detalhes.map((detalhe) => {

      const pagamentos = this.state.metodosDePagamento.map((metodo) => {
        return (
          <Opcao key={metodo}>{metodo}</Opcao>
        )
      })

      const preco = detalhe.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      const data = `${detalhe.dueDate.slice(8, 10)}/${detalhe.dueDate.slice(5, 7)}/${detalhe.dueDate.slice(0, 4)}`

      return (
        <ContainerDetalhes key={detalhe.id}>

          <div>
            <h1>{detalhe.title}</h1>
            <Preco>{preco}</Preco>
          </div>

          <Infos>
            <p>Até: {data}</p>
            <p>Descrição: {detalhe.description}</p>

            <ContainerPagamentos>
              Formas de Pagamento:
              <ContainerOpcoes>{pagamentos}</ContainerOpcoes>
            </ContainerPagamentos>
          </Infos>



          <ContainerBotoes>
            <Botao onClick={this.props.irParaProdutos}>Encontrar outro ninja</Botao>
            <BotaoCarrinho onClick={() => this.props.adicionarAoCarrinho(detalhe)}>Adicionar ao carrinho </BotaoCarrinho>
          </ContainerBotoes>
        </ContainerDetalhes>
      )
    })

    return (

      <ContainerPagina>
        {Detalhes}
      </ContainerPagina>
    )

  }
}