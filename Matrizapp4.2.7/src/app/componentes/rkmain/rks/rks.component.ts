import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkpendComponent } from '../rkpend/rkpend.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { MatDialog } from '@angular/material';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';


@Component({
  selector: 'app-rks',
  templateUrl: './rks.component.html',
  styleUrls: ['./rks.component.scss']
})
export class RksComponent implements OnInit {

  public subprocesoModel: any = {

  };

  public actividadesList: any[] = [];
  actividadesListLectura: any[] = [];

  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;

  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion ='creacionaprobacion'

public key:string
public version : string
public Razon : string

  private id : string;
  private pid : string;
  private sid : string;
  EnviarHijos: string;
  permisoValidar: boolean;
  loading: boolean;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private Cajas:ServiciocajasService
    ) {

                // this.aperfil()
                this.route.params.subscribe( params => {
                  this.id = params['id'];
                  this.pid = params['pid'];
                  this.sid = params['sid'];
                  this.subprocesoModel = {};
                  this.actividadesList = [];
                  this.ver(this.id, this.pid, this.sid);
                  

                });

              }

  ngOnInit() {

    // this.cargarRiesgo()

    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'))

    this.Cajas.RecargarDetalle$.subscribe(resp=>{
      if(resp){
        this.subprocesoModel = {};
        this.actividadesList = [];
        this.ver(this.id, this.pid, this.sid);
        

      }
    })
  }

  ver(areaId: string, procesoId: string, subprocesoId: string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'SUBPROCESO_READ'});
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          console.log(data)
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                if ( element.atts[0].value === '0' ) {
                  this.subprocesoModel = {
                    offset: element.atts[0].value,
                    areaId: element.atts[1].value,
                    areaDescripcion: element.atts[2].value,
                    procesoId: element.atts[3].value,
                    procesoDescripcion: element.atts[4].value,
                    subprocesoId: element.atts[5].value,
                    subprocesoDescripcion: element.atts[6].value,
                    subprocesoDescripcionExt: element.atts[7].value,
                    subprocesoIdClasificacion: element.atts[8].value,
                    subprocesoDescClasificacion: element.atts[9].value,
                    subprocesoRiesgoPuroDesc: element.atts[10].value,
                    subprocesoRiesgoResidualDesc: element.atts[11].value,
                    subprocesoStatus: element.atts[12].value,
                    subprocesoVersion: element.atts[13].value,
                    subprocesoNivel: element.atts[14].value,
                    subprocesoAtributos: element.atts[15].value,
                    subprocesoStatusId: data.data[0].atts[16].value,
                    key: data.data[0].atts[17].value,
                    statusParent: data.data[0].atts[18].value,
                    CanAdd: data.data[0].atts[19].value,
                  };

                  if(parseInt(this.subprocesoModel.subprocesoStatusId) == 1 || parseInt(this.subprocesoModel.subprocesoStatusId) == 2 ||parseInt(this.subprocesoModel.subprocesoStatusId) == 6 ){
                    var StatusTemp = 1
                  }else{
                    var StatusTemp = parseInt(this.subprocesoModel.subprocesoStatusId)
                  }
                  console.log(StatusTemp)

                  if(parseInt(this.subprocesoModel.statusParent) == 1 || parseInt(this.subprocesoModel.statusParent) == 2 ||parseInt(this.subprocesoModel.statusParent) == 6 ){
                    var StatusTempP = 1
                  }else{
                    var StatusTempP = parseInt(this.subprocesoModel.statusParent)
                  }

                  if(StatusTemp<StatusTempP){
                    this.permisoValidar = true
                  }else{
                    this.permisoValidar= false
                  }
                  console.log(this.permisoValidar)

                  localStorage.setItem('keySelected', this.subprocesoModel.key);
                  localStorage.setItem('versionSelected', this.subprocesoModel.subprocesoVersion);
                  localStorage.setItem('statusSelected', this.subprocesoModel.subprocesoStatusId);

                } else {

                    if(element.atts[9].value === '008' && this.btn=== 'lectura'){
                      this.actividadesListLectura.push({
                    offset: element.atts[0].value,
                    Id: element.atts[1].value.trim(),
                    Descripcion: element.atts[2].value,
                    actividadRiesgoPuroN: element.atts[3].value,
                    actividadRiesgoPuroM: element.atts[4].value,
                    actividadRiesgoPuroS: element.atts[5].value,
                    actividadRiesgoResidualN: element.atts[6].value,
                    actividadRiesgoResidualM: element.atts[7].value,
                    actividadRiesgoResidualS: element.atts[8].value,
                    estado: element.atts[9].value,
                  });
                }else{
                  this.actividadesList.push({
                    offset: element.atts[0].value,
                    Id: element.atts[1].value.trim(),
                    Descripcion: element.atts[2].value,
                    actividadRiesgoPuroN: element.atts[3].value,
                    actividadRiesgoPuroM: element.atts[4].value,
                    actividadRiesgoPuroS: element.atts[5].value,
                    actividadRiesgoResidualN: element.atts[6].value,
                    actividadRiesgoResidualM: element.atts[7].value,
                    actividadRiesgoResidualS: element.atts[8].value,
                    estado: element.atts[9].value,
                    pendingDelete: element.atts[11].value
                  });
                    }

                }
              }
            });

            this.cargarRiesgo();
          } else {
            if(data.bypass === '1'){


              this.controlService.closeSpinner(spinner);

            }else{
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(data.success, data.message, this.subprocesoModel, data.redirect);

            }
          }
          
          return result;
        },
        (error) => {
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.subprocesoModel, false);
        });
      });
      
  }

  cargarRiesgo(){

    this.loading = true
    this.actividadesList=[]
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
    _atts.push({ name: 'key', value:  this.id+this.pid+this.sid });


    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);


    obj.subscribe((data)=>{

      if (data.success === true) {

        console.log(data)



        data.data.forEach((element) =>{

          this.actividadesList.push({
            offset: element.atts[0].value,
            Id: element.atts[1].value.trim(),
            Descripcion: element.atts[2].value,
            actividadRiesgoPuroN: element.atts[3].value,
            actividadRiesgoPuroM: element.atts[4].value,
            actividadRiesgoPuroS: element.atts[5].value,
            actividadRiesgoResidualN: element.atts[6].value,
            actividadRiesgoResidualM: element.atts[7].value,
            actividadRiesgoResidualS: element.atts[8].value,
            estado: element.atts[9].value,
            pendingDelete: element.atts[11].value
          });

        })

        this.loading = false
        this.controlService.closeSpinner(spinner);
        
      }else{
        
        this.loading = false
        this.controlService.closeSpinner(spinner);
      }
    })

    // this.loading = false

  }


    async Caja(key,status){


      switch(status){

        case  '000' :
            this.VerCajasdashboard(key)

        break;
       case  '001' :

        this.VerCajasdashboard(key)


        break;
       case  '002' :

        this.VerCajasdashboard(key)

        break;
       case  '003' :

        this.VerCajasdashboard(key)
       case  '006' :

        this.VerCajasdashboard(key)

        break;

        case '004':

              this.VerRkvalidarC(key)
          break;

        case '007':
          this.VerRkporaprobar(key)

          break;


      }


    }

   async VerCajasdashboard(key){

      const conf = this.confirm.open(CajasdashboardComponent,
        {
          hasBackdrop: true,
          id: 'drag',
          height: 'auto',
          width: 'auto',
          data:
          {
            title: 'Items en fase de creacion, modificacion o eliminacion',
            message: '',
            button_confirm: 'Cerrar',
            button_close: 'Cerrar',
            id: key,
            status: '001'

          },
          // panelClass : 'tabla'


        });

    }

   async VerRkvalidarC(key){
      const conf5 = this.confirm.open(RkvalidarComponent, {
        hasBackdrop: true,
        height: 'auto',
        width: 'auto',
        data:
        {
          title: 'Items pendientes de validación',
          message: '',
          button_confirm: 'Cerrar',
          button_close: 'Cerrar',
          id: key,
          status: status

        }

      });

    }

   async VerRkporaprobar(key){
      const conf6 = this.confirm.open(RkporaprobarComponent, {
        hasBackdrop: true,
        height: 'auto',
        width: 'auto',

        data:
        {
          title: 'Items Pendientes por Aprobar',
          message: '',
          button_confirm: 'Cerrar',
          button_close: 'Cerrar',
          id: key,
          status: status

        }

      });

    }
}