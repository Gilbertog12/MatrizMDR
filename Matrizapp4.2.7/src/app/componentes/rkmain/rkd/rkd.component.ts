import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { MatDialog } from '@angular/material';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';

import echarts from 'echarts';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';



@Component({
  selector: 'app-rkd',
  templateUrl: './rkd.component.html',
  styleUrls: ['./rkd.component.scss']
})
export class RkdComponent implements OnInit {

  public dimensionModel: any = {

  };


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

  public riesgosList: any[] = [];
  public riesgosListLectura: any[] = [];

  private id : string;
  private pid : string;
  private sid : string;
  private cid : string;
  private tid : string;
  private did : string;
  EnviarHijos: string;
  permisoValidar: boolean;
  loading: boolean;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private Cajas:ServiciocajasService) {

                //this.aperfil()

                this.route.params.subscribe( params => {
                  this.id = params['id'];
                  this.pid = params['pid'];
                  this.sid = params['sid'];
                  this.cid = params['cid'];
                  this.tid = params['tid'];
                  this.did = params['did'];
                  this.dimensionModel = {};
                  this.riesgosList = [];
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
                  

                });

              }

  ngOnInit() {

    // this.cargarRiesgo()
    
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'))
    this.Cajas.RecargarDetalle$.subscribe(resp=>{
      if(resp){
        this.riesgosList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
        this.cargarRiesgo()
      }
    })

  }

  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'DIMENSION_READ'});
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'dimensionId', value: dimensionId });
    _atts.push({ name: 'versionId', value: '000' });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          // console.log(data)
          const result = data.success;
          if (result) {
            console.log(data)
            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                if ( element.atts[0].value === '0' ) {
                  this.dimensionModel = {
                    offset: element.atts[0].value,
                    areaId: element.atts[1].value,
                    areaDescripcion: element.atts[2].value,
                    procesoId: element.atts[3].value,
                    procesoDescripcion: element.atts[4].value,
                    subprocesoId: element.atts[5].value,
                    subprocesoDescripcion: element.atts[6].value,
                    actividadId: element.atts[7].value,
                    actividadDescripcion: element.atts[8].value,
                    tareaId: element.atts[9].value,
                    tareaDescripcion: element.atts[10].value,
                    dimensionId: element.atts[11].value,
                    dimensionDescripcion: element.atts[12].value,
                    dimensionDescripcionExt: element.atts[13].value,
                    dimensionIdClasificacion: element.atts[14].value,
                    dimensionClasificacionDesc: element.atts[15].value,
                    dimensionRiesgoPuroDesc: element.atts[16].value,
                    dimensionRiesgoResidualDesc: element.atts[17].value,
                    dimensionStatus: element.atts[18].value,
                    dimensionVersion: element.atts[19].value,
                    dimensionNivel: element.atts[20].value,
                    dimensionAtributos: element.atts[21].value,
                    dimensionStatusId: element.atts[22].value,
                    key: element.atts[23].value,
                    statusParent:element.atts[24].value,
                    CanAdd:element.atts[25].value.trim()
                  };

                  if(parseInt(this.dimensionModel.dimensionStatusId) == 1 || parseInt(this.dimensionModel.dimensionStatusId) == 2 ||parseInt(this.dimensionModel.dimensionStatusId) == 6 ){
                    var StatusTemp = 1
                  }else{
                    var StatusTemp = parseInt(this.dimensionModel.dimensionStatusId)
                  }
                  console.log(StatusTemp)

                  if(parseInt(this.dimensionModel.statusParent) == 1 || parseInt(this.dimensionModel.statusParent) == 2 ||parseInt(this.dimensionModel.statusParent) == 6 ){
                    var StatusTempP = 1
                  }else{
                    var StatusTempP = parseInt(this.dimensionModel.statusParent)
                  }

                  if(StatusTemp<StatusTempP){
                    this.permisoValidar = true
                  }else{
                    this.permisoValidar= false
                  }
                  console.log(this.permisoValidar)

                  localStorage.setItem('keySelected', this.dimensionModel.key);
                  localStorage.setItem('versionSelected', this.dimensionModel.dimensionVersion);
                  localStorage.setItem('statusSelected', this.dimensionModel.dimensionStatusId);
                } else {

                  if( element.atts[9].value === '008' && this.btn === 'lectura'){
                    this.riesgosListLectura.push({
                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      riesgoRiesgoPuroN: element.atts[3].value,
                      riesgoRiesgoPuroM: element.atts[4].value,
                      riesgoRiesgoPuroS: element.atts[5].value,
                      riesgoRiesgoResidualN: element.atts[6].value,
                      riesgoRiesgoResidualM: element.atts[7].value,
                      riesgoRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value
                    });

                  }else{

                    this.riesgosList.push({
                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      riesgoRiesgoPuroN: element.atts[3].value,
                      riesgoRiesgoPuroM: element.atts[4].value,
                      riesgoRiesgoPuroS: element.atts[5].value,
                      riesgoRiesgoResidualN: element.atts[6].value,
                      riesgoRiesgoResidualM: element.atts[7].value,
                      riesgoRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value,
                      pendingDelete: element.atts[11].value
                    });
                  }
                }
              }
            });

            this.cargarRiesgo()
          } else {
            this.controlService.closeSpinner(spinner);
            this.autentication.showMessage(data.success, data.message, this.dimensionModel, data.redirect);
          }
        
          return result;
        },
        (error) => {
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.dimensionModel, false);
        });
      });
      
    }
    cargarRiesgo(){

    this.loading = true
    this.riesgosList=[]
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
    _atts.push({ name: 'key', value:  this.id+this.pid+this.sid+this.cid+this.tid+this.did });

    
    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);




    obj.subscribe((data)=>{

      if (data.success === true) {

        console.log(data)



        data.data.forEach((element) =>{

          this.riesgosList.push({
            offset: element.atts[0].value,
            Id: element.atts[1].value.trim(),
            Descripcion: element.atts[2].value,
            riesgoRiesgoPuroN: element.atts[3].value,
            riesgoRiesgoPuroM: element.atts[4].value,
            riesgoRiesgoPuroS: element.atts[5].value,
            riesgoRiesgoResidualN: element.atts[6].value,
            riesgoRiesgoResidualM: element.atts[7].value,
            riesgoRiesgoResidualS: element.atts[8].value,
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


  consola(accion : string){

    this.key = this.dimensionModel.key
    this.version = localStorage.getItem('versionSelected')


    switch(accion){

    case 'aprobar':
      this.sendvalidate()
      return;

      case 'validaraprobar':
      this.ValidarAprobar()
      return;

    case 'rechazar':
        this.Rechazar()
        return;

    case 'archivar':
          this.Archivar()
          return;

    case 'restaurar':
          this.RestaurarItem()
          return;

    }





  }

  async ValidarAprobar(){

    let title=''
      let resp= ''

      switch (this.dimensionModel.dimensionStatus) {

        case 'ENVIADO A VALIDACION':
          title= 'Validar'
          resp = 'Validado'

          break;
        case 'PENDIENTE DE APROBACION':
          title= 'Aprobar'
          resp = 'Aprobado'
          break;

          case 'PENDIENTE INACTIVACION':
           title= 'Validar'
          resp = 'Validado'

            break;

          case 'ENVIADO A APROBACION':
            title= 'Aprobar'
            resp = 'Aprobado'
          break;



        default:
          break;
      }

      const inputOptions = {

        'Y': 'Solo Padre',
        'N': 'Padre e Hijos',


  }

  const { value: color } = await Swal2.fire({
    title: title,
    text: '¿ Está seguro que desea'+' '+ title +' ' + 'este registro ?',

    showCancelButton: true,

    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor:'#3085d6',
    cancelButtonColor: '#d33',
  //   input: 'radio',
  //   inputOptions: inputOptions,
  //   inputValidator: (value) => {
  //   if (!value) {
  //   return 'Debe Seleccionar una Opcion'
  //   }
  // }



  })
  if(color ){
    // console.log(color)

    // if(color == 1){
    //   this.EnviarHijos = 'Y'
    // }else{
    //   this.EnviarHijos = 'N'
    // }
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'VALIDATE' });
    _atts.push({ name: 'onlyActualNode', value: 'Y' });
    _atts.push({ name: 'isValidatingFromTree', value: 'Y' });
    _atts.push({ name: 'approveInd', value: 'A' });
    _atts.push({ name: 'comments', value: '' });
    _atts.push({ name: 'key', value: this.key });

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
              (data) => {
                if (data.success === true) {
                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                  Swal2.fire('Registro'+' '+resp,'', 'success' )
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
                //  console.log('estoy aqui')
                  localStorage.setItem('isSendToValidate', '1');


                } else {
                  // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                  Swal2.fire('',data.message,'error')
                }

                this.controlService.closeSpinner(spinner);

              },
              (error) => {
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
                this.controlService.closeSpinner(spinner);
              });

  }




    }

    Rechazar(){

      let title=''
      let resp=''
      switch (this.dimensionModel.dimensionStatus) {

        case 'ENVIADO A VALIDACION':
          title= 'Validacion'
          resp = 'Validado'

          break;
        case 'PENDIENTE DE APROBACION':
          title= 'AprobacionS'
          resp = 'Aprobado'



        default:
          break;
      }
      console.log(this.dimensionModel.dimensionVersion)

      this.key = this.dimensionModel.Key
      this.version = this.dimensionModel.dimensionVersion + ','

      localStorage.setItem('Llave', this.key);

      localStorage.setItem('VersionL', this.version);
      localStorage.setItem('isValidatingFromTree', 'Y');
      Swal2.fire({

        title:'Rechazar '+title,
        text:'Se procederá a RECHAZAR el(los) Registro(s) seleccionado(s)',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#3085d6',
        cancelButtonColor: '#d33'

      }).then((result)=>{
          if(result.value){

            const conf1 = this.confirm.open(RkReasonRejectComponent,{
              hasBackdrop: true,
              height: 'auto',
              width: 'auto',
              data: {
                title: 'Razon de Rechazo',
                button_confirm: 'Aceptar',
                button_close: 'Cancelar'
              }
            });


          }
      })

  //     const conf = this.confirm.open(ConfirmationComponent, {
  //       hasBackdrop: true,
  //       height: 'auto',
  //       width: 'auto',
  //       data: {
  //         title: 'Rechazar Aprobacion',
  //         message: `Se procederá a RECHAZAR el (los) item (s) seleccionados
  // `,
  //         button_confirm: 'Aceptar',
  //         button_close: 'Cancelar'
  //       }
  //     });

  //     conf.afterClosed()
  //       .subscribe(async (result) => {
    //       if (result) {

    //         const conf1 = this.confirm.open(RkReasonRejectComponent,{
    //           hasBackdrop: true,
    //           height: 'auto',
    //           width: 'auto',
    //           data: {
    //             title: 'Razon de Rechazo',
    //             button_confirm: 'Aceptar',
    //             button_close: 'Cancelar'
    //           }
    //         });

    //         conf1.afterClosed().subscribe
    //         (async ( result1) =>{
    //           console.log( result1)

    //          if(result1){

    //             this.Razon = localStorage.getItem('RazonRechazo')
    //                let _atts = [];
    //         _atts.push({ name: 'scriptName', value: 'coemdr'});
    //         _atts.push({ name: 'action', value: 'VALIDATE'});
    //         _atts.push({ name: 'key', value: this.valor });
    //         _atts.push({ name: 'version', value: this.version});
    //         _atts.push({ name: 'approveInd', value: 'U' });
    //         _atts.push({ name: 'comments', value: this.Razon });

    //         const spinner = this.controlService.openSpinner();
    //         const obj = await this.autentication.generic(_atts);

    //         obj.subscribe(
    //           (data) => {
    //             if (data.success === true) {
    //               if (data.data[0].atts[1]) {
    //                 this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
    //                 localStorage.removeItem('RazonRechazo')

    //               }

    //             } else {
    //               this.autentication.showMessage(data.success, data.message, {}, data.redirect);
    //             }
    //             this.controlService.closeSpinner(spinner);

    //           },
    //           (error) => {
    //             // if ( error.status === 401 ) { this.autentication.logout(); return; }
    //             this.controlService.closeSpinner(spinner);
    //           });

    //           }
    //         } )


    //       //   console.log('Aqui Estoy..!')
    //       }
          // this.cerrar();


    //     });
    }


      async sendvalidate() {

        let title=''
        let resp= ''

        switch (this.dimensionModel.dimensionStatus) {
          case 'CREADO':
            title= 'Enviar a Validar'
            resp = 'Enviado a Validar'

            break;

          case 'MODIFICADO':
            title= 'Enviar a Validar'
            resp = 'Enviado a Validar'

            break;



          default:
            break;
        }

        const inputOptions = {

          'Y': 'Solo Padre',
          'N': 'Padre e Hijos',


    }

    const { value: color } = await Swal2.fire({
      title: title,
      text: '¿ Está seguro que desea'+' '+ title +' ' + 'este registro ?',

      showCancelButton: true,

      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
    //   input: 'radio',
    //   inputOptions: inputOptions,
    //   inputValidator: (value) => {
    //   if (!value) {
    //   return 'Debe Seleccionar una Opcion'
    //   }
    // }



    })
    if(color )
    {

      const _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
              _atts.push({ name: 'onlyActualNode', value: 'Y' });
              _atts.push({ name: 'isValidatingFromTree', value: 'Y' });

              _atts.push({ name: 'key', value: this.key });

              const spinner = this.controlService.openSpinner();
              const obj = this.autentication.generic(_atts);

              obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            Swal2.fire('Registro'+' '+ resp,'', 'success' )
                            this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
                            localStorage.setItem('isSendToValidate', '1');


                          } else {
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('',data.message,'error')
                          }

                          this.controlService.closeSpinner(spinner);

                        },
                        (error) => {
                          // if ( error.status === 401 ) { this.autentication.logout(); return; }
                          this.controlService.closeSpinner(spinner);
                        });
    }


      }


      async Archivar() {


        const { value: accept } = await Swal2.fire({

          title:'Enviar a Archivar',
          text: 'Tenga en cuenta que una vez archivado no podrá visualizar ni utilizar más éste Registro',
          icon:'question',
          input:'checkbox',
          inputValue:'',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          inputPlaceholder:'Acepto',
          confirmButtonText:'Archivar',
          inputValidator: (result) => {
          return !result && 'Debe Aceptar los Terminos'
      }
        })

        if (accept) {

          console.log(this.dimensionModel.key)
          this.key =this.key+ ','
          console.log(this.key)

          let _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: 'ENVIAR_ARCHIVAR' });
              _atts.push({ name: 'key', value: this.key });


              const spinner = this.controlService.openSpinner();
              const obj = await this.autentication.generic(_atts);

                obj.subscribe((data)=>{

                  if (data.success === true) {
                                if (data.data[0].atts[1]) {
                                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                                  Swal2.fire(
                                    {
                                      icon:'success',
                                      text:'Registro Archivado ',
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  )
                                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
                                  localStorage.setItem('isSendToValidate', '1');
                                }

                              }else {

                                  Swal2.fire(
                                    {
                                      icon:'error',
                                      text:data.message,
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  )

                              // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                              }
                              this.controlService.closeSpinner(spinner);



                },(error)=>{
                  this.controlService.closeSpinner(spinner);
                })
              //  this.cerrar();
        //       obj.subscribe(
        //         (data) => {
        //           if (data.success === true) {
        //             if (data.data[0].atts[1]) {
        //               this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
        //             }

        //           } else {
        //             this.autentication.showMessage(data.success, data.message, {}, data.redirect);
        //           }
        //           this.controlService.closeSpinner(spinner);

        //         },
        //         (error) => {
        //           // if ( error.status === 401 ) { this.autentication.logout(); return; }
        //           this.controlService.closeSpinner(spinner);
        //         });
        //     }
        //     this.cerrar();
        //   });




        }

    }

    async RestaurarItem() {

      const { value: accept } = await Swal2.fire({

        title:'Restaurar Registro',
        text: '¿Desea Restaurar este Item ?',
        icon:'question',
        input:'checkbox',
        inputValue:'',
        inputPlaceholder:'Acepto',
        showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
        confirmButtonText:'Restaurar',
        inputValidator: (result) => {
        return !result && 'Debe Aceptar los Terminos'
    }
      })

      if (accept) {

        console.log(this.dimensionModel.key)
          this.key =this.key+ ','
          console.log(this.key)


        let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
            _atts.push({ name: 'key', value: this.key });


            const spinner = this.controlService.openSpinner();
            const obj = await this.autentication.generic(_atts);

              obj.subscribe((data)=>{

                if (data.success === true) {
                              if (data.data[0].atts[1]) {
                                // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                                Swal2.fire(
                                  {
                                    icon:'success',
                                    text:'Registro Restaurado ',
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                )
                                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did);
                                localStorage.setItem('isSendToValidate', '1');
                              }

                            }else {

                                Swal2.fire(
                                  {
                                    icon:'error',
                                    text:data.message,
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                )

                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                            }
                            this.controlService.closeSpinner(spinner);



              },(error)=>{
                this.controlService.closeSpinner(spinner);
              })
            //  this.cerrar();


      }


    }

    aperfil() {
      let _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'SESSION' });

      const promiseView = new Promise((resolve, reject) => {
        this.autentication.generic(_atts)
          .subscribe(
            (data) => {
              console.log("RES:" + JSON.stringify(data));
              const result = data.success;
              if (result) {

                data.data.forEach((element) => {
                  if (element.atts.length > 0) {
                    this.Perfil.push({
                      adm: element.atts[1].value,
                      apr: element.atts[2].value,
                      con: element.atts[3].value,
                      cre: element.atts[4].value,
                      val: element.atts[5].value,
                    });
                  }


                });

                this.Perfil.forEach((element, index, array) => {

                  this.consulta = element.con;
                  this.admin = element.adm;
                  this.aprobador = element.apr;
                  this.creador = element.cre;
                  this.validador = element.val;

                  if(this.admin === 'Y'){
                    this.aprobador = 'Y';
                    this.creador = 'Y';
                    this.validador = 'Y';
                    this.consulta = 'Y';


                  }

                  this.cargo = this.admin + this.aprobador + this.consulta + this.creador + this.validador;
                  // if (this.cargo === 'NNYNN') {
                  //   this.propiedad = 'none';
                  // }
                  this.mostrar();

                });

              } else {
                this.controlService.snackbarError(data.message);
              }
              return result;
            },
            (error) => {
              this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
            });
      });


    }

    async mostrar()  {

      switch (this.cargo) {
        case 'NNYNN': //SOLO LECTURA

          this.btn = 'lectura';
          return;

        case 'NNYYN'://LECTURA Y CREACION
          this.btn = 'creacion';
          return;
        case 'NNYNY'://LECTURA Y VALIDACION
          this.btn = 'Validacion';
          return;
        case 'NYYNN'://LECTURA Y APROBACION
          this.btn = 'aprobacion';
          return;
        case 'NNYYY'://LECTURA , CREACION , VALIDACION
          this.btn = 'creacionvalidacion';

          return;

          case 'YYYYY'://Administrador
          this.btn = 'administrador';

          return;

          case 'NYYYY'://Administrador
          this.btn = 'administrador';

          return;

          case 'NYYNY':
          this.btn = 'validacionaprobacion';

          return;

          case 'NYYYN':
            this.btn='creacionaprobacion'
            return

        default:
          break;
      }


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