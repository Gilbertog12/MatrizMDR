import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], arg?: string ): any {
    
    const resultPost = [];
    if (arg === undefined || arg === '' ) return value;
      
        
        for( const pendList of value){
            if(pendList.Fecha.indexOf(arg) > -1 ){
              resultPost.push(pendList);
            }
        }
      
      
    
       
    
    return resultPost;

}
}
