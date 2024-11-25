export type User = {
    _id: string,
    idExternal: string,
    idCompany: string | Company,
    avatar: string,
    createdAt: string | Date,
    updatedAt: string | Date,
}

export type Company = {
    _id: string,
    name: string,
    address: string,
    country: string,
    phone: string,
    logoPath: string,
    createdAt: string | Date,
    updatedAt: string | Date
}

export type Operator = {
    _id: string,
    status: string,
    idCompany: string | Company,
    portDefaultPrice: number,
    oznUrl: string,
    createdAt: string | Date,
    updatedAt: string | Date
}

export type Partner = {
    _id: string,
    idCompany: string | Company,
    oznUrl: string,
    createdAt: string | Date,
    updatedAt: string | Date
}

export type Partnership = {
    _id: string,
    idPartner: string | Partner,
    idOperator: string | Operator,
    status: string,
    createdAt: string | Date,
    updatedAt: string | Date,
}

export type ResponseCompany = Company
export type ResponseOperator = Omit<Operator, 'idCompany'> & { idCompany: ResponseCompany }
export type ResponsePartner = Omit<Partner, 'idCompany'> & { idCompany: ResponseCompany }
export type ResponseUser = Omit<User, 'idCompany'> & { idCompany: ResponseCompany } 
export type ResponsePartnership = Omit<Partnership, 'idPartner' | 'idOperator'> & { idPartner: ResponsePartner, idOperator: ResponseOperator }

export type Response<T> =
    T extends Company? Company
  : T extends Operator? ResponseOperator
  : T extends Partner ? ResponsePartner
  : T extends Partnership ? ResponsePartnership
  : T extends User ? ResponseUser : { data: T, message: "Response Type Not Identified"};


export class OzNeutralSDK {

    private operatorsMap: Map<string, Operator> = new Map()
    private partnersMap: Map<string, Partner> = new Map()
    private companiesMap: Map<string, Company> = new Map()
    private partnershipsMap: Map<string, Partnership> = new Map()
    private usersMap: Map<string, User> = new Map()

    private idGenerator = (): string => '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');

    async addPersonToCompany(idCompany: string, email: string): Promise<ResponseUser> {

        if(!idCompany || !email) throw new Error("Invalid parameters")

        const usersCompany = this.companiesMap.get(idCompany)
        
        if(!usersCompany) throw new Error("Company not found")

        console.info(`Adding person to company: ${usersCompany?.name} with email ${email}`);

        const user: User = {
            _id: this.idGenerator(),
            idExternal: email,
            idCompany: usersCompany._id,
            avatar: 'avatarExemplo',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
        }

        this.usersMap.set(user._id, structuredClone(user))
        console.info(`Added user to company ${usersCompany?.name} with email ${email}`);

        user.idCompany = usersCompany

        return user as ResponseUser
    }
    async addOperator(name: string, site: string, portDefaultPrice: number): Promise<ResponseOperator> {

        console.info(`Adding operator: ${name}, ${site}, ${portDefaultPrice}`);

        if (!name || !site || portDefaultPrice === undefined) {
            throw new Error('Missing required data');
        }

        const company: Company = {
            _id: this.idGenerator(),
            name,
            address: 'Endereço Exemplo',
            country: 'Brazil',
            phone: '555555555',
            logoPath: 'https://res.cloudinary.com/devoz/image/upload/v1617114535/LOGO_OZmap_2_y6zfoz.png',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
        }

        const operator: Operator = {
            _id: this.idGenerator(),
            status: 'active',
            idCompany: company._id,
            portDefaultPrice,
            oznUrl: site,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        }

        this.companiesMap.set(company._id, structuredClone(company))
        console.info(`Added company to operator: ${name}, ${site}, ${portDefaultPrice}`);
        this.operatorsMap.set(operator._id, structuredClone(operator))
        console.info(`Added operator of comapany ${name} with oznUrl ${site} and portDefaultPrice ${portDefaultPrice}`);

        operator.idCompany = company

        return operator as ResponseOperator
    }
    async addPartner(idOperator: string, name: string, site: string): Promise<ResponsePartnership> {
        
        console.info(`Adding partner: ${name}, ${site} - Partner of ${idOperator}`);

        if (!name || !site || !idOperator) {
            throw new Error('Missing required data');
        }

        const operator = this.operatorsMap.get(idOperator)
        if(!operator) throw new Error("Operator not found")

        const operatorsCompany = this.companiesMap.get(operator.idCompany as string)
        if(!operatorsCompany) throw new Error("Company of Operator not found")

        const partnersCompany: Company = {
            _id: this.idGenerator(),
            name,
            address: 'Endereço Exemplo',
            country: 'Brazil',
            phone: '555555555',
            logoPath: 'https://res.cloudinary.com/devoz/image/upload/v1617114535/LOGO_OZmap_2_y6zfoz.png',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        }

        this.companiesMap.set(partnersCompany._id, structuredClone(partnersCompany))
        console.info(`Added company of partner: ${name}`);

        const partner: Partner = {
            _id: this.idGenerator(),
            idCompany: partnersCompany._id,
            oznUrl: site,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        }

        this.partnersMap.set(partner._id, structuredClone(partner))
        console.info(`Added partner of company - ${name} with oznUrl - ${site}`);

        const partnership: Partnership = {
            _id: this.idGenerator(),
            status: 'active',
            idPartner: partner._id,
            idOperator: operator?._id as string,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        }

        console.info(`Adding partnership between: Partner - ${partnersCompany.name}, Operator -${operatorsCompany.name}`);
        this.partnershipsMap.set(partnership._id, structuredClone(partnership))
        console.info(`Partnership added - ${partnersCompany.name}, Operator -${operatorsCompany.name}`);

        partner.idCompany = partnersCompany
        operator.idCompany = operatorsCompany

        partnership.idPartner = partner
        partnership.idOperator = operator

        return partnership as ResponsePartnership

    }
}
