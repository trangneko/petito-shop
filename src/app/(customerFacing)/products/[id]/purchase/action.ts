import axios from "axios";

interface Config {
  clientID?: string;
  apiKey?: string;
}

interface QRCodeRequest {
  bank?: string;
  accountName?: string;
  accountNumber?: string;
  amount?: string;
  memo?: string;
  template?: string;
  format?: string; // Used in genQRCodeBase64V1
  media?: string; // Used in genQuickLink
}

interface PaymentGatewayRequest {
  theme_slug: string;
  platform?: string;
  bankId?: string;
  accountName?: string;
  accountNumber?: string;
  addInfo?: string;
  amount?: string;
}

export class VietQR {
  private clientID: string = "";
  private apiKey: string = "";
  private message: string = "Please check your API key and client key";
  private apiUrl: string = "https://api.vietqr.io";

  constructor({ clientID = "", apiKey = "" }: Config) {
    this.clientID = clientID;
    this.apiKey = apiKey;
  }

  private checkKey(): boolean {
    return this.clientID !== "" && this.apiKey !== "";
  }

  private sendMessage(check: boolean): void {
    if (!check) console.log(this.message);
  }

  async getTemplate(): Promise<any> {
    if (this.checkKey()) {
      return getData(`${this.apiUrl}/v2/template`);
    }
    this.sendMessage(this.checkKey());
  }

  async getBanks(): Promise<any> {
    if (this.checkKey()) {
      return getData(`${this.apiUrl}/v2/banks`);
    }
    this.sendMessage(this.checkKey());
  }

  async genQRCodeBase64(request: QRCodeRequest): Promise<any> {
    if (this.checkKey()) {
      return postData(`${this.apiUrl}/v2/generate`, {
        accountNo: request.accountNumber,
        accountName: request.accountName,
        acqId: request.bank,
        addInfo: request.memo,
        amount: request.amount,
        template: request.template,
      });
    }
    this.sendMessage(this.checkKey());
  }

  async genQRCodeBase64V1(request: QRCodeRequest): Promise<any> {
    if (this.checkKey()) {
      return postData(`${this.apiUrl}/v1/generate`, {
        accountNo: request.accountNumber,
        accountName: request.accountName,
        acqId: request.bank,
        addInfo: request.memo,
        amount: request.amount,
        format: request.format,
      });
    }
    this.sendMessage(this.checkKey());
  }

  genQuickLink(request: QRCodeRequest): string {
    if (this.checkKey()) {
      let memoEncoded = request.memo ? encodeURIComponent(request.memo) : "";
      let accountNameEncoded = request.accountName
        ? encodeURIComponent(request.accountName)
        : "";

      let url =
        request.media === ".jpg"
          ? encodeURI(
              `${this.apiUrl}/${request.bank}/${request.accountNumber}/${
                request.amount
              }/${encodeURIComponent(request.memo!)}/${
                request.template
              }.jpg?accountName=${encodeURIComponent(request.accountName!)}`
            ).replace(/%20/g, "+")
          : encodeURI(
              `${this.apiUrl}/${request.bank}/${request.accountNumber}/${
                request.amount
              }/${encodeURIComponent(request.memo!)}/${
                request.template
              }.png?accountName=${encodeURIComponent(request.accountName!)}`
            ).replace(/%20/g, "+");

      return url;
    }
    this.sendMessage(this.checkKey());
    return "";
  }

  async createPaymentGateway(request: PaymentGatewayRequest): Promise<any> {
    if (this.checkKey()) {
      let entity: any = {
        apiKey: this.apiKey,
        clientId: this.clientID,
        theme_slug: request.theme_slug,
      };
      if (request.bankId) entity.bankId = request.bankId;
      if (request.accountName) entity.accountName = request.accountName;
      if (request.accountNumber) entity.accountNumber = request.accountNumber;
      if (request.addInfo) entity.addInfo = request.addInfo;
      if (request.amount) entity.amount = request.amount;
      if (request.theme_slug) entity.theme = request.theme_slug;
      if (request.platform) entity.platform = request.platform;
      return postData(
        `https://gateway.vietqr.io/payment-gateway/v1/createToken`,
        entity
      );
    }
    this.sendMessage(this.checkKey());
  }
}

async function getData(url: string): Promise<any> {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}

async function postData(url: string, data: any): Promise<any> {
  data.addInfo = data.addInfo || "";

  return axios
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}
