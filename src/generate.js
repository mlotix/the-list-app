export function generateID() {
  let answer = Math.floor(Math.random() * 10000000) + 10000
  answer = answer.toString(16)
  return answer
}
