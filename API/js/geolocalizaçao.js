$(document).ready(function() {
  // Vincula uma função ao evento de clique no elemento com o id "btnGeoLocalizao".
  $("#btnGeoLocalizao").click(function() {
    let saida = $("#resultado");

    try {
      // Chama a função getCurrentPosition da API de geolocalização do navegador
      navigator.geolocation.getCurrentPosition(function successoNaRequisicao(posicao) {
        mostrarPosicao(posicao, saida);
      }, function falhaNaRequisicao(err) {
        saida.html(err.message);
      });
    } catch (err) {
      saida.html(err.message);
    }
  });

  function mostrarPosicao(posicao, saida) {
    saida.html(
      "Latitude: " + posicao.coords.latitude +
      "<br>Longitude: " + posicao.coords.longitude
    );
  }
});
