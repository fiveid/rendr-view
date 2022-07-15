export interface ScrollData {
  whollyVisible: number[],
  visible: number[],
  count: number
  range: [number, number]
}

export interface ScrollSnapState {
  slides: ScrollData,
  views: ScrollData
}

export const initialScrollData: ScrollData = {
  visible: [],
  whollyVisible: [],
  count: 0,
  range: [0, 0]
}

export const initialState: ScrollSnapState = {
  slides: initialScrollData,
  views: initialScrollData
}
