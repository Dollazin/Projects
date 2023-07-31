let OptNames = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_pudim", "extra_temaki", "extra_agua", "combo_parceria" ];
let dollarUSLocale = Intl.NumberFormat('en-US');

const AIOV = {
    [0]: { VALOR: 1000,  NOME: "Combo de Sushi" },
    [1]: { VALOR: 700,   NOME: "Combo de Pudim" },
    [2]: { VALOR: 900,   NOME: "Combo de Temaki" },
    [3]: { VALOR: 1000,  NOME: "Energético 1000" },
    [4]: { VALOR: 900,   NOME: "Energético 900" },
    [5]: { VALOR: 800,   NOME: "Sushi Extra" },
    [6]: { VALOR: 600,   NOME: "Pudim Extra" },
    [7]: { VALOR: 700,   NOME: "Temaki Extra" },
    [8]: { VALOR: 450,   NOME: "Água Extra" },
    [9]: { VALOR: 900,   NOME: "Combo de Parceria" }
};

$(() => {

    //ALL CHANGE
    for (let index = 0; index < OptNames.length; index++) {
        document.getElementById(OptNames[index]).addEventListener("change", ()=> {
           setValueFinal(); SetInpColor(); localStorage.setItem(OptNames[index], rDataString(OptNames[index]));
        });

        //REM v2
        document.getElementById(`${OptNames[index]}_rem`).addEventListener("click", ()=> {
            if (rDataString(`${OptNames[index]}_rem`.substring(0, `${OptNames[index]}_rem`.length - 4)) > 0){
                document.getElementById(`${OptNames[index]}_rem`.substring(0, `${OptNames[index]}_rem`.length - 4)).value = (parseInt(rDataString(`${OptNames[index]}_rem`.substring(0, `${OptNames[index]}_rem`.length - 4))) - 1);
                console.log(`${OptNames[index]}_rem`); setValueFinal(); SetInpColor(); localStorage.setItem(`${OptNames[index]}_rem`.substring(0, `${OptNames[index]}_rem`.length - 4), rDataString(OptNames[index]));
            }
        });
        
        //ADD v2
        document.getElementById(`${OptNames[index]}_add`).addEventListener("click", ()=> {
            document.getElementById(`${OptNames[index]}_add`.substring(0, `${OptNames[index]}_add`.length - 4)).value = parseInt(rDataString(`${OptNames[index]}_add`.substring(0, `${OptNames[index]}_add`.length - 4))) + 1;
            console.log(`${OptNames[index]}_add`); setValueFinal(); SetInpColor(); localStorage.setItem(`${OptNames[index]}_add`.substring(0, `${OptNames[index]}_add`.length - 4), rDataString(OptNames[index]));
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
        for (let index = 0; index < OptNames.length; index++) { storage[index] = rDataString(OptNames[index]) > 0 ? (`${rDataString(OptNames[index])} ${AIOV[index].NOME} | `): ""; }
        let strTxt = storage[0] + storage[1] + storage[2] + storage[3] + storage[4] + storage[5]+ storage[6] + storage[7] + storage[8] + storage[9];
        let vFinal = (rDataString(OptNames[0]) * AIOV[0].VALOR) + (rDataString(OptNames[1]) * AIOV[1].VALOR) + (rDataString(OptNames[2]) * AIOV[2].VALOR) + (rDataString(OptNames[3]) * AIOV[3].VALOR) + (rDataString(OptNames[4]) * AIOV[4].VALOR) + (rDataString(OptNames[5]) * AIOV[5].VALOR) + (rDataString(OptNames[6]) * AIOV[6].VALOR) + (rDataString(OptNames[7]) * AIOV[7].VALOR) + (rDataString(OptNames[8]) * AIOV[8].VALOR) + (rDataString(OptNames[9]) * AIOV[9].VALOR);
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
    let vFinal = (rDataString(OptNames[0]) * AIOV[0].VALOR) + (rDataString(OptNames[1]) * AIOV[1].VALOR) + (rDataString(OptNames[2]) * AIOV[2].VALOR) + (rDataString(OptNames[3]) * AIOV[3].VALOR) + (rDataString(OptNames[4]) * AIOV[4].VALOR) + (rDataString(OptNames[5]) * AIOV[5].VALOR) + (rDataString(OptNames[6]) * AIOV[6].VALOR) + (rDataString(OptNames[7]) * AIOV[7].VALOR) + (rDataString(OptNames[8]) * AIOV[8].VALOR) + (rDataString(OptNames[9]) * AIOV[9].VALOR);
    document.getElementById("preco_final").innerHTML = "TOTAL: R$" + dollarUSLocale.format(vFinal);
    document.getElementById("preco_metade").innerHTML = "METADE: R$" + dollarUSLocale.format((vFinal / 2));
}

function SetInpColor(){
    for (let index = 0; index < OptNames.length; index++) {
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "grey"; }
    }
}
