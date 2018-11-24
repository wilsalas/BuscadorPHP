/* Función que inicializa el elemento Slider*/
(inicializarSlider = () => {
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 0,
    to: 100000,
    prefix: "$"
  });
})();

/*Función para renderizar las ciudades y el tipo de vivienda en los selects*/
(RenderCitysAndTypes = async () => {
  let i,
    data = await HttpMethod("get", { select: true }),
    citys = JSON.parse(data.split("|")[0]),
    types = JSON.parse(data.split("|")[1]);
  for (i in citys) {
    $("#selectCiudad").append(`<option value="${citys[i]}" >${citys[i]}</option>`);
  }
  for (i in types) {
    $("#selectTipo").append(`<option value="${types[i]}" >${types[i]}</option>`);
  }
  $('select').formSelect();
})();


/*Evento para mostrar todos los registros */
$("#mostrarTodos").click(async () => RenderHTML(JSON.parse(await HttpMethod("get", { all: true }))));

/*Evento para mostrar registros por filtros */
$("#mostrarFiltros").click(async e => {
  e.preventDefault();
  RenderHTML(JSON.parse(await HttpMethod("post", {
    filter: true,
    city: $("#selectCiudad").val(),
    type: $("#selectTipo").val(),
    range: $("#rangoPrecio").val()
  })));
});

/*Función para pintar las cards en el html */
RenderHTML = data => {
  let dataHtml = [];
  data.forEach(element => {
    dataHtml += `
    <div class="col s12 ">
      <div class="card horizontal">
        <div class="card-image">
          <img src="./public/img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <b>Dirección:</b> ${element.Direccion}
            <br>
            <b>Ciudad:</b> ${element.Ciudad}
            <br>
            <b>Teléfono:</b> ${element.Telefono}
            <br>
            <b>Código postal:</b> ${element.Codigo_Postal}
            <br>
            <b>Tipo:</b> ${element.Tipo}
            <br>
            <b>Precio:</b> ${element.Precio}
          </div>
          <div class="card-action">
            <a href="#">Ver mas</a>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  data.length > 0 ? $("#dataHtml").html(dataHtml) : alert("Data not found");
}

/*Función que retorna peticiones ajax */
function HttpMethod(method, data) {
  return $.ajax({ url: "./server/controller/data.php", method, data });
}