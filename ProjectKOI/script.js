let OptNames = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_pudim", "extra_temaki", "extra_agua" ];
let OptPrices = [ 1000, 700, 900, 1000, 900, 800, 600, 700, 450];
let BtnNamesRem = [ "combo_sushi_rem", "combo_pudim_rem", "combo_temaki_rem", "energas_1000_rem", "energas_900_rem", "extra_sushi_rem", "extra_pudim_rem", "extra_temaki_rem", "extra_agua_rem" ];
let BtnNamesAdd = [ "combo_sushi_add", "combo_pudim_add", "combo_temaki_add", "energas_1000_add", "energas_900_add", "extra_sushi_add", "extra_pudim_add", "extra_temaki_add", "extra_agua_add" ];
let dollarUSLocale = Intl.NumberFormat('en-US');


$(() => {

    //ALL CHANGE
    for (let index = 0; index < OptNames.length; index++) {
        document.getElementById(OptNames[index]).addEventListener("change", ()=> {
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

    //BOTAO RESET
    document.getElementById("resetAll").addEventListener("click", ()=> {
        if (confirm("Deseja Resetar Todas Opcões?")){
            for (let index = 0; index < OptNames.length; index++) {
                document.getElementById(OptNames[index]).value = 0;
                setValueFinal(); SetInpColor(); localStorage.setItem(OptNames[index], 0);
            }
        }     
    });

    //BOTAO COPIAR
    document.getElementById("txtCopy").addEventListener("click", ()=> {
        let storage = [];
        for (let index = 0; index < OptNames.length; index++) { storage[index] = rDataString(OptNames[index]) > 0 ? (`${rDataString(OptNames[index])} ${OptNames[index].replace("_", " ")} | `): ""; }
        let strTxt = storage[0] + storage[1] + storage[2] + storage[3] + storage[4]+ storage[5]+ storage[6]+ storage[7]+ storage[8];
        let vFinal = (rDataString(OptNames[0]) * OptPrices[0]) + (rDataString(OptNames[1]) * OptPrices[1]) + (rDataString(OptNames[2]) * OptPrices[2]) + (rDataString(OptNames[3]) * OptPrices[3]) + (rDataString(OptNames[4]) * OptPrices[4]) + (rDataString(OptNames[5]) * OptPrices[5]) + (rDataString(OptNames[6]) * OptPrices[6]) + (rDataString(OptNames[7]) * OptPrices[7]) + (rDataString(OptNames[8]) * OptPrices[8]);
        let vString = (`${strTxt.slice(0, strTxt.length - 3)} // Total: R$${dollarUSLocale.format(vFinal)} || 50%: R$${dollarUSLocale.format((vFinal / 2))}`);
        navigator.clipboard.writeText(vString);
    });
});

function rDataString(value){
    var string = document.getElementById(value).value;
    return document.getElementById(value).value == 0 ? 0 : string;
}

function script(){
    for (let index = 0; index < OptNames.length; index++) { 
        document.getElementById(OptNames[index]).value = localStorage.getItem(OptNames[index]);
        localStorage.setItem(OptNames[index], rDataString(OptNames[index]));
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "grey"; }
    }
    setValueFinal();
}

function setValueFinal(){
    let vFinal = (rDataString(OptNames[0]) * OptPrices[0]) + (rDataString(OptNames[1]) * OptPrices[1]) + (rDataString(OptNames[2]) * OptPrices[2]) + (rDataString(OptNames[3]) * OptPrices[3]) + (rDataString(OptNames[4]) * OptPrices[4]) + (rDataString(OptNames[5]) * OptPrices[5]) + (rDataString(OptNames[6]) * OptPrices[6]) + (rDataString(OptNames[7]) * OptPrices[7]) + (rDataString(OptNames[8]) * OptPrices[8]);
    document.getElementById("preco_final").innerHTML = "TOTAL: R$" + dollarUSLocale.format(vFinal);
    document.getElementById("preco_metade").innerHTML = "METADE: R$" + dollarUSLocale.format((vFinal / 2));
}

function SetInpColor(){
    for (let index = 0; index < OptNames.length; index++) {
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "grey"; }
    }
}
