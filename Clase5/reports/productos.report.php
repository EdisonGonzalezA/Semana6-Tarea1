<?php

require('fpdf/fpdf.php');
require_once("../models/productos.model.php");
$pdf = new FPDF();
$pdf->AddPage();
$productos = new Producto();


//encabezado
$pdf->SetFont('Arial', 'B', 12);
//             x      y        texto
$pdf->Text(30, 10, 'Title');


$pdf->SetFont('Arial', '', 12);
$texto = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quas officiis nisi, laudantium corrupti eaque libero laborum, veniam, sapiente molestiae quidem sequi fugit voluptatum illum fuga ipsa commodi minima. Aperiam.";
$pdf->MultiCell(0, 5, iconv('UTF-8', 'windows-1252', $texto), 0, 'J');



//uso de POO para reporte
$listaproductos = $productos->todos();
$x = 10;
$y = 35;

$pdf->Cell(10, 10, "#", 1);
$pdf->Cell(40, 10, "Codigo de Barras", 1);
$pdf->Cell(40, 10, "Nombre", 1);
$pdf->Cell(40, 10, "IVA", 1);

$index = 1;
$pdf->Ln();
while ($prod = mysqli_fetch_assoc($listaproductos)) {
    //          Ancho     alto de la celda
    $pdf->Cell(10, 10, $index, 1);
    $pdf->Cell(40, 10, $prod["Codigo_Barras"], 1);
    $pdf->Cell(40, 10, $prod["Nombre_Producto"], 1);
    $pdf->Cell(40, 10, $prod["Graba_IVA"], 1);
    $pdf->Ln();
    $index++;
}
$pdf->Image('../public/images/image.png', 50, 110, 100, 0, "PNG");



//pie de pagina
$pdf->Image('https://www.uniandes.edu.ec/wp-content/uploads/2024/07/2-headerweb-home-2.png', 0, 282, 15, 0, 'PNG');

$pdf->Cell(0, 10, 'Page ' . $pdf->PageNo(), 0, 0, 'C');
$pdf->Output();
