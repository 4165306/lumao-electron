import { sendToRenderer } from '../modules/communication/renderer'

export default class Events {
  public static async log(message: string) {
    sendToRenderer(message)
  }
}
