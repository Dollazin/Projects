let OptNames = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_pudim", "extra_temaki", "extra_agua" ];
let OptPrices = [ 1000, 700, 900, 1000, 900, 800, 450, 600, 700];

let BtnNamesRem = [ "combo_sushi_rem", "combo_pudim_rem", "combo_temaki_rem", "energas_1000_rem", "energas_900_rem", "extra_sushi_rem", "extra_pudim_rem", "extra_temaki_rem", "extra_agua_rem" ];
let BtnNamesAdd = [ "combo_sushi_add", "combo_pudim_add", "combo_temaki_add", "energas_1000_add", "energas_900_add", "extra_sushi_add", "extra_pudim_add", "extra_temaki_add", "extra_agua_add" ];

$(() => {

    //ALL CHANGE
    for (let index = 0; index < OptNames.length; index++) {
        document.getElementById(OptNames[index]).addEventListener("change", ()=> {
           //console.log(OptNames[index], rDataString(OptNames[index]))
           setValueFinal(); SetInpColor(); localStorage.setItem(OptNames[index], rDataString(OptNames[index]));
        });
    }

    //REM
    for (let index = 0; index < BtnNamesRem.length; index++) {
        document.getElementById(BtnNamesRem[index]).addEventListener("click", ()=> {
            let anyString = BtnNamesRem[index];
            let anyString4 = anyString.substring(0, anyString.length - 4)
            if (rDataString(anyString4) > 0){
                document.getElementById(anyString4).value = (parseInt(rDataString(anyString4)) - 1);
                setValueFinal(); SetInpColor(); localStorage.setItem(anyString4, rDataString(OptNames[index]));
            }
        });
    }

    //ADD
    for (let index = 0; index < BtnNamesAdd.length; index++) {
        document.getElementById(BtnNamesAdd[index]).addEventListener("click", ()=> {
           let anyString = BtnNamesRem[index];
            let anyString4 = anyString.substring(0, anyString.length - 4)
            document.getElementById(anyString4).value = (parseInt(rDataString(anyString4)) + 1);
            setValueFinal(); SetInpColor(); localStorage.setItem(anyString4, rDataString(OptNames[index]));
        });
    }
});

function rDataString(value){
    var string = document.getElementById(value).value;
    return document.getElementById(value).value == 0 ? 0 : string;
}

function script(){
    for (let index = 0; index < OptNames.length; index++) { document.getElementById(OptNames[index]).value = localStorage.getItem(OptNames[index]); }
    for (let index = 0; index < OptNames.length; index++) {
        localStorage.setItem(OptNames[index], rDataString(OptNames[index]));
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "grey"; }
    }
    setValueFinal();
}

function setValueFinal(){
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let valor_final = (rDataString("combo_sushi") * OptPrices[0]) + (rDataString("combo_pudim") * OptPrices[1]) + (rDataString("combo_temaki") * OptPrices[2]) + (rDataString("energas_1000") * OptPrices[3]) + (rDataString("energas_900") * OptPrices[4]) + (rDataString("extra_sushi") * OptPrices[5]) + (rDataString("extra_agua") * OptPrices[6]) + (rDataString("extra_pudim") * OptPrices[7]) + (rDataString("extra_temaki") * OptPrices[8]);
    document.getElementById("preco_final").innerHTML = "TOTAL: R$" + dollarUSLocale.format(valor_final);
    document.getElementById("preco_metade").innerHTML = "METADE: R$" + dollarUSLocale.format((valor_final / 2));
}

function SetInpColor(){
    for (let index = 0; index < OptNames.length; index++) {
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "grey"; }
    }
}