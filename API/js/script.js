$(document).ready(function() {
  // Quando a página é carregada, restaura a preferência de tema
  restaurarPreferencia();

  // Manipula o evento de clique no botão de alternância
  $("#switchTema").change(function() {
    if (this.checked) {
      salvarPreferencia("dark");
    } else {
      salvarPreferencia("light");
    }
  });

  function salvarPreferencia(temaSelecionado) {
    localStorage.setItem("tema", temaSelecionado);
    atualizarTema();
  }

  function restaurarPreferencia() {
    let temaSalvo = localStorage.getItem("tema");
    if (temaSalvo) {
      atualizarTema();
    }
  }

  function atualizarTema() {
    let temaSelecionado = localStorage.getItem("tema") || "light"; // Padrão para "light"
    $("body").removeClass("light dark").addClass(temaSelecionado);
    $("#temaAtual").text(temaSelecionado);
  
    // Atualiza o estado do botão de alternância
    if (temaSelecionado === "dark") {
      $("#switchTema").prop("checked", true);
      $("#labelTema").text("Tema Escuro");
    } else {
      $("#switchTema").prop("checked", false);
      $("#labelTema").text("Tema Claro");
    }
  }
});