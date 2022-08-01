$(() => {
    setInterval(() => { ScriptUpdate(); }, 1500);
})

function rDataString(value) {
    var string = document.getElementById(value).value; 
    return string
}

function ScriptUpdate() {
    let dollarUSLocale = Intl.NumberFormat('en-US');

    let array_valor = [850, 750, 750, 500, 400, 500, 350];
    let array_custo = [400, 400, 340, 500, 150, 240, 190];

    let Mat_Total = (rDataString("ipt_combo") * array_valor[0]) + (rDataString("ipt_parceria") * array_valor[1]) + (rDataString("ipt_pudin") * array_valor[2]) + (rDataString("ipt_membro") * array_valor[3]) + (rDataString("ipt_bebida") * array_valor[4]) + (rDataString("ipt_comida") * array_valor[5]) + (rDataString("ipt_purin") * array_valor[6]);
    let Mat_Custo = (rDataString("ipt_combo") * array_custo[0]) + (rDataString("ipt_parceria") * array_custo[1]) + (rDataString("ipt_pudin") * array_custo[2]) + (rDataString("ipt_membro") * array_custo[3]) + (rDataString("ipt_bebida") * array_custo[4]) + (rDataString("ipt_comida") * array_custo[5]) + (rDataString("ipt_purin") * array_custo[6]);
    let Mat_Empresa = (((Mat_Total - Mat_Custo) / 2) + ((rDataString("ipt_membro") * array_custo[3]) - (rDataString("ipt_membro") * array_custo[0])));
    let Mat_Deposito = ((Mat_Custo + Mat_Empresa) - (rDataString("ipt_membro") * 100));
    let Mat_Funcionario =  ((((Mat_Total - Mat_Custo) / 2) - ((rDataString("ipt_membro") * array_custo[3]) - (rDataString("ipt_membro") * array_custo[0]))) + (rDataString("ipt_membro") * 100));

	document.getElementById("valor_total").innerHTML = "R$"+dollarUSLocale.format(Mat_Total);
    document.getElementById("valor_custo").innerHTML = "R$"+dollarUSLocale.format(Mat_Custo);
    document.getElementById("valor_empresa").innerHTML = "R$"+dollarUSLocale.format(Mat_Empresa);
    document.getElementById("valor_deposito").innerHTML = "R$"+dollarUSLocale.format(Mat_Deposito);
    document.getElementById("valor_funcionario").innerHTML = "R$"+dollarUSLocale.format(Mat_Funcionario);
}

