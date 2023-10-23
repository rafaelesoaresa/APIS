$(document).ready(function() {
    let selecionaRaca;

    // Função para carregar a lista de raças de cachorros
    function carregaRacas(preencherSelecaoComRaca) {
        $.ajax({
            url: 'https://api.thedogapi.com/v1/breeds',
            method: 'GET',
            success: function(racas) {
                preencherSelecaoComRaca(racas);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // Função para popular o dropdown de raças
    function preencheSelecaoDeRaca(racas) {
        let racaSelecionada = $('#racaSelecionada');
        racaSelecionada.empty();

        for (let i = 0; i < racas.length; i++) {
            let raca = racas[i];
            racaSelecionada.append($('<option>', {
                value: raca.id,
                text: raca.name
            }));
        }

        racaSelecionada.change(function() {
            let idSelecionado = racaSelecionada.val();
            selecionaRaca = racas.find(raca => raca.id == idSelecionado);
            atualizaInfoRaca();
        });
        racaSelecionada.change();
    }

    // Função para carregar uma imagem da raça selecionada
    function carregaImagem(racaId) {
        $.ajax({
            url: `https://api.thedogapi.com/v1/images/search?breed_ids=${racaId}`,
            method: 'GET',
            success: function(imagens) {
                let imagensContainer = $('#imagens');
                imagensContainer.empty();

                if (imagens.length > 0) {
                    let imagem = $('<img>', {
                        class: 'cachorro-imagem',
                        src: imagens[0].url
                    });
                    imagensContainer.append(imagem);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // Função para carregar informações da raça
    function carregaInformacoesRaca(racaId) {
        $.ajax({
            url: `https://api.thedogapi.com/v1/breeds/${racaId}`,
            method: 'GET',
            success: function(raca) {
                let infoRacaContainer = $('#infoRaca');
                infoRacaContainer.empty();

                infoRacaContainer.html(
                    `<h3>${raca.name}</h3>
                    <p><strong>Origem:</strong> ${raca.origin}</p>
                    <p><strong>Esperança de Vida:</strong> ${raca.life_span}</p>
                    <p><strong>Temperamento:</strong> ${raca.temperament}</p>`
                );
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // Função para atualizar as informações da raça
    function atualizaInfoRaca() {
        carregaImagem(selecionaRaca.id);
        carregaInformacoesRaca(selecionaRaca.id);
    }

    carregaRacas(function(racas) {
        preencheSelecaoDeRaca(racas);
    });
});



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