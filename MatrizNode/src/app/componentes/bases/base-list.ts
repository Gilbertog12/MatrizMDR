
import { HttpMethodService, ControlsService } from '../../shared';
import { PageEvent, MatTableDataSource } from '@angular/material';
import { UUID } from 'angular2-uuid';

export abstract class BaseList {
 
    public lista: MatTableDataSource<any>;
    public dato: string = '';
    public displayedColumns: string[];
    public urlApi: string = '';
    public defaultPagination: number;
    public length: number;
    public pageSize: number;
    public pageSizeOptions: number[];
    public page: number = 1;
    public parametros: any = {};
    public verNuevo: boolean = true;
    public verEditar: boolean = true;
    public usuario: any;
    public persmisos: any[] = [];
    constructor(public methodService: HttpMethodService,
                public controlService: ControlsService) {
        this.persmisos = JSON.parse(localStorage.getItem('permisos'));
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    }

    public llenarPaginacion(data: any) {
        this.page = data.current_page;
        this.length = data.total;
        this.pageSize = data.per_page;
    }

    public consultar() {
        const spinner = this.controlService.openSpinner();
        const url = `${this.urlApi}?page=${this.page}&dato=${this.dato}`;
        this.methodService.GET<any>(url, this.parametros)
        .subscribe(
        (data) => {
            if (data.status === 'success') {
                this.lista = new MatTableDataSource(data.data.result);
                this.llenarPaginacion(data.data);
                this.controlService.closeSpinner(spinner);
            } else {
                this.controlService.snackbarError(data.message);
            }
        },
        (error) => {
            this.controlService.closeSpinner(spinner);
            this.controlService.snackbarError(error.error.message);
        }
        );
    }

    public siguenteAtras(pageEvent: PageEvent){
        this.page = pageEvent.pageIndex + 1;
        this.consultar();
    }

    public filtrar(event: any) {
        this.page = 1;
        if (event.keyCode === 13) {
            this.consultar();
        }
    }

    descargarExcel(b64Data, nombre = null) {

        const byteCharacters = atob(b64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const uuid = nombre ? nombre : UUID.UUID() + 'xslx';
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, bindata' });
        const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank');
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.target = '_blank';
        a.download = uuid;
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

