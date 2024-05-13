import jsPDF from 'jspdf';
import logoCiunac from '/logo_ciunac.jpg'
import { Itexto } from '../interfaces/Types';

const MARGEN_IZQUIERDO = 15
const ANCHO_PAGINA = 180

export default class PDFService
{
    private static doc = new jsPDF();

    public static exportar(textos:Itexto[], obj:any, cargo=true ) : Blob
    {
        
        //Encabezado
        this.title(' CARGO PARA LA ENTREGA DE CERTIFICADOS')

        //Mensaje
        this.menssage('texto_1_final', textos)

        // Párrafo
        this.paragraph(obj,cargo)
        this.doc.text(`Plazo de entrega: 10 dias hábiles`, MARGEN_IZQUIERDO, 200);


        this.disclamer(textos, 'texto_1_disclamer', 260)
        this.disclamer(textos, 'texto_2_disclamer', 280)

        // Guardar y descargar el PDF
        //this.doc.save(`${obj.dni}-${obj.idioma}-${obj.nivel}.pdf`);
        return this.doc.output('blob')   
    }
    public static download(blobPDF:Blob, item:any){
        const blobUrl = URL.createObjectURL(blobPDF);

        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${item.dni}-${item.idioma}-${item.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
    private static title(text:string):void {
        // Agregar imagen como logotipo
        this.doc.addImage(logoCiunac, 'PNG', MARGEN_IZQUIERDO, 10, 90, 35);
        // Título
        this.doc.setFontSize(18);
        this.doc.text(text, 35, 60);
    }
    private static menssage(text:string, textos:Itexto[]):void {
        this.doc.setFontSize(10);
        this.doc.text('SE HA COMPLETADO EL PROCEDIMIENTO!', MARGEN_IZQUIERDO, 80)
        let objEncontrado = textos.find(objeto=> objeto.titulo === text)
        let texto1 = objEncontrado ? objEncontrado.texto : '';
        texto1 = this.doc.splitTextToSize(texto1,ANCHO_PAGINA);
        this.doc.text(texto1,MARGEN_IZQUIERDO,90)
    }
    private static paragraph(obj:any, cargo:boolean):void {
        this.doc.setFontSize(12);
        let fecha
        if(cargo) {
            fecha = new Date(obj.creado.seconds * 1000);
        }else{
            fecha = obj.creado
        }
        this.doc.text(`Tipo de Documento: ${obj.solicitud.toLocaleUpperCase()}` , MARGEN_IZQUIERDO, 110);
        this.doc.text(`Fecha de Ingreso: ${fecha}`, MARGEN_IZQUIERDO, 120);
        this.doc.text(`Apellidos: ${obj.apellidos.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 130);
        this.doc.text(`Nombres: ${obj.nombres.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 140);
        this.doc.text(`DNI: ${obj.dni.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 150)
        this.doc.text(`Idioma: ${obj.idioma.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 160);
        this.doc.text(`Nivel: ${obj.nivel.toLocaleUpperCase()}`, MARGEN_IZQUIERDO, 170);
        this.doc.text(`Pago: S/${obj.pago}`, MARGEN_IZQUIERDO, 180);
        this.doc.text(`Número de Voucher: ${obj.voucher}`, MARGEN_IZQUIERDO, 190);
    }
    private static disclamer(textos:Itexto[], text:string, y:number){
        this.doc.setFontSize(9)
        let objEncontrado = textos.find(objeto=> objeto.titulo === text)
        let texto2 = objEncontrado ? objEncontrado.texto : '';
        texto2 = this.doc.splitTextToSize(texto2,ANCHO_PAGINA);
        this.doc.text(texto2,MARGEN_IZQUIERDO,y)
    }
}