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

export interface Adresse {
    adId?: number;

    adCodePostal?: number;

    adAdresse?: string;

    adComplement?: string;

    adTel1?: string;

    adTel2?: string;

    adSite?: string;

    fkVilleId?: number;

    fkCommuneId?: number;

}
