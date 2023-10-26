function calcularMCD() {
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    
    var resultado = mcd(num1, num2);
    
    document.getElementById("resultado").value = resultado;
  }
  
  function mcd(a, b) {
    if (b == 0) {
      return a;
    } else {
      return mcd(b, a % b);
    }
  }