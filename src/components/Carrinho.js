import React from "react";
import styled from "styled-components";

const CardServico = styled.div`
  display: flex;
  background-color: #B3ADD9;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const TodosBotoes = styled.button`
  border: 1px solid #9f96d9;
  background-color: ${props => props.botaoPrincipal ? '#9f96d9' : 'white'};
  color: ${props => props.botaoPrincipal ? 'white' : '#B3ADD9'};
  border-radius: 5px;
  padding: 5px;
  margin: 15px;
  &:hover{
    background-color: #7165bf;
    color: white;
  }
`

const ContainerPrincipal = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const Finalizacao = styled.div`
  display: flex;
`

export default class Header extends React.Component {
  calcularTotal = () => {
    const totalValor = this.props.carrinho.reduce((total, servico) => {
      return total + servico.price;
    }, 0);
    return totalValor;
  };

  mostrarLista = () => {
    return this.props.carrinho.map((servico, index) => (
      <CardServico key={servico.id}>
        <p><b>{servico.title}</b></p>
        <p><b>
          Preço:{" "}
          {servico.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </b></p>
        <TodosBotoes onClick={() => this.props.removerDoCarrinho(index)} style={{cursor:'pointer'}}>
          Remover
        </TodosBotoes>
      </CardServico>
    ));
  };

  render() {
    const total = this.calcularTotal();

    const telaCarrinho =
      this.props.carrinho.length <= 0 ? (
        <h2>Carrinho Vazio</h2>
      ) : (
        <ContainerPrincipal>
          <h2>Carrinho</h2>
          {this.mostrarLista()}
          <Finalizacao>
            <h2>
              Total:{" "}
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
            <TodosBotoes botaoPrincipal={true} onClick={this.props.finalizarCompra} style={{cursor:'pointer'}}>
              Finalizar Compra
            </TodosBotoes>
            <TodosBotoes onClick={this.props.irParaProdutos} style={{cursor:'pointer'}}>
              Voltar Para Lista
            </TodosBotoes>
          </Finalizacao>
        </ContainerPrincipal>
      );

    return <div>{telaCarrinho}</div>;
  }
}