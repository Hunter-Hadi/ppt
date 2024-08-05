// eventEmitter.js
import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter()

export default eventEmitter
export const eventEmitterAddFabricIndexCanvasKey = 'fabricCanvasAddIndexObject-'
export const eventEmitterAddFabricIndexCanvas = (index: number, data: any) => {
  //给指定index的canvas添加对象
  eventEmitter.emit(eventEmitterAddFabricIndexCanvasKey + index, data)
}
export const eventEmitterAddFabricCanvasKey = 'fabricCanvasAddObject'
export const eventEmitterAddFabricCanvas = (data: any) => {
  //给canvas添加对象,会根据当前显示的index添加
  eventEmitter.emit(eventEmitterAddFabricCanvasKey, data)
}
