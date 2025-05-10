export type Profile = {
  name: string,
  image: { // sizeなどを拡張することを考えオブジェクトにする
    src: string
  },
  profession: string,
  awards: Array<string> // 個数はarrayの長さで動的に判定する想定
  discovered: string
}
