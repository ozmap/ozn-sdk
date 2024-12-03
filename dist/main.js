export class OzNeutralSDK {
    constructor() {
        this.operatorsMap = new Map();
        this.partnersMap = new Map();
        this.companiesMap = new Map();
        this.partnershipsMap = new Map();
        this.usersMap = new Map();
        this.idGenerator = () => '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
    }
    async addPersonToCompany(idCompany, email) {
        if (!idCompany || !email)
            throw new Error("Invalid parameters");
        const usersCompany = this.companiesMap.get(idCompany);
        if (!usersCompany)
            throw new Error("Company not found");
        console.info(`Adding person to company: ${usersCompany?.name} with email ${email}`);
        const user = {
            _id: this.idGenerator(),
            idExternal: email,
            idCompany: usersCompany._id,
            avatar: 'avatarExemplo',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
        };
        this.usersMap.set(user._id, structuredClone(user));
        console.info(`Added user to company ${usersCompany?.name} with email ${email}`);
        user.idCompany = usersCompany;
        return user;
    }
    async addOperator(name, site, portDefaultPrice) {
        console.info(`Adding operator: ${name}, ${site}, ${portDefaultPrice}`);
        if (!name || !site || portDefaultPrice === undefined) {
            throw new Error('Missing required data');
        }
        const company = {
            _id: this.idGenerator(),
            name,
            address: 'Endereço Exemplo',
            country: 'Brazil',
            phone: '555555555',
            logoPath: 'https://res.cloudinary.com/devoz/image/upload/v1617114535/LOGO_OZmap_2_y6zfoz.png',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON(),
        };
        const operator = {
            _id: this.idGenerator(),
            status: 'active',
            idCompany: company._id,
            portDefaultPrice,
            oznUrl: site,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        };
        this.companiesMap.set(company._id, structuredClone(company));
        console.info(`Added company to operator: ${name}, ${site}, ${portDefaultPrice}`);
        this.operatorsMap.set(operator._id, structuredClone(operator));
        console.info(`Added operator of comapany ${name} with oznUrl ${site} and portDefaultPrice ${portDefaultPrice}`);
        operator.idCompany = company;
        return operator;
    }
    async addPartner(idOperator, name, site) {
        console.info(`Adding partner: ${name}, ${site} - Partner of ${idOperator}`);
        if (!name || !site || !idOperator) {
            throw new Error('Missing required data');
        }
        const operator = this.operatorsMap.get(idOperator);
        if (!operator)
            throw new Error("Operator not found");
        const operatorsCompany = this.companiesMap.get(operator.idCompany);
        if (!operatorsCompany)
            throw new Error("Company of Operator not found");
        const partnersCompany = {
            _id: this.idGenerator(),
            name,
            address: 'Endereço Exemplo',
            country: 'Brazil',
            phone: '555555555',
            logoPath: 'https://res.cloudinary.com/devoz/image/upload/v1617114535/LOGO_OZmap_2_y6zfoz.png',
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        };
        this.companiesMap.set(partnersCompany._id, structuredClone(partnersCompany));
        console.info(`Added company of partner: ${name}`);
        const partner = {
            _id: this.idGenerator(),
            idCompany: partnersCompany._id,
            oznUrl: site,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        };
        this.partnersMap.set(partner._id, structuredClone(partner));
        console.info(`Added partner of company - ${name} with oznUrl - ${site}`);
        const partnership = {
            _id: this.idGenerator(),
            status: 'active',
            idPartner: partner._id,
            idOperator: operator?._id,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        };
        console.info(`Adding partnership between: Partner - ${partnersCompany.name}, Operator -${operatorsCompany.name}`);
        this.partnershipsMap.set(partnership._id, structuredClone(partnership));
        console.info(`Partnership added - ${partnersCompany.name}, Operator -${operatorsCompany.name}`);
        partner.idCompany = partnersCompany;
        operator.idCompany = operatorsCompany;
        partnership.idPartner = partner;
        partnership.idOperator = operator;
        return partnership;
    }
}
