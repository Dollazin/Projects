$(() => {


    let precos = [ 1000, 700, 900, 1000, 900, 800, 450, 600, 700];
    let array_2 = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_agua", "extra_pudim", "extra_temaki" ];
    for (let index = 0; index < array_2.length; index++) {
        document.getElementById(array_2[index]).addEventListener("change", ()=> {

            localStorage.setItem(array_2[index], rDataString(array_2[index]));

            if (rDataString(array_2[index]) > 0) { document.getElementById(array_2[index]).style.color = "red"; }
            else { document.getElementById(array_2[index]).style.color = "black"; }

            let valor_final = rDataString("combo_sushi") * precos[0] +
            rDataString("combo_pudim") * precos[1] +
            rDataString("combo_temaki") * precos[2] +
            rDataString("energas_1000") * precos[3] +
            rDataString("energas_900") * precos[4] +
            rDataString("extra_sushi") * precos[5] +
            rDataString("extra_agua") * precos[6] +
            rDataString("extra_pudim") * precos[7] +
            rDataString("extra_temaki") * precos[8];

            let dollarUSLocale = Intl.NumberFormat('en-US');

            document.getElementById("preco_final").innerHTML = "TOTAL: R$"+dollarUSLocale.format(valor_final);
            document.getElementById("preco_metade").innerHTML = "METADE: R$"+dollarUSLocale.format((valor_final / 2));

        });
    }
})

function rDataString(value) {
    var string = document.getElementById(value).value; 
    return string
}

function script(){
    let array_2 = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_agua", "extra_pudim", "extra_temaki" ];
    for (let index = 0; index < array_2.length; index++) {
        document.getElementById(array_2[index]).value = localStorage.getItem(array_2[index]);
    }
}
