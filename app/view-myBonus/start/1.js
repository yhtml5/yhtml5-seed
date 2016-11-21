console.log('1.js');

function menu(arr){
    var odd = [],
        even = [];
    for(var i = 0; i < arr.length; i++){
        if(i % 2 == 0){
            odd.push(arr[i]);
        }else{
            even.push(arr[i]);
        }
    }
    for(var i = 0; i < odd.length; i++){
        odd[i].style.left = 70 + 'px';
        odd[i].style.top = (80 + 80 * i) + 'px';
    }
    for(var i = 0; i < even.length; i++){
        even[i].style.right = 70 + 'px';
        even[i].style.top = (120 + 80 * i) + 'px';
    }
}

window.onload = function(){
    var arr = document.getElementsByTagName('a');
    console.log(arr.length);
    menu(arr);

};