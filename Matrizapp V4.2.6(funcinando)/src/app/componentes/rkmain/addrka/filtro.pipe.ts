import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], arg?: string ): any {
    
    const resultPost = [];
    if (arg === undefined || arg === '' || arg.length <3 ) return value;
      
        
        for( const areasList of value){
            if(areasList.Descripcion.toUpperCase().indexOf(arg. toUpperCase()) > -1 ){
              resultPost.push(areasList);
            }
        }
      
      
    
       
    
    return resultPost;

}

}
