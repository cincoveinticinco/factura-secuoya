export interface VendorData {
    vendor:            Vendor;
    purchaseOrders:    Order[];
    fPersonTypeId:     number;
    selectedOrders:    Order[];
    poProjections:     PoProjection[];
    registerCode:      null;
    registerDate:      null;
    fRegisterStatusId: null;
    registerType:      number;
}

export interface PoProjection {
    id:                                   number;
    f_form_payment_id:                    number;
    b_currency_type_id:                   number;
    value:                                number;
    start_date:                           Date;
    b_item_id:                            number;
    user_id:                              number;
    f_form_payment_status_id:             number;
    description:                          string;
    created_at:                           Date;
    updated_at:                           Date;
    f_request_id:                         number;
    f_request_has_project_types_id:       number;
    id_references:                        number;
    project_id:                           number;
    total_purchase_order:                 number;
    f_purchase_order_id:                  number;
    consecutive_code:                     string;
    payment_status_eng:                   string;
    payment_status_esp:                   string;
    start_date_payment:                   Date;
    f_vendor_id:                          number;
    f_purchase_has_payment_projection_id: number;
    f_request_has_project_id:             number;
    quantity:                             number;
    f_payment_frecuency_id:               number;
    f_form_payment_projection_id:         number;
    proj_name:                            string;
    company_id:                           number;
    frecuency:                            string;
    utility:                              any[];
    taxes:                                any[];
    retentions:                           any[];
    taxes_addition_value_utility:         number;
    total:                                number;
    taxes_addition_value:                 number;
    taxes_not_addition_value:             number;
}

export interface Order {
    id:               number;
    consecutiveCodes: string;
    projectId:        number;
}

export interface Vendor {
    id:                            number;
    documentNumber:                string;
    email:                         string;
    documentTypeEsp:               string;
    personType:                    string;
    fullName:                      string;
    companyName:                   string;
    address:                       string;
    position:                      string;
    selectedOrders:                number[];
    bankBranch:                    string;
    bankKey:                       string;
    bankAccountType:               string;
    telephone:                     string;
    institutionalEmail:            string;
    afcEntity:                     null;
    afcAccountNumber:              null;
    afcValue:                      null;
    voluntaryPensionEntity:        null;
    voluntaryPensionAccountNumber: null;
    voluntaryPensionValue:         null;
    vendorDocuments:               null;
    infoAdditional:                null;
    dependentsInfo:                any[];
    signature:                     null;
    contract_code:                 string;
}