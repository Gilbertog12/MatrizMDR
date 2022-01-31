import { HttpMethodService, ControlsService } from '../../shared';
import { UUID } from 'angular2-uuid';
import { Input } from '@angular/core';

export abstract class BaseModel {

    @Input() public model: any = {};
    public id: any;
    public nombreAccion: string;
    public urlApi: string;
    public fileCount: number;
    public verListado: boolean = true;
    public persmisos: any[] = [];
    public usuario: any;

    constructor() {
        this.persmisos = JSON.parse(localStorage.getItem('permisosPTEL'));
        this.usuario = JSON.parse(localStorage.getItem('currentUserPTEL'));
    }

    descargarExcel(data) {
        console.log(data);
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, bindata' });
        const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank');
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        // a.download = 'liquidacion.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    descargarPDF(data) {
        const uuid = UUID.UUID();
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank');
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = `${uuid}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element

    }

}
