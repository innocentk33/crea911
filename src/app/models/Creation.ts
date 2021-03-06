/**
 * CREA-911
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: contact@neiba.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';
import { Service, Creatif, TypeActivite, Fichier, Tags } from './models';

export interface Creation {
    crtId?: number;

    crtDescription?: string;

    crtDatePublication?: string;

    crtDateModification?: string;

    crtEtat?: boolean;

    fkServiceId?: number;

    fkTypeActiviteId?: number;

    fkAdmId?: number;

    fkCreatifId?: number;

    service?: Service
    creatif?: Creatif
    typeActivite?: TypeActivite
    fichiers?: Fichier[]
    tags?: Tags[]
}
