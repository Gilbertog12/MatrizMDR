import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    const resultPost = [];
    if (arg === undefined || arg === '' || arg.length <3 ) return value;
      
        
        for( const consecuenciasList of value){
            if(consecuenciasList.Descripcion.toUpperCase().indexOf(arg. toUpperCase()) > -1 ){
              resultPost.push(consecuenciasList);
            }
        }
      
      
    
       
    
    return resultPost;
  }

}
