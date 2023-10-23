$(document).ready(function() {
    let selecionaRaca;

    // Função para carregar a lista de raças de gatos
    function carregaRacas(preencherSelecaoComRaca) {
        // Faz uma solicitação HTTP assíncrona usando jQuery AJAX
        $.ajax({
            url: 'https://api.thecatapi.com/v1/breeds/',
            method: 'GET',
            // Define a URL para a qual a solicitação será enviada. Neste caso, estamos buscando informações das raças de gatos em uma API.
            success: function(resposta) {
                preencherSelecaoComRaca(resposta);
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
            // Adiciona uma nova opção ao elemento de seleção 'racaSelecionada'
            racaSelecionada.append($('<option>', {
                value: raca.id,
                // Define o valor da opção como o ID da raça
                text: raca.name
                // Define o texto visível da opção como o nome da raça
            }));
        }

        // Define um evento de mudança no elemento selecionado 'racaSelecionada'
        racaSelecionada.change(function() {
            // Obtém o valor selecionado no elemento de seleção
            let idSelecionado = racaSelecionada.val();

            // Procura a raça com base no ID selecionado e armazena em 'selecionaRaca'
            selecionaRaca = racas.find(function(raca) {
                if (raca.id === idSelecionado) {
                    return raca;
                }
            });
            atualizaInfoRaca();
        });
        racaSelecionada.change();
    }

    // Função para carregar uma imagem da raça selecionada
    function carregaImagem(racaId) {
        // Realiza uma solicitação assíncrona para obter uma imagem de gato usando a API do The Cat API
        $.ajax({
            url: 'https://api.thecatapi.com/v1/images/search',
            data: {
                raca_ids: racaId, // ID da raça selecionada
                limit: 1 // Limita a uma única imagem
            },
            method: 'GET',
            // Função de retorno em caso de sucesso
            success: function(resposta) {
                let imagens = $('#imagens');
                imagens.empty();

                if (resposta.length > 0) {
                    let imagem = $('<img>', {
                        class: 'gato-imagem', // Adicione uma classe à imagem
                        src: resposta[0].url
                    });
                    imagens.append(imagem);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // Função para atualizar as informações da raça
    function atualizaInfoRaca() {
        if (selecionaRaca) {
            carregaImagem(selecionaRaca.id);
            $('#imagens').empty();
            $('#infoRaca').html(
                `<h3>${selecionaRaca.name}</h3>
                <p><strong>Origem:</strong> ${selecionaRaca.origin}</p>
                <p><strong>Esperança de Vida:</strong> ${selecionaRaca.life_span}</p>
                <p><strong>Temperamento:</strong> ${selecionaRaca.temperament}</p>`
            );
        } else {
            $('#imagens').empty().append('<p>Selecione uma raça para ver uma imagem e informações do gato.</p>');
            $('#infoRaca').empty();
        }
    }

    carregaRacas(function(racas) {
        preencheSelecaoDeRaca(racas);
    });
});


//temas 
///
///
///

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
  ///
  ///
  ///
