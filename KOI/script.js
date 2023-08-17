let OptNames = [ "combo_sushi", "combo_pudim", "combo_temaki", "energas_1000", "energas_900", "extra_sushi", "extra_pudim", "extra_temaki", "extra_agua", "combo_parceria" ];
let chkNames = [ "chkDark", "chkCustom" ];
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

let btnCFGCheck = false;

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


    //HOVER PRA AUMENTAR O TAMANHO DA IMAGEM DE CFG
    document.getElementById("cfgIcon").addEventListener("mouseover", ()=> {
        document.getElementById("cfgIcon").style.width = "50px";
        document.getElementById("cfgIcon").style.height = "50px";
    });

    //HOVER PRA DIMINUIR O TAMANHO DA IMAGEM DE CFG
    document.getElementById("cfgIcon").addEventListener("mouseout", ()=> {
        if (!btnCFGCheck){
            document.getElementById("cfgIcon").style.width = "40px";
            document.getElementById("cfgIcon").style.height = "40px";
        }
    });

    //AUMENTAR/DIMUNUIR A IMAGEM QUANDO TIVER SIDO CLICADA
    document.getElementById("btnCFG").addEventListener("click", ()=> {
        btnCFGCheck = !btnCFGCheck;
        btnCFGCheck ? $("#topHeader").show() : $("#topHeader").hide();
        if (btnCFGCheck){
            document.getElementById("cfgIcon").style.width = "50px";
            document.getElementById("cfgIcon").style.height = "50px";
        }
        else {
            document.getElementById("cfgIcon").style.width = "40px";
            document.getElementById("cfgIcon").style.height = "40px";
        }
    });

    //ATUALIZAR CFG DO STORAGE
    for (let index = 0; index < chkNames.length; index++) {
        document.getElementById(chkNames[index]).addEventListener("click", ()=> {
            //RECEBER STATUS DO CHECKBOX
            let status = document.getElementById(chkNames[index]).checked;
            //ENVIAR O STATUS PRO STORAGE
            localStorage.setItem(chkNames[index], status);
        });
    }

    //ATIVAR E DESATIVAR DARK MODE
    document.getElementById("chkDark").addEventListener("click", ()=> {

        //DESATIVAR CUSTOM COLOR (CASO ATIVADO)
        if (document.getElementById("chkCustom").checked){
            localStorage.setItem("chkCustom", false);
            localStorage.setItem("chkCustomColor", "#000000");
            document.getElementById("chkCustom").checked = false;
        }

        //SETAR DARK MODE
        let status = document.getElementById("chkDark").checked;
        SetDarkMode(status);
    });

    //ATIVAR E DESATIVAR CUSTOM COLOR
    document.getElementById("chkCustom").addEventListener("click", ()=> {
        let status = document.getElementById("chkCustom").checked;

        //ATIVAR E DESATIVAR BARRINHA DE CORES
        status ? $("#chkCC").show() : $("#chkCC").hide();

        //DESATIVAR DARK MODE E GUARDAR NO STORAGE (CASO ATIVADO)
        if (document.getElementById("chkDark").checked){
            document.getElementById("chkDark").checked = false;
            localStorage.setItem("chkDark", false);
        }

        //ENVIAR COR PRO STORAGE
        if (!localStorage.getItem("chkCustomColor")){
            localStorage.setItem("chkCustomColor", "#000000");
        }

        //COLORCAR COR NO BACKGROUND
        document.getElementById("fullPage").style.backgroundColor = document.getElementById("chkCustomColor").value;

        //ATIVAR DARK MODE CASO DESATIVAR CUSTOM COLOR
        if (!status){
            SetDarkMode(true);
            document.getElementById("chkDark").checked = true;
            localStorage.setItem("chkDark", true);
        }
    });

    //SETAR CUSTOM COLOR
    document.getElementById("chkCustomColor").addEventListener("input", ()=> {

        //VERIFICAR SE CUSTOM COLOR TA ATIVADO
        if (document.getElementById("chkCustom").checked){

            //PEGAR COR
            let rColor = document.getElementById("chkCustomColor").value;
            
            //COLORCAR COR NO BACKGROUND
            document.getElementById("fullPage").style.backgroundColor = rColor;

            //ENVIAR COR PRO STORAGE
            localStorage.setItem("chkCustomColor", rColor);
        }
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
        else { document.getElementById(OptNames[index]).style.color = "black"; }
    }
    
    //ATUALIZAR VALOR
    setValueFinal();

    //ESCONDER BARRA DE CFG
    btnCFGCheck ? $("#topHeader").show() : $("#topHeader").hide();

    //RECEBER CFG DO STORAGE
    for (let index = 0; index < chkNames.length; index++) {
        let status = localStorage.getItem(chkNames[index]);
        if (!status) {
            localStorage.setItem(chkNames[index], false);
        }
        document.getElementById(chkNames[index]).checked = status == "false" ? 0 : status;
    }

    //DARK MODE
    if (document.getElementById("chkDark").checked){
        SetDarkMode(document.getElementById("chkDark").checked);
    }

    //CUSTOM COLOR
    if (document.getElementById("chkCustom").checked){
        $("#chkCC").show();
        SetBackgroundColor(localStorage.getItem("chkCustomColor"));
        document.getElementById("chkCustomColor").value = localStorage.getItem("chkCustomColor");
    }
    else {
        $("#chkCC").hide();
    }
}

function setValueFinal(){
    let vFinal = (rDataString(OptNames[0]) * AIOV[0].VALOR) + (rDataString(OptNames[1]) * AIOV[1].VALOR) + (rDataString(OptNames[2]) * AIOV[2].VALOR) + (rDataString(OptNames[3]) * AIOV[3].VALOR) + (rDataString(OptNames[4]) * AIOV[4].VALOR) + (rDataString(OptNames[5]) * AIOV[5].VALOR) + (rDataString(OptNames[6]) * AIOV[6].VALOR) + (rDataString(OptNames[7]) * AIOV[7].VALOR) + (rDataString(OptNames[8]) * AIOV[8].VALOR) + (rDataString(OptNames[9]) * AIOV[9].VALOR);
    document.getElementById("preco_final").innerHTML = "R$" + dollarUSLocale.format(vFinal);
    document.getElementById("preco_metade").innerHTML = "R$" + dollarUSLocale.format((vFinal / 2));
}

function SetInpColor(){
    for (let index = 0; index < OptNames.length; index++) {
        if (rDataString(OptNames[index]) > 0) { document.getElementById(OptNames[index]).style.color = "red"; }
        else { document.getElementById(OptNames[index]).style.color = "black"; }
    }
}

function SetDarkMode(rBool) {
    rBool ? document.getElementById("fullPage").style.backgroundColor = "rgba(0, 0, 0, 0.9)": document.getElementById("fullPage").style.backgroundColor = "rgba(200, 200, 200, 1)";
}

function SetBackgroundColor(Hex) {
    document.getElementById("fullPage").style.backgroundColor = Hex;
}