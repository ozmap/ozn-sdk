export type User = {
    _id: string;
    idExternal: string;
    idCompany: string | Company;
    avatar: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type Company = {
    _id: string;
    name: string;
    address: string;
    country: string;
    phone: string;
    logoPath: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type Operator = {
    _id: string;
    status: string;
    idCompany: string | Company;
    portDefaultPrice: number;
    oznUrl: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type Partner = {
    _id: string;
    idCompany: string | Company;
    oznUrl: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type Partnership = {
    _id: string;
    idPartner: string | Partner;
    idOperator: string | Operator;
    status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type ResponseCompany = Company;
export type ResponseOperator = Omit<Operator, 'idCompany'> & {
    idCompany: ResponseCompany;
};
export type ResponsePartner = Omit<Partner, 'idCompany'> & {
    idCompany: ResponseCompany;
};
export type ResponseUser = Omit<User, 'idCompany'> & {
    idCompany: ResponseCompany;
};
export type ResponsePartnership = Omit<Partnership, 'idPartner' | 'idOperator'> & {
    idPartner: ResponsePartner;
    idOperator: ResponseOperator;
};
export type Response<T> = T extends Company ? Company : T extends Operator ? ResponseOperator : T extends Partner ? ResponsePartner : T extends Partnership ? ResponsePartnership : T extends User ? ResponseUser : {
    data: T;
    message: "Response Type Not Identified";
};
export declare class OzNeutralSDK {
    private operatorsMap;
    private partnersMap;
    private companiesMap;
    private partnershipsMap;
    private usersMap;
    private idGenerator;
    addPersonToCompany(idCompany: string, email: string): Promise<ResponseUser>;
    addOperator(name: string, site: string, portDefaultPrice: number): Promise<ResponseOperator>;
    addPartner(idOperator: string, name: string, site: string): Promise<ResponsePartnership>;
}
