
var oScript = document.createElement('script');
oScript.src = 'http://suggestion.baidu.com/su?wd='+oTxt.value+'&p=3&cb=baidu&from=superpage';
document.body.appendChild(oScript);

if(oScript){
    document.body.removeChild(oScript);
}