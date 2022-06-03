function fn1(){
    this=this
    console.log(this)
}
const fn2 = () => console.log(this)

var arr1 = [[{"0": [fn1]}]]
var arr2 = [[{"0": fn2}]]

arr1[0][0][0][0]()
arr2[0][0][0]()