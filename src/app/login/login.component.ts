import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../shared';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import Swal2 from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { ServiciocajasService } from '../shared/services/serviciocajas.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  Ambiente:string;
  ambiente: string;
  pass:boolean;
  recuerdame:boolean;
  user:string
  distrito:string
  posicion: string
  recordar: boolean = true;
  posDefault: any ='';
  disDefault: any;
  min:number;
  sec:number;
  
  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private route: ActivatedRoute,
              private router: Router,
              private FormBuilder:FormBuilder,
              private posiciones: ServiciocajasService,
              ) {
    this.Version();
    this.min = 4;
    this.sec = 59;
    // this.prueba();
              }


    LoginForm = this.FormBuilder.group({
      username : [''],
      password : [''],
        })

  public model: any = {};
  returnUrl: string;
  
  
  

  ngOnInit() {
     //get return url from route parameters or default to '/'
     this.returnUrl = isNullOrUndefined(this.route.snapshot.queryParams['returnUrl']) || this.route.snapshot.queryParams['returnUrl'] === '/' || this.route.snapshot.queryParams['returnUrl'] === '' ? '/rkmain' : this.route.snapshot.queryParams['returnUrl'];
    
    if(localStorage.getItem('recordar') === 'true'){

        this.model.username = localStorage.getItem('Usuario')
        this.recordar = true
        this.model.recordar = this.recordar
        console.log('epa la arepa')
    }else{
      this.recordar = false
      this.model.recordar = this.recordar 
    }
    
    console.log(this.recordar)
    
    
     
  }

  positions: any = [] ;
  districts: any = []  ;
  array1 = [];
  array2 = [];

  cambio(){
    console.log(this.recordar)
  }
  // prueba(){

  //   this.methodService.Ambiente(this.Ambiente,this.pass)
  //   console.info(this.Ambiente +' '+ this.pass)
    
  // }

  login() {
    localStorage.setItem('isLoggedinApp', 'false');
    const spinner = this.controlService.openSpinner();

    
    this.model.position = this.posDefault
     

    this.model.password = this.model.password === 'undefined' ? '' : this.model.password;

    
    
    this.autentication.login_token(this.model.username, this.model.password, this.model.district, this.model.position)
     .subscribe(
       (data) => {

        console.log(data)
        const result = data.access_token;
        localStorage.setItem('tokenApp',JSON.stringify(data))
        if (result) {
             //store user details and jwt token in local storage to keep user logged in between page refreshes
             /*localStorage.setItem('isLoggedinApp', 'true');
             localStorage.setItem('un', this.model.username);
             localStorage.setItem('pd', this.model.password);
             localStorage.setItem('ds', this.model.district.toUpperCase());
             localStorage.setItem('ps', this.model.position.toUpperCase());
             localStorage.setItem('showDashboard', 'true');*/

             
            //  console.log(result);
             localStorage.setItem('isLoggedinApp', 'true');
             localStorage.setItem('tk', result);
             this.router.navigate([this.returnUrl]);
             this.controlService.closeSpinner(spinner);
             localStorage.setItem('show Dashboard', 'true');
             if(this.recordar){

               localStorage.setItem('recordar','true')
              }else{
               localStorage.setItem('recordar','false')
               
             }

             

             localStorage.setItem('Usuario',this.model.username );
             localStorage.setItem('Distrito', this.model.district);
             localStorage.setItem('Posicion', this.model.position);

        } else {
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, data.error_description, this.model, false);
        }
        return result;
     },
     (error) => {
       this.controlService.closeSpinner(spinner);
       this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet ');
     });

  }
  
  

  defaultvalues() {

    const spinner = this.controlService.openSpinner();

  
      this.pass = false;
      this.model.password = this.model.password === 'undefined' ? '' : this.model.password;

      this.autentication.districts(this.model.username, this.model.password)
     .subscribe(
       
       (data) => {
        
        this.array1 = [];
        this.array2 = [];  
        if (data['success'] === true){
          console.log(data)
          
          for(var key in data['data'][0]['atts']){
            
            // if(data['data'][0]['atts'].hasOwnProperty(key)){
            //   // console.log(JSON.stringify(data['data'][0]['atts'][key]));
            // }
            
            this.array1.push(data['data'][0]['atts'][key]);
            
            this.districts = this.array1;
                    
          }
            this.districts.forEach(element => {
              this.disDefault = element.name
            });

            console.log(this.disDefault)
            this.model.district = this.disDefault

          this.controlService.closeSpinner(spinner);
          return data;
        } else {
          this.districts = [];
          this.controlService.closeSpinner(spinner);
        }
        
     },
     (error) => {
       this.controlService.closeSpinner(spinner);
       this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
       alert(error.error);
     });


     this.autentication.positions(this.model.username, this.model.password)
     .subscribe(
       (data) => {
        
         console.log(data)
        if (data['success'] === true){
          
          for(var key in data['data'][0]['atts']){
            if(data['data'][0]['atts'].hasOwnProperty(key)){
              // console.log(JSON.stringify(data['data'][0]['atts'][key]));
            }
            
            this.array2.push(data['data'][0]['atts'][key]);
            this.positions = this.array2; 
            this.posiciones.Posiciones = this.positions
            
            
            
          }
          // console.log(this.positions[0])
          // if(this.positions.length == 1){
            // this.model.position= this.positions
            // }
            
            this.controlService.closeSpinner(spinner);

            

            this.positions.forEach((element,index) => {
              
              if(index == 0){
               this.posDefault = element.name
              }
            
              
            });
            // console.log( this.posDefault)

            // this.model.position =this.posDefault;

            // console.log(data)
            return data;
          } else {
            Swal2.fire({
              text:'Usuario o Contraseña Incorrectos',
              icon:'warning'
            })
            this.model.username=''
          this.model.password=''
          this.model.position=''
          this.model.district=''
          sessionStorage.clear();
          this.controlService.closeSpinner(spinner);
          
     
          
        }
      },
      (error) => {
        this.controlService.closeSpinner(spinner);
        this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
        alert(error.error);
      });
      // this.login()
      
      // debugger;
      
      // this.model.district =this.districts[0].value
      // console.log(this.model.position)
      // console.log(this.model.district)

      
      
      
      
      
      
    }
    

    

    copyright() {
    // this.methodService.getJSON().subscribe(
    //   (data) => {
        
    //     this.methodService.getAPI().subscribe(
    //       (data2) => {

    //         // console.log(data['text'])

    //       let cadena1 = data['text']
    //       let cadena2 = cadena1.slice(65,80)
    //       let nuevaversion = ' version 4.1.2 '
    //       let nuevaleyenda = cadena1.replace(cadena2,nuevaversion)

    //       // console.log(nuevaleyenda)
          
            
    //         this.autentication.showInfo(true, nuevaleyenda + data2[0], {}, false);
    //     });
    // });

    Swal2.fire({
      icon:'info',
      html:"Matriz de riesgos, Copyright 2021. <br /> <b>Summa consulting.</b><br /> Version Aplicativo WEB 4.1.6 <br />Fecha de compilación: 2021-04-18 <br />",
      showCloseButton: true
      
    })
  }

  Version() {
    var _0x4e79=["\x6C\x6F\x67","\x41\x6D\x62\x69\x65\x6E\x74\x65","\x4D\x61\x74\x72\x69\x7A\x20\x64\x65\x20\x52\x69\x65\x73\x67\x6F\x73\x20\x45\x39","\x20\x2D\x20","\x44\x45\x53\x41\x52\x52\x4F\x4C\x4C\x4F","\x61\x6D\x62\x69\x65\x6E\x74\x65","\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x44\x65\x76","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F","\x54\x45\x53\x54","\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x54\x53\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x73\x74\x2D\x6E\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F","\x50\x52\x4F\x44\x55\x43\x54\x49\x56\x4F","\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x50\x52\x44","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x32\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F","\x73\x75\x62\x73\x63\x72\x69\x62\x65","\x67\x65\x74\x41\x50\x49","\x6D\x65\x74\x68\x6F\x64\x53\x65\x72\x76\x69\x63\x65","\x67\x65\x74\x4A\x53\x4F\x4E"];this[_0x4e79[16]][_0x4e79[17]]()[_0x4e79[14]]((_0x27c1x1)=>{console[_0x4e79[0]](_0x27c1x1);this[_0x4e79[16]][_0x4e79[15]]()[_0x4e79[14]]((_0x27c1x2)=>{switch(_0x27c1x2[0]){case _0x4e79[7]:this[_0x4e79[1]]= _0x4e79[2]+ _0x4e79[3]+ _0x4e79[4];this[_0x4e79[5]]= _0x4e79[6];return;case _0x4e79[10]:this[_0x4e79[1]]= _0x4e79[2]+ _0x4e79[3]+ _0x4e79[8];this[_0x4e79[5]]= _0x4e79[9];return;case _0x4e79[13]:this[_0x4e79[1]]= _0x4e79[2]+ _0x4e79[3]+ _0x4e79[11];this[_0x4e79[5]]= _0x4e79[12];return;default:break}})})
  }
  


}