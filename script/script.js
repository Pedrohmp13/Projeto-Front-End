function getListaFromLocalStorage() {
  let lista = JSON.parse(localStorage.getItem("contato")) || [];
  return lista;
}

function salvarListaNoLocalStorage(lista) {
  localStorage.setItem("contato", JSON.stringify(lista));
}

function adicionarItemNaPagina(item) {
  let li = document.createElement("li");
  li.className = "lista-tarefas";
  let dateText = document.createTextNode(
    item.data + " - " + item.nome + " - " + item.telefone
  );
  li.appendChild(dateText);

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

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

  li.id = "item_" + item.id;
  li.setAttribute("data-id", item.id);

  document.getElementById("itemLista").appendChild(li);
}

function adicionarBotaoFechar(item, id) {
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

function addElemento() {
  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("telefone").value;
  let li = document.createElement("li");
  let inputValue = document.getElementById("Mensagem").value;
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("pt-Br");
  let dateText = document.createTextNode(
    formattedDate + " - " + nome + " - " + telefone + " - "
  );
  
  let p = document.createElement("p");
  p.appendChild(dateText);
  li.appendChild(p);
  let t = document.createTextNode(inputValue.toUpperCase());
  li.appendChild(t);

  let lista = getListaFromLocalStorage();

  let novoItem = {
    id: new Date().getTime(),
    descricao: inputValue.toUpperCase(),
    data: formattedDate,
    nome: nome,
    telefone: telefone,
  };
  lista.push(novoItem);

  salvarListaNoLocalStorage(lista);

  if (inputValue === "") {
    alert("Você precisa descrever o item");
  } else {
    adicionarItemNaPagina(novoItem);
  }

  document.getElementById("Mensagem").value = "";

  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  let lista = getListaFromLocalStorage();

  for (let i = 0; i < lista.length; i++) {
    adicionarItemNaPagina(lista[i]);
  }

  let itensIniciais = document.querySelectorAll("#itemLista li");
  itensIniciais.forEach((item) => {
    adicionarBotaoFechar(item, item.getAttribute("data-id"));
  });
});

function limparLista() {
  let list = document.getElementById("itemLista");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  salvarListaNoLocalStorage([]);
}

document.body.appendChild(btnLimparLista);

function pesquisarLista() {
  let termoPesquisa = document
    .getElementById("caixaPesquisa")
    .value.toLowerCase();
  let itensLista = document.querySelectorAll("#itemLista li");
  let itemNaoEncontrado = true;

  itensLista.forEach((item) => {
    let textoItem = item.innerText.toLowerCase();
    if (textoItem.includes(termoPesquisa)) {
      item.style.display = "flex";
      itemNaoEncontrado = false;
    } else {
      item.style.display = "none";
    }
  });

  if (itemNaoEncontrado) {
    let mensagemNaoEncontrado = document.createElement("p");
    mensagemNaoEncontrado.textContent = "Item não encontrado!!!";
    document
      .getElementById("itemLista")
      .appendChild(mensagemNaoEncontrado);
  } else {
    let mensagemExistente = document.querySelector("#itemLista p");
    if (mensagemExistente) {
      mensagemExistente.remove();
    }
  }
}

function cancelarPesquisa() {
  let itensLista = document.querySelectorAll("#itemLista li");

  itensLista.forEach((item) => {
    item.style.display = "flex";
  });

  document.getElementById("caixaPesquisa").value = "";
  let mensagemExistente = document.querySelector("#itemLista p");
  if (mensagemExistente) {
    mensagemExistente.remove();
  }
}

document
  .getElementById("botaoPesquisar")
  .addEventListener("click", pesquisarLista);

document
  .getElementById("botaoCancelar")
  .addEventListener("click", cancelarPesquisa);

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("Mensagem").value = "";
}
