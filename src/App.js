import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import PaginaDeProdutos from "./components/PaginaDeProdutos"
import DetalhesDoProduto from "./components/DetalhesDoProduto"
import Cadastro from './components/Cadastro';

export default class App extends React.Component {
  state = {

    telaAtual: "home",
    produtoId: "",
    carrinho: [],
  }

  adicionarAoCarrinho = (servico) => {
    alert('Produto adicionado ao carrinho')
    const copiaDoCarrinho = this.state.carrinho
    this.setState({ carrinho: [...copiaDoCarrinho, servico] })
  };

  removerDoCarrinho = (servicoIndex) => {
    if (window.confirm('Tem certeza que deseja remover o item?')) {
      const copiaDoCarrinho = this.state.carrinho
      copiaDoCarrinho.splice(servicoIndex, 1)
      this.setState({ carrinho: copiaDoCarrinho })
    }
  };

  finalizarCompra = () => {
    alert('Obrigado por comprar com a gente!')
    this.setState({ carrinho: [] })
  }

  mudarTela = (nomeTela) => {
    this.setState({ telaAtual: nomeTela, produtoId: "" })
  };

  irParaHome = () => {
    this.mudarTela("home")
  };

  irParaCarrinho = () => {
    this.mudarTela("carrinho")
  };

  irParaCadastro = () => {
    this.mudarTela("cadastro")
  };

  irParaDetalhes = (id) => {
    this.setState({ telaAtual: "detalhes", produtoId: id })
  };

  irParaProdutos = () => {
    this.mudarTela("produtos")
  };



  mostrarTela = () => {
    switch (this.state.telaAtual) {

      case "home":
        return <Home irParaCadastro={this.irParaCadastro} irParaProdutos={this.irParaProdutos} />;
      case "carrinho":
        return <Carrinho finalizarCompra={this.finalizarCompra} irParaProdutos={this.irParaProdutos} removerDoCarrinho={this.removerDoCarrinho} carrinho={this.state.carrinho} />;
      case "cadastro":
        return <Cadastro irParaCadastro={this.irParaCadastro} />;
      case "produtos":
        return <PaginaDeProdutos adicionarAoCarrinho={this.adicionarAoCarrinho} irParaProdutos={this.irParaProdutos} irParaDetalhes={this.irParaDetalhes} />;
      case "detalhes":
        return <DetalhesDoProduto adicionarAoCarrinho={this.adicionarAoCarrinho} irParaProdutos={this.irParaProdutos} id={this.state.produtoId} />;
      default:
        return <Home irParaCadastro={this.irParaCadastro} irParaProdutos={this.irParaProdutos} />;
    }
  };

  render() {

    return (
      <div>

        <Header
          irParaCarrinho={this.irParaCarrinho}
          irParaHome={this.irParaHome}
        />

        {this.mostrarTela()}

      </div>
    )
  }
}

