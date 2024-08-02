// eventEmitter.js
import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter()

export default eventEmitter
export const addFabricIndexCanvas = (index: number, data: any) => {
  //给指定的canvas添加对象
  eventEmitter.emit('fabricCanvasAddIndexObject-' + index, data)
}
