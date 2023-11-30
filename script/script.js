// Função para obter os dados da lista do localStorage
function getListaFromLocalStorage() {
  let lista = JSON.parse(localStorage.getItem("tarefas")) || [];
  return lista;
}

// Função para salvar a lista no localStorage
function salvarListaNoLocalStorage(lista) {
  localStorage.setItem("tarefas", JSON.stringify(lista));
}

// Função para adicionar um item à lista na página
function adicionarItemNaPagina(item) {
  let li = document.createElement("li");
  let dateText = document.createTextNode(
    item.data + " - " + item.nome + " - " + item.telefone
  );
  li.appendChild(dateText);

  // Adicionar o botão de fechar ao item
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  // Adicionar um identificador único ao botão
  let uniqueId = "closeBtn_" + item.id;
  span.id = uniqueId;

  span.onclick = function () {
    let id = li.getAttribute("data-id");
    let lista = getListaFromLocalStorage();
    lista = lista.filter((item) => item.id != id);
    salvarListaNoLocalStorage(lista);
    li.remove();
  };

  li.appendChild(span);

  // Adicionar um identificador único ao item
  li.id = "item_" + item.id;
  li.setAttribute("data-id", item.id);

  // Adicionar o item à lista de tarefas na página
  document.getElementById("itemLista").appendChild(li);
}

// Função para adicionar um botão de fechar a um item existente
function adicionarBotaoFechar(item, id) {
  // Verifica se o botão já foi adicionado
  if (!item.querySelector(".close")) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    item.appendChild(span);

    span.onclick = function () {
      let lista = getListaFromLocalStorage();
      lista = lista.filter((item) => item.id != id);
      salvarListaNoLocalStorage(lista);
      item.remove();
    };
  }
}

// Adiciona a função addElemento para adicionar novos itens à lista quando o botão "Incluir" é clicado
function addElemento() {
  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("telefone").value;
  let li = document.createElement("li");
  let inputValue = document.getElementById("Mensagem").value; // Corrigir o ID do campo de entrada
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("pt-Br");
  let dateText = document.createTextNode(
    formattedDate + " - " + nome + " - " + telefone + " - "
  );
  li.appendChild(dateText);
  let t = document.createTextNode(inputValue.toUpperCase());
  li.appendChild(t);

  // Obter a lista atual do localStorage
  let lista = getListaFromLocalStorage();

  // Adicionar a nova tarefa à lista
  let novoItem = {
    id: new Date().getTime(),
    descricao: inputValue.toUpperCase(),
    data: formattedDate,
    nome: nome,
    telefone: telefone,
  };
  lista.push(novoItem);

  // Atualizar a lista no localStorage
  salvarListaNoLocalStorage(lista);

  // Adicionar o novo item à página
  if (inputValue === "") {
    alert("Você precisa descrever o item");
  } else {
    adicionarItemNaPagina(novoItem);
  }

  // Limpar o campo de entrada após adicionar o item
  document.getElementById("Mensagem").value = "";

  return false; // Evita que o formulário seja enviado
}
// Carregar dados da lista do localStorage ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  let lista = getListaFromLocalStorage();

  // Adicionar itens da lista ao HTML
  for (let i = 0; i < lista.length; i++) {
    adicionarItemNaPagina(lista[i]);
  }

  // Adicionar botão de fechar para os itens iniciais
  let itensIniciais = document.querySelectorAll("#itemLista li");
  itensIniciais.forEach((item) => {
    adicionarBotaoFechar(item, item.getAttribute("data-id"));
  });
});

// Cria um botão "Limpar Lista" que remove todos os itens da lista
function limparLista() {
  let list = document.getElementById("itemLista");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  salvarListaNoLocalStorage([]);
}

// Adiciona o botão "Limpar Lista" ao final do corpo do documento
document.body.appendChild(btnLimparLista);

// Função para pesquisar na lista
function pesquisarLista() {
  let termoPesquisa = document
    .getElementById("caixaPesquisa")
    .value.toLowerCase();
  let itensLista = document.querySelectorAll("#itemLista li");
  let itemNaoEncontrado = true;

  itensLista.forEach((item) => {
    let textoItem = item.innerText.toLowerCase();
    if (textoItem.includes(termoPesquisa)) {
      item.style.display = "block";
      itemNaoEncontrado = false;
    } else {
      item.style.display = "none";
    }
  });

  if (itemNaoEncontrado) {
    let mensagemNaoEncontrado = document.createElement("p");
    mensagemNaoEncontrado.textContent = "Item não encontrado!!!";
    document
      .getElementById("itemListaTarefas")
      .appendChild(mensagemNaoEncontrado);
  } else {
    let mensagemExistente = document.querySelector("#itemLista p");
    if (mensagemExistente) {
      mensagemExistente.remove();
    }
  }
}

// Função para cancelar a pesquisa na lista
function cancelarPesquisa() {
  let itensLista = document.querySelectorAll("#itemLista li");

  itensLista.forEach((item) => {
    item.style.display = "block";
  });

  document.getElementById("caixaPesquisa").value = "";
  let mensagemExistente = document.querySelector("#itemLista p");
  if (mensagemExistente) {
    mensagemExistente.remove();
  }
}

// Adicionar um evento de clique ao botão de pesquisa
document
  .getElementById("botaoPesquisar")
  .addEventListener("click", pesquisarLista);

// Adicionar um evento de clique ao botão de cancelar pesquisa
document
  .getElementById("botaoCancelar")
  .addEventListener("click", cancelarPesquisa);

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("Mensagem").value = "";
}
