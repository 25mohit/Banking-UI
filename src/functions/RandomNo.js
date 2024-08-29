export const RandomNumber = (numLenght) => {
    let number = ''
    for(let i=0; i< numLenght; i++){
        number += Math.round(Math.random()*9)
    }
    return number
}