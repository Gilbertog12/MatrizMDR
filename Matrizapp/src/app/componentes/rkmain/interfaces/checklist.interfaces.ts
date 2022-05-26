export interface Checklist {
    table_code: string;
    table_desc: string;
    check: boolean;
    comentario: string;
}

export interface check  {
    table_code: string;
    table_desc: string;
    comentario: string;
    checkValidation: string;
    check: boolean;

  }
export interface Nodo  {
    areaId: string;
    areaDescripcion: string;
    areaDescripcionExt: string;
    areaPosicion: string;
    areaPosicionDesc: string;
    areaIdClasificacion: string;
    areaDescClasificacion: string;
    areaRiesgoPuroDesc: string;
    areaRiesgoResidualDesc: string;
    areaStatus: string;
    areaStatusId: string;
    key: string;
    statusParent: string;
    CanAdd: string;
    CanModify: string;

  }
