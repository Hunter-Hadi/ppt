import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const userAddColorListRecoil = atom<string[]>({
  key: 'userAddColorListRecoil',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
