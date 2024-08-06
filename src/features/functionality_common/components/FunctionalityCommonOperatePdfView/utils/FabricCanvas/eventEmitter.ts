// eventEmitter.js
import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter()

export default eventEmitter
export const eventEmitterAddFabricIndexCanvasKey = 'fabricCanvasAddIndexObject-'
export const eventEmitterAddFabricIndexCanvas = (index: number, ...args) => {
  //给指定index的canvas添加对象
  eventEmitter.emit(eventEmitterAddFabricIndexCanvasKey + index, ...args)
}
export const eventEmitterAddFabricCanvasKey = 'fabricCanvasAddObject'
export const eventEmitterAddFabricCanvas = (...args) => {
  //给canvas添加对象,会根据当前显示的index添加
  eventEmitter.emit(eventEmitterAddFabricCanvasKey, ...args)
}
