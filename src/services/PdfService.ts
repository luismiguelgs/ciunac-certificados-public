import jsPDF from 'jspdf';
import { Itexto } from '../interfaces/Itexto';

const MARGEN_IZQUIERDO = 15
const ANCHO_PAGINA = 180
// Logo (puedes reemplazar 'logo_url' con la URL de tu imagen)
const LOGO_URL = 'https://scontent.flim26-1.fna.fbcdn.net/v/t39.30808-6/214418954_122810956712648_4912562677468229876_n.png?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=s88tSKqeM40AX-XEFRT&_nc_ht=scontent.flim26-1.fna&oh=00_AfBSBno_k_-AWdSIIkZT9vUT0QzNPl1FgJWsrH4-dFKCLQ&oe=65A20060';
    

export default class PDFService
{
    private static doc = new jsPDF();

    public static exportar(textos:Itexto[], obj:any ) {
        // Agregar imagen como logotipo
        this.doc.addImage(LOGO_URL, 'PNG', MARGEN_IZQUIERDO, 10, 40, 40);
        // Título
        this.doc.setFontSize(18);
        this.doc.text('CARGO PARA LA ENTREGA DE CERTIFICADOS', 55, 50);

        //Mensaje
        this.doc.setFontSize(10);
        this.doc.text('SE HA COMPLETADO EL PROCEDIMIENTO!', MARGEN_IZQUIERDO, 70)
        //doc.setFont('MyFont','normal')
        let objEncontrado = textos.find(objeto=> objeto.titulo === 'texto_1_final')
        let texto1 = objEncontrado ? objEncontrado.texto : '';
        texto1 = this.doc.splitTextToSize(texto1,ANCHO_PAGINA);
        this.doc.text(texto1,MARGEN_IZQUIERDO,80)

        // Párrafo
        this.doc.setFontSize(12);
        this.doc.text(`Tipo de Documento: ${obj.solicitud.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 100);
        this.doc.text(`Fecha de Ingreso: ${obj.creado.toLocaleString()}`, MARGEN_IZQUIERDO, 110);
        this.doc.text(`Apellidos: ${obj.apellidos.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 120);
        this.doc.text(`Nombres: ${obj.nombres.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 130);
        this.doc.text(`DNI: ${obj.dni.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 140)
        this.doc.text(`Idioma: ${obj.idioma.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 150);
        this.doc.text(`Nivel: ${obj.nivel.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 160);
        this.doc.text(`Pago: S/${obj.pago}`, MARGEN_IZQUIERDO, 170);
        this.doc.text(`Número de Voucher: ${obj.voucher}`, MARGEN_IZQUIERDO, 180);
        this.doc.text(`Plazo de entrega: 10 dias hábiles`, MARGEN_IZQUIERDO, 190);

        this.doc.setFontSize(9)
        objEncontrado = textos.find(objeto=> objeto.titulo === 'texto_1_disclamer')
        let texto2 = objEncontrado ? objEncontrado.texto : '';
        texto2 = this.doc.splitTextToSize(texto2,ANCHO_PAGINA);
        this.doc.text(texto2,MARGEN_IZQUIERDO,260)

        objEncontrado = textos.find(objeto=> objeto.titulo === 'texto_2_disclamer')
        let texto3 = objEncontrado ? objEncontrado.texto : '';
        texto3 = this.doc.splitTextToSize(texto3,ANCHO_PAGINA);
        this.doc.text(texto3,MARGEN_IZQUIERDO, 280)

        // Guardar y descargar el PDF
        this.doc.save(`${obj.dni}-${obj.idioma}-${obj.nivel}.pdf`);
    }
}