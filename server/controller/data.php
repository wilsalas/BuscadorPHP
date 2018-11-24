<?php

/*obtener todos los registros del archivo .json */
$data = json_decode(file_get_contents('../model/data-1.json'));

/* enviar todos los registros al ajax */
if (isset($_GET["all"])) {
    echo json_encode($data);
}

/* enviar registros unicos para los select de ciudad y tipo al ajax */
if (isset($_GET["select"])) {
    $citys = [];
    $type = [];
    foreach ($data as $value) {
        array_push($citys, $value->Ciudad);
        array_push($type, $value->Tipo);
    }
    echo json_encode(array_unique($citys)) . "|" . json_encode(array_unique($type));
}

/* enviar todos los registros por filtros al ajax */
if (isset($_POST["filter"])) {
    $dataFilter = array();
    $range = explode(";", $_POST["range"]);
    foreach ($data as $value) {
        $price = str_replace(",", '', str_replace("$", '', $value->Precio));
        if (($_POST["city"] == $value->Ciudad && $_POST["type"] == $value->Tipo) && ($price > $range[0] && $price < $range[1])) {
            $dataFilter[] = array(
                "Direccion" => $value->Direccion,
                "Ciudad" => $value->Ciudad,
                "Telefono" => $value->Telefono,
                "Codigo_Postal" => $value->Codigo_Postal,
                "Tipo" => $value->Tipo,
                "Precio" => $value->Precio
            );
        }
    }
    echo json_encode($dataFilter);
}